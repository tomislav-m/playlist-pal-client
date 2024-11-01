import { Box, Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./routes";
import SpotifyProvider from "./context/SpotifyProvider";

const App = () => {
  return (
    <SpotifyProvider>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }} textAlign="center">
          <Router>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Router>
        </Box>
      </Container>
    </SpotifyProvider>
  );
};

export default App;
