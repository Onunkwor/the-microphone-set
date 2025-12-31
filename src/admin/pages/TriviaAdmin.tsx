import { useState, useEffect } from 'react';
import { triviaApi, type Trivia } from '@/services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { Plus, Trash2 } from 'lucide-react';

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

export default function TriviaAdmin() {
  const [trivia, setTrivia] = useState<Trivia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Trivia | null>(null);
  const [formData, setFormData] = useState(emptyTrivia);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const data = await triviaApi.getAll({ active: 'true' });
      setTrivia(data);
    } catch (error) {
      console.error('Failed to fetch trivia:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Filter out empty options
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
      };

      if (editItem?._id) {
        const updated = await triviaApi.update(editItem._id, dataToSave);
        setTrivia(trivia.map((t) => (t._id === editItem._id ? updated : t)));
      } else {
        const created = await triviaApi.create(dataToSave);
        setTrivia([created, ...trivia]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to save:', error);
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
      <DataTable
        title="Trivia Questions"
        data={trivia}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

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
              <label className="block text-sm font-medium text-gray-300">
                Options <span className="text-red-400">*</span>
              </label>
              {formData.options.length < 6 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
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
                    className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 focus:ring-purple-500"
                    title="Mark as correct answer"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {formData.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
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
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white rounded-lg transition-colors"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
