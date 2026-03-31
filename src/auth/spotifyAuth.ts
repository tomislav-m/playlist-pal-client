const CLIENT_ID = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_ID as string;
const REDIRECT_URI = import.meta.env
  .VITE_REACT_APP_SPOTIFY_REDIRECT_URI as string;
const API_BASE = import.meta.env.VITE_REACT_APP_API_URL as string;

const SCOPES = [
  "user-top-read",
  "playlist-modify-private",
  "playlist-modify-public",
];

export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const redirectToSpotifyLogin = (): void => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES.join(" "),
    redirect_uri: REDIRECT_URI,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
};

export const exchangeCodeForTokens = async (
  code: string,
): Promise<SpotifyTokens> => {
  const res = await fetch(`${API_BASE}auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) throw new Error("Token exchange failed");
  return res.json();
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<SpotifyTokens> => {
  const res = await fetch(`${API_BASE}spotify/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Token refresh failed");
  return res.json();
};
