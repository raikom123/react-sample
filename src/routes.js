import Home from "./Home";
import Game from "./Game";
import Login from "./Login";
import NotFound from "./NotFound";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;