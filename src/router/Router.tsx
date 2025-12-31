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

// Admin imports
import { AuthProvider } from "@/admin/context/AuthContext";
import AdminLayout from "@/admin/components/AdminLayout";
import Login from "@/admin/pages/Login";
import Dashboard from "@/admin/pages/Dashboard";
import BlogsAdmin from "@/admin/pages/BlogsAdmin";
import ArtistsAdmin from "@/admin/pages/ArtistsAdmin";
import InterviewsAdmin from "@/admin/pages/InterviewsAdmin";
import PlaylistsAdmin from "@/admin/pages/PlaylistsAdmin";
import VideosAdmin from "@/admin/pages/VideosAdmin";
import RecommendationsAdmin from "@/admin/pages/RecommendationsAdmin";
import TriviaAdmin from "@/admin/pages/TriviaAdmin";

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
    // Admin Routes
    {
      path: "/admin/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "blogs",
          element: <BlogsAdmin />,
        },
        {
          path: "artists",
          element: <ArtistsAdmin />,
        },
        {
          path: "interviews",
          element: <InterviewsAdmin />,
        },
        {
          path: "playlists",
          element: <PlaylistsAdmin />,
        },
        {
          path: "videos",
          element: <VideosAdmin />,
        },
        {
          path: "recommendations",
          element: <RecommendationsAdmin />,
        },
        {
          path: "trivia",
          element: <TriviaAdmin />,
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};
