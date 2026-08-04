import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizApi, triviaApi, type Trivia, type Quiz, type QuizPlayerResult } from '@/services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { Plus, Trash2, ArrowLeft, Radio, ListChecks, Trophy } from 'lucide-react';

const emptyTrivia: Omit<Trivia, '_id'> = {
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  category: 'general',
  difficulty: 'medium',
  explanation: '',
  active: true,
};

const categoryOptions = [
  { value: 'hip-hop', label: 'Hip-Hop' },
  { value: 'rnb', label: 'R&B' },
  { value: 'afrobeats', label: 'Afrobeats' },
  { value: 'general', label: 'General Music' },
  { value: 'history', label: 'Music History' },
];

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function QuizQuestionsAdmin() {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [trivia, setTrivia] = useState<Trivia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Trivia | null>(null);
  const [formData, setFormData] = useState(emptyTrivia);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'questions' | 'players'>('questions');
  const [results, setResults] = useState<QuizPlayerResult[]>([]);
  const [resultsLoading, setResultsLoading] = useState(true);

  const fetchData = async () => {
    if (!quizId) return;
    try {
      const [{ quiz: q, questions }, players] = await Promise.all([
        quizApi.getById(quizId),
        quizApi.getResults(quizId).catch(() => [] as QuizPlayerResult[]),
      ]);
      setQuiz(q);
      setTrivia(questions);
      setResults(players);
    } catch (error) {
      console.error('Failed to fetch quiz questions:', error);
    } finally {
      setIsLoading(false);
      setResultsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const handleAdd = () => {
    setEditItem(null);
    setFormData(emptyTrivia);
    setModalOpen(true);
  };

  const handleEdit = (item: Trivia) => {
    setEditItem(item);
    setFormData({
      question: item.question,
      options: [...item.options],
      correctAnswer: item.correctAnswer,
      category: item.category,
      difficulty: item.difficulty,
      explanation: item.explanation,
      active: item.active,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trivia question?')) return;
    try {
      await triviaApi.delete(id);
      setTrivia(trivia.filter((t) => t._id !== id));
    } catch (error: any) {
      console.error('Failed to delete:', error);
      alert(`Failed to delete trivia question: ${error.message || 'Unknown error'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const filteredOptions = formData.options.filter((opt) => opt.trim() !== '');
      if (filteredOptions.length < 2) {
        alert('Please provide at least 2 options');
        setSaving(false);
        return;
      }

      const dataToSave = {
        ...formData,
        options: filteredOptions,
        correctAnswer: Math.min(formData.correctAnswer, filteredOptions.length - 1),
        quiz: quizId,
      };

      if (editItem?._id) {
        const updated = await triviaApi.update(editItem._id, dataToSave);
        setTrivia(trivia.map((t) => (t._id === editItem._id ? updated : t)));
      } else {
        const created = await triviaApi.create(dataToSave);
        setTrivia([created, ...trivia]);
      }
      setModalOpen(false);
    } catch (error: any) {
      console.error('Failed to save:', error);
      alert(`Failed to save trivia question: ${error.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string | number | boolean | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData({ ...formData, options: [...formData.options, ''] });
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      const newCorrect = formData.correctAnswer >= index && formData.correctAnswer > 0
        ? formData.correctAnswer - 1
        : formData.correctAnswer;
      setFormData({ ...formData, options: newOptions, correctAnswer: newCorrect });
    }
  };

  const columns = [
    {
      key: 'question',
      label: 'Question',
      render: (item: Trivia) => (
        <span className="line-clamp-2">{item.question}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item: Trivia) => (
        <span className="capitalize">{item.category.replace('-', ' ')}</span>
      ),
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      render: (item: Trivia) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.difficulty === 'easy'
              ? 'bg-green-500/20 text-green-400'
              : item.difficulty === 'medium'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {item.difficulty}
        </span>
      ),
    },
    { key: 'active', label: 'Active' },
  ];

  return (
    <>
      <div className="mb-4">
        <Link
          to="/admin/quizzes"
          className="inline-flex items-center gap-1.5 font-typewriter text-[10px] uppercase tracking-wider text-ink/50 hover:text-ink transition-colors no-underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Quizzes
        </Link>
      </div>

      {quiz && (
        <div className="flex items-center gap-3 mb-6">
          <h1 className="font-display text-2xl text-ink">{quiz.title}</h1>
          {quiz.isLive && (
            <span className="inline-flex items-center gap-1 font-typewriter text-[10px] uppercase tracking-wider px-2 py-1 bg-cutout-red text-paper">
              <Radio className="w-3 h-3" />
              Live
            </span>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b-2 border-ink/10">
        <button
          onClick={() => setTab('questions')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 font-typewriter text-xs uppercase tracking-wider transition-colors -mb-0.5 border-b-2 ${
            tab === 'questions'
              ? 'border-cutout-red text-ink'
              : 'border-transparent text-ink/40 hover:text-ink'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          Questions ({trivia.length})
        </button>
        <button
          onClick={() => setTab('players')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 font-typewriter text-xs uppercase tracking-wider transition-colors -mb-0.5 border-b-2 ${
            tab === 'players'
              ? 'border-cutout-red text-ink'
              : 'border-transparent text-ink/40 hover:text-ink'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Players ({results.length})
        </button>
      </div>

      {tab === 'questions' ? (
        <DataTable
          title="Questions"
          data={trivia}
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : (
        <PlayersTable results={results} isLoading={resultsLoading} />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Trivia Question' : 'Add Trivia Question'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Question"
            type="textarea"
            value={formData.question}
            onChange={(v) => updateField('question', v)}
            required
            rows={2}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-ink/70">
                Options <span className="text-red-400">*</span>
              </label>
              {formData.options.length < 6 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="text-sm text-ink/50 hover:text-ink flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              )}
            </div>
            <div className="space-y-2">
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === index}
                    onChange={() => updateField('correctAnswer', index)}
                    className="w-4 h-4 text-ink bg-paper border-ink/20 focus:ring-ink"
                    title="Mark as correct answer"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 bg-paper border border-ink/20 rounded-lg px-4 py-2 text-ink placeholder-ink/30 focus:outline-none focus:ring-2 focus:ring-ink"
                  />
                  {formData.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 text-ink/30 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-ink/40 mt-1">
              Select the radio button next to the correct answer
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Category"
              type="select"
              value={formData.category}
              onChange={(v) => updateField('category', v)}
              options={categoryOptions}
            />
            <FormField
              label="Difficulty"
              type="select"
              value={formData.difficulty}
              onChange={(v) => updateField('difficulty', v)}
              options={difficultyOptions}
            />
          </div>

          <FormField
            label="Explanation (shown after answering)"
            type="textarea"
            value={formData.explanation}
            onChange={(v) => updateField('explanation', v)}
            rows={2}
          />

          <FormField
            label="Active (visible in quizzes)"
            type="checkbox"
            value={formData.active}
            onChange={(v) => updateField('active', v)}
          />

          <div className="flex justify-end gap-3 pt-4">
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

function PlayersTable({
  results,
  isLoading,
}: {
  results: QuizPlayerResult[];
  isLoading: boolean;
}) {
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cutout-red"></div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-paper-white border-2 border-ink/10 p-12 text-center">
        <p className="font-body text-sm text-ink/50">
          No one has played this quiz yet. Scores will appear here once players finish it.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper-white border-2 border-ink/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-ink/5 border-b-2 border-ink/10">
            <tr>
              <th className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60 w-16">#</th>
              <th className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60">Player</th>
              <th className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60">Score</th>
              <th className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60">Percentage</th>
              <th className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60">Played</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {results.map((r, i) => (
              <tr key={r._id} className="hover:bg-cutout-yellow/10 transition-colors">
                <td className="px-4 py-3 font-typewriter text-sm text-ink/50">{i + 1}</td>
                <td className="px-4 py-3 font-body text-sm text-ink font-medium">{r.userName}</td>
                <td className="px-4 py-3 font-body text-sm text-ink/80">
                  {r.score}/{r.totalQuestions}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block font-typewriter text-[11px] px-2 py-0.5 ${
                      r.percentage >= 75
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : r.percentage >= 50
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}
                  >
                    {r.percentage}%
                  </span>
                </td>
                <td className="px-4 py-3 font-body text-sm text-ink/50">{formatDate(r.completedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
