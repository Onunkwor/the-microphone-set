import { useState, useEffect } from 'react';
import { playlistsApi, type Playlist } from '@/services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

const emptyPlaylist: Omit<Playlist, '_id'> = {
  title: '',
  description: '',
  spotifyId: '',
  spotifyUrl: '',
  coverImage: '',
  genre: '',
  featured: false,
  order: 0,
};

// Helper to extract Spotify ID from URL
const extractSpotifyId = (url: string): string => {
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : '';
};

export default function PlaylistsAdmin() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Playlist | null>(null);
  const [formData, setFormData] = useState(emptyPlaylist);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const data = await playlistsApi.getAll();
      setPlaylists(data);
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setFormData(emptyPlaylist);
    setModalOpen(true);
  };

  const handleEdit = (item: Playlist) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      spotifyId: item.spotifyId,
      spotifyUrl: item.spotifyUrl,
      coverImage: item.coverImage,
      genre: item.genre,
      featured: item.featured,
      order: item.order,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this playlist?')) return;
    try {
      await playlistsApi.delete(id);
      setPlaylists(playlists.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Auto-extract spotify ID from URL if not provided
      const dataToSave = {
        ...formData,
        spotifyId: formData.spotifyId || extractSpotifyId(formData.spotifyUrl),
      };

      if (editItem?._id) {
        const updated = await playlistsApi.update(editItem._id, dataToSave);
        setPlaylists(playlists.map((p) => (p._id === editItem._id ? updated : p)));
      } else {
        const created = await playlistsApi.create(dataToSave);
        setPlaylists([created, ...playlists]);
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
    { key: 'genre', label: 'Genre' },
    { key: 'spotifyId', label: 'Spotify ID' },
    { key: 'order', label: 'Order' },
    { key: 'featured', label: 'Featured' },
  ];

  return (
    <>
      <DataTable
        title="Playlists"
        data={playlists}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Playlist' : 'Add Playlist'}
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
            label="Spotify URL"
            type="url"
            value={formData.spotifyUrl}
            onChange={(v) => updateField('spotifyUrl', v)}
            placeholder="https://open.spotify.com/playlist/..."
            required
          />
          <FormField
            label="Spotify ID (auto-extracted from URL)"
            value={formData.spotifyId || extractSpotifyId(formData.spotifyUrl)}
            onChange={(v) => updateField('spotifyId', v)}
          />
          <FormField
            label="Cover Image URL"
            type="url"
            value={formData.coverImage}
            onChange={(v) => updateField('coverImage', v)}
          />
          <FormField
            label="Genre"
            value={formData.genre}
            onChange={(v) => updateField('genre', v)}
          />
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
