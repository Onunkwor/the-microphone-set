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
  Mail,
  Newspaper,
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
          { label: 'Blogs', count: blogs.length, icon: FileText, path: '/admin/blogs' },
          { label: 'Artists', count: artists.length, icon: Users, path: '/admin/artists' },
          { label: 'Interviews', count: interviews.length, icon: Mic2, path: '/admin/interviews' },
          { label: 'Playlists', count: playlists.length, icon: PlayCircle, path: '/admin/playlists' },
          { label: 'Videos', count: videos.length, icon: Youtube, path: '/admin/videos' },
          { label: 'Recommendations', count: recommendations.length, icon: Star, path: '/admin/recommendations' },
          { label: 'Trivia', count: trivia.length, icon: HelpCircle, path: '/admin/quizzes' },
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cutout-red"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ink">Dashboard</h1>
        <p className="font-body text-ink/50 mt-1">Welcome to The Microphone Set admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, count, icon: Icon, path }) => (
          <Link
            key={label}
            to={path}
            className="relative bg-paper-white p-6 border-2 border-ink/10 hover:border-ink hover:shadow-hard transition-all duration-200 no-underline text-ink group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-ink flex items-center justify-center group-hover:bg-cutout-red transition-colors">
                <Icon className="w-5 h-5 text-paper" />
              </div>
            </div>
            <p className="font-display text-3xl text-ink">{count}</p>
            <p className="font-typewriter text-[10px] uppercase tracking-wider text-ink/40">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-paper-white p-6 border-2 border-ink/10">
        <h2 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cutout-red" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { to: '/admin/blogs', icon: FileText, label: 'Add New Blog Post' },
            { to: '/admin/artists', icon: Users, label: 'Add New Artist' },
            { to: '/admin/playlists', icon: PlayCircle, label: 'Add New Playlist' },
            { to: '/admin/videos', icon: Youtube, label: 'Add New Video' },
            { to: '/admin/interviews', icon: Mic2, label: 'Add New Interview' },
            { to: '/admin/quizzes', icon: HelpCircle, label: 'Manage Quizzes' },
            { to: '/admin/contact', icon: Mail, label: 'View Messages' },
            { to: '/admin/newsletter', icon: Newspaper, label: 'View Subscribers' },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 p-3 border border-ink/10 hover:border-ink hover:shadow-hard transition-all duration-200 no-underline text-ink/60 hover:text-ink font-body text-sm"
            >
              <Icon className="w-5 h-5 text-ink/30" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
