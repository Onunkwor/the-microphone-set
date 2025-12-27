import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import Trivia from "@/pages/Trivia";
import Playlists from "@/pages/Playlists";
import Blog from "@/pages/Blog";
import Interviews from "@/pages/Interviews";
import Recommendations from "@/pages/Recommendations";
import Contact from "@/pages/Contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const AppRouter = () => {
  const router = createBrowserRouter([
    // Public Routes
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "trivia",
          element: <Trivia />,
        },
        {
          path: "playlists",
          element: <Playlists />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
        {
          path: "interviews",
          element: <Interviews />,
        },
        {
          path: "recommendations",
          element: <Recommendations />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
