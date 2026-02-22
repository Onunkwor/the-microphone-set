import { useState, useEffect } from 'react';
import { artistsApi, type Artist } from '@/services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

const emptyArtist: Omit<Artist, '_id'> = {
  name: '',
  image: '',
  genre: '',
  bio: '',
  spotifyUrl: '',
  instagramUrl: '',
  twitterUrl: '',
  featured: false,
  order: 0,
};

export default function ArtistsAdmin() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Artist | null>(null);
  const [formData, setFormData] = useState(emptyArtist);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const data = await artistsApi.getAll();
      setArtists(data);
    } catch (error) {
      console.error('Failed to fetch artists:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setFormData(emptyArtist);
    setModalOpen(true);
  };

  const handleEdit = (item: Artist) => {
    setEditItem(item);
    setFormData({
      name: item.name,
      image: item.image,
      genre: item.genre,
      bio: item.bio,
      spotifyUrl: item.spotifyUrl,
      instagramUrl: item.instagramUrl,
      twitterUrl: item.twitterUrl,
      featured: item.featured,
      order: item.order,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artist?')) return;
    try {
      await artistsApi.delete(id);
      setArtists(artists.filter((a) => a._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem?._id) {
        const updated = await artistsApi.update(editItem._id, formData);
        setArtists(artists.map((a) => (a._id === editItem._id ? updated : a)));
      } else {
        const created = await artistsApi.create(formData);
        setArtists([created, ...artists]);
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
      key: 'name',
      label: 'Artist',
      render: (item: Artist) => (
        <div className="flex items-center gap-3">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span>{item.name}</span>
        </div>
      ),
    },
    { key: 'genre', label: 'Genre' },
    { key: 'order', label: 'Order' },
    { key: 'featured', label: 'Featured' },
  ];

  return (
    <>
      <DataTable
        title="Artists"
        data={artists}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Artist' : 'Add Artist'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            value={formData.name}
            onChange={(v) => updateField('name', v)}
            required
          />
          <FormField
            label="Image URL"
            type="url"
            value={formData.image}
            onChange={(v) => updateField('image', v)}
            placeholder="/merch1.jpg or https://..."
            required
          />
          <FormField
            label="Genre"
            value={formData.genre}
            onChange={(v) => updateField('genre', v)}
            required
          />
          <FormField
            label="Bio"
            type="textarea"
            value={formData.bio}
            onChange={(v) => updateField('bio', v)}
            required
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Spotify URL"
              type="url"
              value={formData.spotifyUrl}
              onChange={(v) => updateField('spotifyUrl', v)}
            />
            <FormField
              label="Instagram URL"
              type="url"
              value={formData.instagramUrl}
              onChange={(v) => updateField('instagramUrl', v)}
            />
            <FormField
              label="Twitter URL"
              type="url"
              value={formData.twitterUrl}
              onChange={(v) => updateField('twitterUrl', v)}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              label="Display Order"
              type="number"
              value={formData.order}
              onChange={(v) => updateField('order', v)}
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
