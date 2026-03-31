import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }} textAlign="center">
          <Outlet />
        </Box>
      </Container>
    </div>
  );
};

export default App;
