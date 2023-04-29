import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import TVShow from "./pages/TVShow";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <TVShow />,
  },
]);

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
