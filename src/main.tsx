import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import TopicsPage from "./pages/TopicsPage.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import HomePage from "./pages/HomePage.tsx";
import FeedPage from "./pages/FeedPage.tsx";
import SearchResultsPage from "./pages/SearchResultsPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <h1>About</h1> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/search", element: <SearchResultsPage /> },
  { path: "/feed", element: <FeedPage /> },
  { path: "/topics", element: <TopicsPage /> },
  { path: "/topics/:id", element: <h1>Topic</h1> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
