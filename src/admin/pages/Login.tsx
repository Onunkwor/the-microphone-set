import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-ink mb-4">
            <Music className="w-8 h-8 text-cutout-red" />
          </div>
          <h1 className="font-display text-2xl text-ink">Admin Login</h1>
          <p className="font-typewriter text-xs text-ink/40 uppercase tracking-wider mt-1">The Microphone Set</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-paper-white p-6 border-[3px] border-ink shadow-hard"
        >
          <div className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] left-8 z-10" style={{ transform: 'rotate(-2deg)' }} />

          {error && (
            <div className="mb-4 p-3 bg-cutout-red/5 border-2 border-dashed border-cutout-red/30 flex items-center gap-2 text-cutout-red">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-body text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block font-typewriter text-[10px] uppercase tracking-wider text-ink/60 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-paper border-2 border-ink/20 pl-10 pr-4 py-2.5 font-body text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-cutout-red transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-typewriter text-[10px] uppercase tracking-wider text-ink/60 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-paper border-2 border-ink/20 pl-10 pr-4 py-2.5 font-body text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-cutout-red transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-typewriter text-sm uppercase tracking-[2px] py-3 border-[3px] transition-all duration-200 flex items-center justify-center gap-2 ${
                isLoading
                  ? 'bg-ink/50 text-paper/50 border-ink/50 cursor-not-allowed'
                  : 'bg-ink text-paper border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          <a href="/" className="font-typewriter text-xs text-cutout-red hover:underline uppercase tracking-wider">
            Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
