import { useState, useEffect } from 'react';
import { recommendationsApi, type Recommendation } from '@/services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

const emptyRecommendation: Omit<Recommendation, '_id'> = {
  title: '',
  artist: '',
  album: '',
  genre: '',
  description: '',
  image: '',
  spotifyUrl: '',
  youtubeUrl: '',
  rating: 5,
  featured: false,
};

export default function RecommendationsAdmin() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Recommendation | null>(null);
  const [formData, setFormData] = useState(emptyRecommendation);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const data = await recommendationsApi.getAll();
      setRecommendations(data);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setFormData(emptyRecommendation);
    setModalOpen(true);
  };

  const handleEdit = (item: Recommendation) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      artist: item.artist,
      album: item.album,
      genre: item.genre,
      description: item.description,
      image: item.image,
      spotifyUrl: item.spotifyUrl,
      youtubeUrl: item.youtubeUrl,
      rating: item.rating,
      featured: item.featured,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recommendation?')) return;
    try {
      await recommendationsApi.delete(id);
      setRecommendations(recommendations.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem?._id) {
        const updated = await recommendationsApi.update(editItem._id, formData);
        setRecommendations(recommendations.map((r) => (r._id === editItem._id ? updated : r)));
      } else {
        const created = await recommendationsApi.create(formData);
        setRecommendations([created, ...recommendations]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'artist', label: 'Artist' },
    { key: 'genre', label: 'Genre' },
    {
      key: 'rating',
      label: 'Rating',
      render: (item: Recommendation) => (
        <span className="text-yellow-400">{'★'.repeat(item.rating)}</span>
      ),
    },
    { key: 'featured', label: 'Featured' },
  ];

  return (
    <>
      <DataTable
        title="Recommendations"
        data={recommendations}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Recommendation' : 'Add Recommendation'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            value={formData.title}
            onChange={(v) => updateField('title', v)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Artist"
              value={formData.artist}
              onChange={(v) => updateField('artist', v)}
              required
            />
            <FormField
              label="Album"
              value={formData.album}
              onChange={(v) => updateField('album', v)}
            />
          </div>
          <FormField
            label="Genre"
            value={formData.genre}
            onChange={(v) => updateField('genre', v)}
            required
          />
          <FormField
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={(v) => updateField('description', v)}
          />
          <FormField
            label="Image URL"
            type="url"
            value={formData.image}
            onChange={(v) => updateField('image', v)}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Spotify URL"
              type="url"
              value={formData.spotifyUrl}
              onChange={(v) => updateField('spotifyUrl', v)}
            />
            <FormField
              label="YouTube URL"
              type="url"
              value={formData.youtubeUrl}
              onChange={(v) => updateField('youtubeUrl', v)}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              label="Rating (1-5)"
              type="number"
              value={formData.rating}
              onChange={(v) => updateField('rating', Math.min(5, Math.max(1, Number(v))))}
            />
            <FormField
              label="Featured"
              type="checkbox"
              value={formData.featured}
              onChange={(v) => updateField('featured', v)}
            />
          </div>
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
