import { useState, useEffect, useCallback, type ReactNode } from "react";
import {
  redirectToSpotifyLogin,
  exchangeCodeForTokens,
  refreshAccessToken,
  type SpotifyTokens,
} from "./spotifyAuth";
import { SpotifyAuthContext } from "./SpotifyAuthContext";

const STORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expiresAt: "spotify_expires_at",
} as const;

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export interface AuthContextValue {
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
}

function loadFromStorage(): AuthState {
  return {
    accessToken: localStorage.getItem(STORAGE_KEYS.accessToken),
    refreshToken: localStorage.getItem(STORAGE_KEYS.refreshToken),
    expiresAt: Number(localStorage.getItem(STORAGE_KEYS.expiresAt)) || null,
  };
}

function saveToStorage(tokens: SpotifyTokens): AuthState {
  const expiresAt = Date.now() + tokens.expires_in * 1000;
  localStorage.setItem(STORAGE_KEYS.accessToken, tokens.access_token);
  localStorage.setItem(STORAGE_KEYS.refreshToken, tokens.refresh_token);
  localStorage.setItem(STORAGE_KEYS.expiresAt, String(expiresAt));
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresAt,
  };
}

function clearStorage(): void {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
}

export function SpotifyAuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(loadFromStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTokens = useCallback((tokens: SpotifyTokens) => {
    setAuth(saveToStorage(tokens));
    setError(null);
  }, []);

  // Handle callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const err = params.get("error");

    if (err) {
      setError("Spotify login was denied.");
      window.history.replaceState({}, "", "/");
      return;
    }

    if (!code) return;

    window.history.replaceState({}, "", "/");
    setIsLoading(true);

    exchangeCodeForTokens(code)
      .then(handleTokens)
      .catch(() => setError("Failed to exchange token."))
      .finally(() => setIsLoading(false));
  }, [handleTokens]);

  // Auto-refresh
  useEffect(() => {
    if (!auth.expiresAt || !auth.refreshToken) return;

    const delay = auth.expiresAt - Date.now() - 60_000;

    const doRefresh = () =>
      refreshAccessToken(auth.refreshToken!)
        .then(handleTokens)
        .catch(() => {
          clearStorage();
          setAuth({ accessToken: null, refreshToken: null, expiresAt: null });
        });

    if (delay <= 0) {
      doRefresh();
      return;
    }

    const timer = setTimeout(doRefresh, delay);
    return () => clearTimeout(timer);
  }, [auth.expiresAt, auth.refreshToken, handleTokens]);

  const login = useCallback(() => redirectToSpotifyLogin(), []);

  const logout = useCallback(() => {
    clearStorage();
    setAuth({ accessToken: null, refreshToken: null, expiresAt: null });
  }, []);

  const isExpired = auth.expiresAt ? Date.now() > auth.expiresAt : true;
  const isLoggedIn = !!auth.accessToken && !isExpired;

  return (
    <SpotifyAuthContext.Provider
      value={{
        accessToken: isLoggedIn ? auth.accessToken : null,
        isLoggedIn,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
}
