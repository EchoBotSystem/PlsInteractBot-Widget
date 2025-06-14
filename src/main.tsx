import React from "react";
import ReactDOM from "react-dom/client";
import TopCommentersWidget from "./TopCommentersWidget";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import TopCommenters from "./pages/TopCommentersGrid/TopCommentersGrid";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopCommentersWidget />,
    errorElement: <NotFound />,
  },
  {
    path: "/top-3",
    element: <TopCommenters />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
