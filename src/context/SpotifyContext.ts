import Cookies from "js-cookie";
import { createContext } from "react";

const SpotifyContext = createContext<string | undefined>(
  Cookies.get("spotifyAuthToken")
);
const SpotifyDispatchContext = createContext<(accessToken?: string) => void>(
  () => {}
);

export { SpotifyContext, SpotifyDispatchContext };
