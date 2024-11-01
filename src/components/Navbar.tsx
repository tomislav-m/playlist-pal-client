import { Logout } from "./Logout";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { SpotifyContext } from "../context/SpotifyContext";
import { useContext } from "react";

const Navbar = () => {
  const accessToken = useContext(SpotifyContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Stack
            component="div"
            sx={{ flexGrow: 1 }}
            direction="row"
            spacing={5}
          >
            <Link
              to="/"
              color="inherit"
              underline="none"
              component={RouterLink}
            >
              <Typography variant="h6">Playlist generator</Typography>
            </Link>
            {accessToken && (
              <Link
                to="/top-artists"
                color="inherit"
                underline="none"
                component={RouterLink}
                sx={{ alignContent: "center" }}
              >
                My top artists
              </Link>
            )}
          </Stack>
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
