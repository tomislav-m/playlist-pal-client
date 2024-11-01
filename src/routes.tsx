import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Home } from "./pages/Home";
import { UserTopArtists } from "./pages/UserTopArtists";
import App from "./App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "top-artists",
        element: <UserTopArtists />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
