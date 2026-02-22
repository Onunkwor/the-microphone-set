import { useEffect, useState } from 'react';
import { Newspaper, Trash2, Users, UserCheck, UserX, ChevronLeft, ChevronRight } from 'lucide-react';
import { newsletterApi, type NewsletterSubscriber, type NewsletterStats } from '@/services/api';

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(1);
  const perPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = filter !== 'all' ? { active: filter === 'active' ? 'true' : 'false' } : undefined;
        const [subs, statsData] = await Promise.all([
          newsletterApi.getAll(params),
          newsletterApi.getStats(),
        ]);
        setSubscribers(subs);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    try {
      await newsletterApi.delete(id);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const totalPages = Math.ceil(subscribers.length / perPage);
  const paginatedSubs = subscribers.slice((page - 1) * perPage, page * perPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cutout-red"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-ink">Newsletter Subscribers</h1>
        <p className="font-body text-sm text-ink/40 mt-1">Manage your email list</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-paper-white p-5 border-2 border-ink/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-ink flex items-center justify-center">
              <Users className="w-5 h-5 text-paper" />
            </div>
            <div>
              <p className="font-display text-2xl text-ink">{stats.total}</p>
              <p className="font-typewriter text-[9px] uppercase tracking-wider text-ink/40">Total</p>
            </div>
          </div>
          <div className="bg-paper-white p-5 border-2 border-ink/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-paper" />
            </div>
            <div>
              <p className="font-display text-2xl text-ink">{stats.active}</p>
              <p className="font-typewriter text-[9px] uppercase tracking-wider text-ink/40">Active</p>
            </div>
          </div>
          <div className="bg-paper-white p-5 border-2 border-ink/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-ink/30 flex items-center justify-center">
              <UserX className="w-5 h-5 text-paper" />
            </div>
            <div>
              <p className="font-display text-2xl text-ink">{stats.inactive}</p>
              <p className="font-typewriter text-[9px] uppercase tracking-wider text-ink/40">Inactive</p>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'inactive'] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setPage(1); }}
            className={`font-typewriter text-[10px] uppercase tracking-wider px-3 py-1.5 border-2 transition-all duration-200 ${
              filter === f
                ? 'bg-ink text-paper border-ink'
                : 'bg-transparent text-ink/50 border-ink/20 hover:border-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Subscribers Table */}
      <div className="bg-paper-white border-2 border-ink/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink/5 border-b-2 border-ink/10">
            <tr>
              <th className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60">Email</th>
              <th className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60">Status</th>
              <th className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60">Subscribed</th>
              <th className="px-4 py-3 text-right font-typewriter text-[10px] uppercase tracking-wider text-ink/60">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {paginatedSubs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center">
                  <Newspaper className="w-8 h-8 text-ink/15 mx-auto mb-2" />
                  <p className="font-body text-sm text-ink/40">No subscribers found</p>
                </td>
              </tr>
            ) : (
              paginatedSubs.map((sub) => (
                <tr key={sub._id} className="hover:bg-cutout-yellow/10 transition-colors">
                  <td className="px-4 py-3 font-body text-sm text-ink">{sub.email}</td>
                  <td className="px-4 py-3">
                    {sub.active ? (
                      <span className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 bg-green-100 text-green-800 border border-green-300">Active</span>
                    ) : (
                      <span className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 bg-ink/5 text-ink/40 border border-ink/10">Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-typewriter text-[10px] text-ink/40">
                    {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteSubscriber(sub._id)}
                      className="p-1.5 text-ink/30 hover:text-cutout-red hover:bg-cutout-red/5 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t-2 border-ink/10">
            <p className="font-typewriter text-[10px] uppercase tracking-wider text-ink/40">
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-1.5 text-ink/40 hover:text-ink disabled:opacity-30">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="p-1.5 text-ink/40 hover:text-ink disabled:opacity-30">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
