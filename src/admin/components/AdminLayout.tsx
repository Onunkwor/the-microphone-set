import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Music,
  Users,
  Mic2,
  PlayCircle,
  Youtube,
  Star,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Mail,
  Newspaper,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/blogs', label: 'Blogs', icon: FileText },
  { path: '/admin/artists', label: 'Artists', icon: Users },
  { path: '/admin/interviews', label: 'Interviews', icon: Mic2 },
  { path: '/admin/playlists', label: 'Playlists', icon: PlayCircle },
  { path: '/admin/videos', label: 'Videos', icon: Youtube },
  { path: '/admin/recommendations', label: 'Recommendations', icon: Star },
  { path: '/admin/trivia', label: 'Trivia', icon: HelpCircle },
  { path: '/admin/contact', label: 'Messages', icon: Mail },
  { path: '/admin/newsletter', label: 'Newsletter', icon: Newspaper },
];

export default function AdminLayout() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cutout-red"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-paper flex font-body">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-ink border-r-[3px] border-ink transform transition-transform lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-paper/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2 no-underline">
              <Music className="w-7 h-7 text-cutout-red" />
              <span className="font-typewriter text-sm uppercase tracking-[2px] text-paper">TMS Admin</span>
            </Link>
            <button
              className="lg:hidden text-paper/50 hover:text-paper"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {navItems.map(({ path, label, icon: Icon, exact }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 font-typewriter text-xs uppercase tracking-wider transition-all duration-200 no-underline ${
                  isActive(path, exact)
                    ? 'bg-cutout-red text-paper'
                    : 'text-paper/50 hover:text-paper hover:bg-paper/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-paper/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-typewriter text-xs text-paper uppercase tracking-wider">{user?.username}</p>
                <p className="font-body text-[10px] text-paper/40">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-paper/40 hover:text-cutout-red hover:bg-paper/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden bg-ink border-b-[3px] border-ink p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-paper/60 hover:text-paper"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
