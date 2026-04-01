import { useContext } from "react";
import { SpotifyAuthContext } from "./SpotifyAuthContext";
import type { AuthContextValue } from "./SpotifyAuthProvider";

export const useSpotifyAuth = (): AuthContextValue => {
  const ctx = useContext(SpotifyAuthContext);
  if (!ctx) {
    throw new Error("useSpotifyAuth must be used within SpotifyAuthProvider");
  }

  return ctx;
};
