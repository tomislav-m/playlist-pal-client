import { useContext } from "react";
import PlaylistGenerator from "./PlaylistGenerator";
import { SpotifyContext } from "../context/SpotifyContext";
import { SpotifyAuth } from "../components/SpotifyAuth";

export const Home = () => {
  const accessToken = useContext(SpotifyContext);

  return !accessToken ? <SpotifyAuth /> : <PlaylistGenerator />;
};
