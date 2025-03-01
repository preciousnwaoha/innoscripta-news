import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SearchResultsPage from "./pages/SearchResultsPage.tsx";
import FeedPage from "./pages/FeedPage.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/search", element: <SearchResultsPage /> },
  { path: "/feed", element: <FeedPage /> },
  { path: "/feed/*", element: <FeedPage /> },
  { path: "/article/*", element: <ArticlePage /> },
  { path: "*", element: <NotFoundPage /> },
]);

const App = () => {
  const theme = useSelector((state: RootState) => state.general.theme);

  useEffect(() => {
    // Update the color scheme of the document based on the theme.
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <RouterProvider router={router} />;
};

export default App;
