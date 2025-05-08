import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import DashboardBlogs from "./pages/dashboard/DashboardBlogs";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreateBlog from "./pages/dashboard/CreateBlog";
import RenderBlog from "./pages/dashboard/RenderBlog";
import { BlogProvider } from "./components/context/BlogContext";
import EditBlog from "./pages/dashboard/EditBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <DashboardHome /> },
      {
        path: "blogs",
        element: <DashboardBlogs />,
      },
      {
        path: "create",
        element: <CreateBlog />,
      },
      {
        path: ":id",
        element: <RenderBlog />,
      },
      {
        path: ":id/edit",
        element: <EditBlog />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlogProvider>
      <RouterProvider router={router} />
    </BlogProvider>
    <Toaster />
  </StrictMode>
);
