import express from 'express';
import Artist from '../models/Artist.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all artists (public)
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = {};
    if (featured !== undefined) filter.featured = featured === 'true';

    const artists = await Artist.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single artist (public)
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create artist (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const artist = new Artist(req.body);
    const saved = await artist.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update artist (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete artist (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json({ message: 'Artist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
