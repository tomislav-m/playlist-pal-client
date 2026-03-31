import { Button } from "@mui/material";
import { useSpotifyAuth } from "../auth/useSpotifyAuth";

export const Logout = () => {
  const { isLoggedIn, logout } = useSpotifyAuth();

  return (
    isLoggedIn && (
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    )
  );
};
