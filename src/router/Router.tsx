import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import Trivia from "@/pages/Trivia";
import Leaderboard from "@/pages/Leaderboard";
import Playlists from "@/pages/Playlists";
import Blog from "@/pages/Blog";
import Interviews from "@/pages/Interviews";
import Recommendations from "@/pages/Recommendations";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
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
import QuizzesAdmin from "@/admin/pages/QuizzesAdmin";
import QuizQuestionsAdmin from "@/admin/pages/QuizQuestionsAdmin";
import ContactAdmin from "@/admin/pages/ContactAdmin";
import NewsletterAdmin from "@/admin/pages/NewsletterAdmin";

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
          path: "trivia/leaderboard",
          element: <Leaderboard />,
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
        {
          path: "privacy",
          element: <Privacy />,
        },
        {
          path: "terms",
          element: <Terms />,
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
          path: "quizzes",
          element: <QuizzesAdmin />,
        },
        {
          path: "quizzes/:quizId",
          element: <QuizQuestionsAdmin />,
        },
        {
          path: "contact",
          element: <ContactAdmin />,
        },
        {
          path: "newsletter",
          element: <NewsletterAdmin />,
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
