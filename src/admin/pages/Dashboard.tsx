import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  Mic2,
  PlayCircle,
  Youtube,
  Star,
  HelpCircle,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import {
  blogsApi,
  artistsApi,
  interviewsApi,
  playlistsApi,
  videosApi,
  recommendationsApi,
  triviaApi,
} from '@/services/api';

interface Stat {
  label: string;
  count: number;
  icon: React.ElementType;
  path: string;
  color: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogs, artists, interviews, playlists, videos, recommendations, trivia] =
          await Promise.all([
            blogsApi.getAll().catch(() => []),
            artistsApi.getAll().catch(() => []),
            interviewsApi.getAll().catch(() => []),
            playlistsApi.getAll().catch(() => []),
            videosApi.getAll().catch(() => []),
            recommendationsApi.getAll().catch(() => []),
            triviaApi.getAll().catch(() => []),
          ]);

        setStats([
          { label: 'Blogs', count: blogs.length, icon: FileText, path: '/admin/blogs', color: 'text-blue-400' },
          { label: 'Artists', count: artists.length, icon: Users, path: '/admin/artists', color: 'text-green-400' },
          { label: 'Interviews', count: interviews.length, icon: Mic2, path: '/admin/interviews', color: 'text-yellow-400' },
          { label: 'Playlists', count: playlists.length, icon: PlayCircle, path: '/admin/playlists', color: 'text-purple-400' },
          { label: 'Videos', count: videos.length, icon: Youtube, path: '/admin/videos', color: 'text-red-400' },
          { label: 'Recommendations', count: recommendations.length, icon: Star, path: '/admin/recommendations', color: 'text-orange-400' },
          { label: 'Trivia', count: trivia.length, icon: HelpCircle, path: '/admin/trivia', color: 'text-cyan-400' },
        ]);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to The Microphone Set admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, count, icon: Icon, path, color }) => (
          <Link
            key={label}
            to={path}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gray-700/50 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
            </div>
            <p className="text-3xl font-bold text-white">{count}</p>
            <p className="text-gray-400">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link
            to="/admin/blogs"
            className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Add New Blog Post</span>
          </Link>
          <Link
            to="/admin/artists"
            className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <Users className="w-5 h-5 text-green-400" />
            <span>Add New Artist</span>
          </Link>
          <Link
            to="/admin/playlists"
            className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <PlayCircle className="w-5 h-5 text-purple-400" />
            <span>Add New Playlist</span>
          </Link>
          <Link
            to="/admin/videos"
            className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <Youtube className="w-5 h-5 text-red-400" />
            <span>Add New Video</span>
          </Link>
          <Link
            to="/admin/interviews"
            className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <Mic2 className="w-5 h-5 text-yellow-400" />
            <span>Add New Interview</span>
          </Link>
          <Link
            to="/admin/trivia"
            className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Add Trivia Question</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
