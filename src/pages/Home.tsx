import { useContext } from "react";
import PlaylistGenerator from "./PlaylistGenerator";
import { SpotifyContext } from "../context/SpotifyContext";
import { SpotifyAuth } from "../components/SpotifyAuth";

const Home = () => {
  const accessToken = useContext(SpotifyContext);

  return !accessToken ? <SpotifyAuth /> : <PlaylistGenerator />;
};

export default Home;
