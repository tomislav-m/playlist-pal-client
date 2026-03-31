import { Box, Button } from "@mui/material";
import { useSpotifyAuth } from "../auth/useSpotifyAuth";
import PlaylistGenerator from "./PlaylistGenerator";
import spotifyLogo from "../assets/Spotify_Primary_Logo_RGB_Black.png";

export const Home = () => {
  const { isLoggedIn, isLoading, error, login } = useSpotifyAuth();

  if (isLoading) return <p>Logging in...</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoggedIn ? (
        <PlaylistGenerator />
      ) : (
        <Button
          variant="contained"
          onClick={login}
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
      )}
    </div>
  );
};
