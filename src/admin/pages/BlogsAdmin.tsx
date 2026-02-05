import { useState, useEffect } from 'react';
import { blogsApi, type Blog } from '@/services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

const emptyBlog: Omit<Blog, '_id' | 'createdAt'> = {
  title: '',
  excerpt: '',
  content: '',
  image: '',
  category: 'General',
  author: 'The Microphone Set',
  externalUrl: '',
  featured: false,
  published: true,
};

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Blog | null>(null);
  const [formData, setFormData] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const data = await blogsApi.getAll();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setFormData(emptyBlog);
    setModalOpen(true);
  };

  const handleEdit = (item: Blog) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      category: item.category,
      author: item.author,
      externalUrl: item.externalUrl,
      featured: item.featured,
      published: item.published,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await blogsApi.delete(id);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error: any) {
      console.error('Failed to delete:', error);
      alert(`Failed to delete blog: ${error.message || 'Unknown error'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem?._id) {
        const updated = await blogsApi.update(editItem._id, formData);
        setBlogs(blogs.map((b) => (b._id === editItem._id ? updated : b)));
      } else {
        const created = await blogsApi.create(formData);
        setBlogs([created, ...blogs]);
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
    { key: 'category', label: 'Category' },
    { key: 'author', label: 'Author' },
    { key: 'featured', label: 'Featured' },
    { key: 'published', label: 'Published' },
  ];

  return (
    <>
      <DataTable
        title="Blogs"
        data={blogs}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Blog' : 'Add Blog'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            value={formData.title}
            onChange={(v) => updateField('title', v)}
            required
          />
          <FormField
            label="Excerpt"
            type="textarea"
            value={formData.excerpt}
            onChange={(v) => updateField('excerpt', v)}
            required
          />
          <FormField
            label="Content"
            type="textarea"
            value={formData.content}
            onChange={(v) => updateField('content', v)}
            rows={5}
          />
          <FormField
            label="Image URL"
            type="url"
            value={formData.image}
            onChange={(v) => updateField('image', v)}
            required
          />
          <FormField
            label="External URL"
            type="url"
            value={formData.externalUrl}
            onChange={(v) => updateField('externalUrl', v)}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Category"
              value={formData.category}
              onChange={(v) => updateField('category', v)}
              required
            />
            <FormField
              label="Author"
              value={formData.author}
              onChange={(v) => updateField('author', v)}
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
