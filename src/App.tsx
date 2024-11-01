import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SpotifyProvider from "./context/SpotifyProvider";

const App = () => {
  return (
    <SpotifyProvider>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }} textAlign="center">
          <Outlet />
        </Box>
      </Container>
    </SpotifyProvider>
  );
};

export default App;
