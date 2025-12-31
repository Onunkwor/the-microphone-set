import express from 'express';
import Playlist from '../models/Playlist.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all playlists (public)
router.get('/', async (req, res) => {
  try {
    const { featured, genre } = req.query;
    const filter = {};

    if (featured !== undefined) filter.featured = featured === 'true';
    if (genre) filter.genre = genre;

    const playlists = await Playlist.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single playlist (public)
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create playlist (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    const saved = await playlist.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update playlist (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete playlist (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
