import { useState, useEffect } from 'react';
import { videosApi, type Video } from '@/services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

const emptyVideo: Omit<Video, '_id'> = {
  title: '',
  description: '',
  youtubeId: '',
  youtubeUrl: '',
  thumbnail: '',
  category: 'other',
  featured: false,
  published: true,
};

const categoryOptions = [
  { value: 'music-video', label: 'Music Video' },
  { value: 'interview', label: 'Interview' },
  { value: 'review', label: 'Review' },
  { value: 'behind-the-scenes', label: 'Behind the Scenes' },
  { value: 'other', label: 'Other' },
];

// Helper to extract YouTube ID from URL
const extractYoutubeId = (url: string): string => {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return '';
};

export default function VideosAdmin() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Video | null>(null);
  const [formData, setFormData] = useState(emptyVideo);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const data = await videosApi.getAll();
      setVideos(data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setFormData(emptyVideo);
    setModalOpen(true);
  };

  const handleEdit = (item: Video) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      youtubeId: item.youtubeId,
      youtubeUrl: item.youtubeUrl,
      thumbnail: item.thumbnail,
      category: item.category,
      featured: item.featured,
      published: item.published,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      await videosApi.delete(id);
      setVideos(videos.filter((v) => v._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const youtubeId = formData.youtubeId || extractYoutubeId(formData.youtubeUrl);
      const dataToSave = {
        ...formData,
        youtubeId,
        thumbnail: formData.thumbnail || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      };

      if (editItem?._id) {
        const updated = await videosApi.update(editItem._id, dataToSave);
        setVideos(videos.map((v) => (v._id === editItem._id ? updated : v)));
      } else {
        const created = await videosApi.create(dataToSave);
        setVideos([created, ...videos]);
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
    {
      key: 'title',
      label: 'Video',
      render: (item: Video) => (
        <div className="flex items-center gap-3">
          <img
            src={item.thumbnail || `https://img.youtube.com/vi/${item.youtubeId}/default.jpg`}
            alt={item.title}
            className="w-16 h-10 rounded object-cover"
          />
          <span className="line-clamp-1">{item.title}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item: Video) => (
        <span className="capitalize">{item.category.replace('-', ' ')}</span>
      ),
    },
    { key: 'featured', label: 'Featured' },
    { key: 'published', label: 'Published' },
  ];

  return (
    <>
      <DataTable
        title="Videos"
        data={videos}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Video' : 'Add Video'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            value={formData.title}
            onChange={(v) => updateField('title', v)}
            required
          />
          <FormField
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={(v) => updateField('description', v)}
          />
          <FormField
            label="YouTube URL"
            type="url"
            value={formData.youtubeUrl}
            onChange={(v) => updateField('youtubeUrl', v)}
            placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
            required
          />
          <FormField
            label="YouTube ID (auto-extracted from URL)"
            value={formData.youtubeId || extractYoutubeId(formData.youtubeUrl)}
            onChange={(v) => updateField('youtubeId', v)}
          />
          <FormField
            label="Thumbnail URL (auto-generated if empty)"
            type="url"
            value={formData.thumbnail}
            onChange={(v) => updateField('thumbnail', v)}
          />
          <FormField
            label="Category"
            type="select"
            value={formData.category}
            onChange={(v) => updateField('category', v)}
            options={categoryOptions}
          />
          <div className="flex gap-6">
            <FormField
              label="Featured"
              type="checkbox"
              value={formData.featured}
              onChange={(v) => updateField('featured', v)}
            />
            <FormField
              label="Published"
              type="checkbox"
              value={formData.published}
              onChange={(v) => updateField('published', v)}
            />
          </div>
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
