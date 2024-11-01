import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useContext } from "react";
import { SpotifyContext } from "../context/SpotifyContext";

export const Logout = () => {
  const token = useContext(SpotifyContext);

  const logout = () => {
    Cookies.remove("spotifyAuthToken");
    window.location.reload();
  };

  return token ? (
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  ) : (
    <></>
  );
};
