import { createContext } from "react";
import type { AuthContextValue } from "./SpotifyAuthProvider";

export const SpotifyAuthContext = createContext<AuthContextValue | null>(null);
