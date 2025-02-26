import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import TopicsPage from "./pages/TopicsPage.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/about", element: <h1>About</h1> },
  { path: "*", element: <NotFoundPage /> },
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
