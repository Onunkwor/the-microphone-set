import { useState, useEffect } from 'react';
import { interviewsApi, type Interview } from '@/services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

const emptyInterview: Omit<Interview, '_id'> = {
  title: '',
  artistName: '',
  description: '',
  image: '',
  platform: 'twitter',
  externalUrl: '',
  featured: false,
  published: true,
};

const platformOptions = [
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'article', label: 'Article' },
  { value: 'other', label: 'Other' },
];

export default function InterviewsAdmin() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Interview | null>(null);
  const [formData, setFormData] = useState(emptyInterview);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const data = await interviewsApi.getAll();
      setInterviews(data);
    } catch (error) {
      console.error('Failed to fetch interviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setFormData(emptyInterview);
    setModalOpen(true);
  };

  const handleEdit = (item: Interview) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      artistName: item.artistName,
      description: item.description,
      image: item.image,
      platform: item.platform,
      externalUrl: item.externalUrl,
      featured: item.featured,
      published: item.published,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this interview?')) return;
    try {
      await interviewsApi.delete(id);
      setInterviews(interviews.filter((i) => i._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem?._id) {
        const updated = await interviewsApi.update(editItem._id, formData);
        setInterviews(interviews.map((i) => (i._id === editItem._id ? updated : i)));
      } else {
        const created = await interviewsApi.create(formData);
        setInterviews([created, ...interviews]);
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
    { key: 'artistName', label: 'Artist' },
    {
      key: 'platform',
      label: 'Platform',
      render: (item: Interview) => (
        <span className="capitalize">{item.platform}</span>
      ),
    },
    { key: 'featured', label: 'Featured' },
    { key: 'published', label: 'Published' },
  ];

  return (
    <>
      <DataTable
        title="Interviews"
        data={interviews}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Interview' : 'Add Interview'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            value={formData.title}
            onChange={(v) => updateField('title', v)}
            required
          />
          <FormField
            label="Artist Name"
            value={formData.artistName}
            onChange={(v) => updateField('artistName', v)}
            required
          />
          <FormField
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={(v) => updateField('description', v)}
            required
          />
          <FormField
            label="Image URL"
            type="url"
            value={formData.image}
            onChange={(v) => updateField('image', v)}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Platform"
              type="select"
              value={formData.platform}
              onChange={(v) => updateField('platform', v)}
              options={platformOptions}
            />
            <FormField
              label="External URL"
              type="url"
              value={formData.externalUrl}
              onChange={(v) => updateField('externalUrl', v)}
              required
            />
          </div>
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
