import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizApi, leaderboardApi, type Quiz } from '@/services/api';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import {
  Plus,
  Pencil,
  Trash2,
  ListChecks,
  Radio,
  CircleDot,
  Loader2,
} from 'lucide-react';

const emptyQuiz = { title: '', description: '' };

export default function QuizzesAdmin() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Quiz | null>(null);
  const [formData, setFormData] = useState(emptyQuiz);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deletingResults, setDeletingResults] = useState(false);

  const fetchData = async () => {
    try {
      const data = await quizApi.getAll();
      setQuizzes(data);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setFormData(emptyQuiz);
    setModalOpen(true);
  };

  const handleEdit = (quiz: Quiz) => {
    setEditItem(quiz);
    setFormData({ title: quiz.title, description: quiz.description || '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please give the quiz a title');
      return;
    }
    setSaving(true);
    try {
      if (editItem?._id) {
        const updated = await quizApi.update(editItem._id, formData);
        setQuizzes((qs) => qs.map((q) => (q._id === editItem._id ? { ...q, ...updated } : q)));
      } else {
        const created = await quizApi.create(formData);
        setQuizzes((qs) => [{ ...created, questionCount: 0 }, ...qs]);
      }
      setModalOpen(false);
    } catch (error: any) {
      console.error('Failed to save quiz:', error);
      alert(`Failed to save quiz: ${error.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (quiz: Quiz) => {
    if (!quiz._id) return;
    if (!quiz.questionCount) {
      if (!confirm('This quiz has no questions yet. Publish it anyway?')) return;
    }
    setBusyId(quiz._id);
    try {
      await quizApi.publish(quiz._id);
      // Only one quiz can be live: reflect that locally.
      setQuizzes((qs) =>
        qs.map((q) => ({ ...q, isLive: q._id === quiz._id }))
      );
    } catch (error: any) {
      console.error('Failed to publish quiz:', error);
      alert(`Failed to publish quiz: ${error.message || 'Unknown error'}`);
    } finally {
      setBusyId(null);
    }
  };

  const handleRetire = async (quiz: Quiz) => {
    if (!quiz._id) return;
    if (!confirm('Take this quiz offline? The public quiz will have nothing live until you publish another.')) return;
    setBusyId(quiz._id);
    try {
      await quizApi.retire(quiz._id);
      setQuizzes((qs) => qs.map((q) => (q._id === quiz._id ? { ...q, isLive: false } : q)));
    } catch (error: any) {
      console.error('Failed to retire quiz:', error);
      alert(`Failed to retire quiz: ${error.message || 'Unknown error'}`);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (quiz: Quiz) => {
    if (!quiz._id) return;
    if (!confirm(`Delete "${quiz.title}" and its ${quiz.questionCount || 0} question(s)? This cannot be undone.`)) return;
    setBusyId(quiz._id);
    try {
      await quizApi.delete(quiz._id);
      setQuizzes((qs) => qs.filter((q) => q._id !== quiz._id));
    } catch (error: any) {
      console.error('Failed to delete quiz:', error);
      alert(`Failed to delete quiz: ${error.message || 'Unknown error'}`);
    } finally {
      setBusyId(null);
    }
  };

  const handleDeleteAllResults = async () => {
    if (!confirm('Are you sure you want to delete ALL quiz results? This will clear the entire leaderboard and cannot be undone.')) return;
    setDeletingResults(true);
    try {
      const result = await leaderboardApi.deleteAllResults();
      alert(`Successfully deleted ${result.deletedCount} quiz results.`);
    } catch (error: any) {
      console.error('Failed to delete results:', error);
      alert(`Failed to delete quiz results: ${error.message || 'Unknown error'}`);
    } finally {
      setDeletingResults(false);
    }
  };

  const formatDate = (value?: string | null) => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cutout-red"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Quizzes</h1>
          <p className="font-body text-sm text-ink/50 mt-1">
            Only one quiz is live at a time. Publishing a new quiz retires the current one — past quizzes are kept, never deleted.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDeleteAllResults}
            disabled={deletingResults}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 disabled:bg-red-700/30 text-paper font-typewriter text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {deletingResults ? 'Deleting...' : 'Delete All Results'}
          </button>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-paper font-typewriter text-xs uppercase tracking-wider border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            New Quiz
          </button>
        </div>
      </div>

      {quizzes.length === 0 ? (
        <div className="bg-paper-white border-2 border-ink/10 p-12 text-center">
          <p className="font-body text-sm text-ink/50">
            No quizzes yet. Create your first quiz to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className={`relative bg-paper-white border-2 p-5 flex flex-col gap-4 transition-colors ${
                quiz.isLive ? 'border-cutout-red' : 'border-ink/10'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-display text-lg text-ink truncate">{quiz.title}</h2>
                  {quiz.description && (
                    <p className="font-body text-xs text-ink/50 mt-1 line-clamp-2">{quiz.description}</p>
                  )}
                </div>
                {quiz.isLive ? (
                  <span className="shrink-0 inline-flex items-center gap-1 font-typewriter text-[10px] uppercase tracking-wider px-2 py-1 bg-cutout-red text-paper">
                    <Radio className="w-3 h-3" />
                    Live
                  </span>
                ) : (
                  <span className="shrink-0 inline-flex items-center gap-1 font-typewriter text-[10px] uppercase tracking-wider px-2 py-1 bg-ink/5 text-ink/40 border border-ink/10">
                    Past
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 font-typewriter text-[10px] uppercase tracking-wider text-ink/40">
                <span>{quiz.questionCount ?? 0} questions</span>
                <span>Created {formatDate(quiz.createdAt)}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-ink/10 mt-auto">
                <Link
                  to={`/admin/quizzes/${quiz._id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-typewriter text-[10px] uppercase tracking-wider text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors no-underline"
                >
                  <ListChecks className="w-3.5 h-3.5" />
                  Questions
                </Link>

                {quiz.isLive ? (
                  <button
                    onClick={() => handleRetire(quiz)}
                    disabled={busyId === quiz._id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-typewriter text-[10px] uppercase tracking-wider text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors disabled:opacity-40"
                  >
                    {busyId === quiz._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CircleDot className="w-3.5 h-3.5" />}
                    Retire
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublish(quiz)}
                    disabled={busyId === quiz._id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-typewriter text-[10px] uppercase tracking-wider bg-ink text-paper hover:bg-ink/80 transition-colors disabled:opacity-40"
                  >
                    {busyId === quiz._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Radio className="w-3.5 h-3.5" />}
                    Publish Live
                  </button>
                )}

                <div className="ml-auto flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(quiz)}
                    className="p-1.5 text-ink/30 hover:text-ink hover:bg-ink/5 transition-colors"
                    title="Edit details"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(quiz)}
                    disabled={busyId === quiz._id}
                    className="p-1.5 text-ink/30 hover:text-cutout-red hover:bg-cutout-red/5 transition-colors disabled:opacity-40"
                    title="Delete quiz"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Quiz' : 'New Quiz'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            value={formData.title}
            onChange={(v) => setFormData({ ...formData, title: v as string })}
            placeholder="e.g. August Hip-Hop Special"
            required
          />
          <FormField
            label="Description (optional)"
            type="textarea"
            value={formData.description}
            onChange={(v) => setFormData({ ...formData, description: v as string })}
            rows={2}
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 font-typewriter text-xs uppercase tracking-wider text-ink/50 hover:text-ink transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-ink hover:bg-ink/80 disabled:bg-ink/30 text-paper font-typewriter text-xs uppercase tracking-wider transition-colors"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
