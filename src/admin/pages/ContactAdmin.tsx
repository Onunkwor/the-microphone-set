import { useEffect, useState } from 'react';
import { Mail, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { contactApi, type ContactMessage } from '@/services/api';

export default function ContactAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await contactApi.getAll();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await contactApi.markRead(id);
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await contactApi.delete(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const totalPages = Math.ceil(messages.length / perPage);
  const paginatedMessages = messages.slice((page - 1) * perPage, page * perPage);

  const subjectLabels: Record<string, string> = {
    general: 'General',
    playlist: 'Playlist',
    interview: 'Interview',
    partnership: 'Partnership',
    feedback: 'Feedback',
    other: 'Other',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cutout-red"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Contact Messages</h1>
          <p className="font-body text-sm text-ink/40 mt-1">{messages.length} total messages</p>
        </div>
        <span className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-1 bg-cutout-red/10 text-cutout-red border border-cutout-red/20">
          {messages.filter((m) => !m.read).length} unread
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 bg-paper-white border-2 border-ink/10 overflow-hidden">
          <div className="divide-y divide-ink/10">
            {paginatedMessages.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="w-10 h-10 text-ink/20 mx-auto mb-3" />
                <p className="font-body text-sm text-ink/40">No messages yet</p>
              </div>
            ) : (
              paginatedMessages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => {
                    setSelected(msg);
                    if (!msg.read) markAsRead(msg._id);
                  }}
                  className={`p-4 cursor-pointer hover:bg-cutout-yellow/10 transition-colors ${
                    selected?._id === msg._id ? 'bg-cutout-yellow/10' : ''
                  } ${!msg.read ? 'border-l-[3px] border-l-cutout-red' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-display text-sm ${!msg.read ? 'text-ink' : 'text-ink/60'}`}>
                          {msg.name}
                        </span>
                        <span className="inline-block font-typewriter text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-ink/10 text-ink/40">
                          {subjectLabels[msg.subject] || msg.subject}
                        </span>
                      </div>
                      <p className="font-body text-xs text-ink/50 truncate">{msg.message}</p>
                      <p className="font-typewriter text-[9px] text-ink/30 mt-1">
                        {new Date(msg.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteMessage(msg._id); }}
                      className="p-1.5 text-ink/20 hover:text-cutout-red hover:bg-cutout-red/5 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

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

        {/* Message Detail */}
        <div className="bg-paper-white border-2 border-ink/10 p-6">
          {selected ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-ink/30" />
                <span className="font-typewriter text-[10px] uppercase tracking-wider text-ink/40">Message Detail</span>
              </div>

              <h3 className="font-display text-lg text-ink mb-1">{selected.name}</h3>
              <p className="font-body text-sm text-ink/50 mb-1">{selected.email}</p>
              <span className="inline-block font-typewriter text-[9px] uppercase tracking-wider px-2 py-0.5 bg-cutout-yellow/20 text-ink/60 border border-cutout-yellow/30 mb-4">
                {subjectLabels[selected.subject] || selected.subject}
              </span>

              <div className="bg-paper border-2 border-dashed border-ink/10 p-4 mb-4">
                <p className="font-body text-sm text-ink/70 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <p className="font-typewriter text-[9px] text-ink/30 uppercase tracking-wider">
                Received: {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <Mail className="w-8 h-8 text-ink/15 mb-3" />
              <p className="font-body text-sm text-ink/30">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
