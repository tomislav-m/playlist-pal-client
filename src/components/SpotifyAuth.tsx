import { Box, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import spotifyLogo from "../assets/Spotify_Primary_Logo_RGB_Black.png";
import { SpotifyDispatchContext } from "../context/SpotifyContext";
import Cookies from "js-cookie";

export const SpotifyAuth = () => {
  const setAccessToken = useContext(SpotifyDispatchContext);

  useEffect(() => {
    const accessToken = getHash()["access_token"];

    if (accessToken) {
      setAccessToken(accessToken);
      Cookies.set("spotifyAuthToken", accessToken);
      window.history.replaceState(
        null,
        "",
        window.location.href.split("#access_token")[0]
      );
    }
  }, [setAccessToken]);

  const getHash = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial: { [key: string]: string }, item) => {
        if (item) {
          const parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }

        return initial;
      }, {});
  };

  const getRedirectUrl = () =>
    "https://accounts.spotify.com/authorize?response_type=token" +
    `&client_id=${import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_ID}` +
    `&scope=user-top-read%20playlist-modify-private%20playlist-modify-public` +
    `&redirect_uri=${import.meta.env.VITE_REACT_APP_SPOTIFY_REDIRECT_URI}` +
    `&show_dialog=true`;

  const handleClick = () => {
    const redirectUrl = getRedirectUrl();
    window.location.href = redirectUrl;
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      color="success"
      startIcon={
        <Box
          component="img"
          sx={{ width: "24px", height: "24px" }}
          src={spotifyLogo}
        />
      }
    >
      Login
    </Button>
  );
};
