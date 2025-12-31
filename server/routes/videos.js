import express from 'express';
import Video from '../models/Video.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all videos (public)
router.get('/', async (req, res) => {
  try {
    const { published, featured, category } = req.query;
    const filter = {};

    if (published !== undefined) filter.published = published === 'true';
    if (featured !== undefined) filter.featured = featured === 'true';
    if (category) filter.category = category;

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single video (public)
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create video (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const video = new Video(req.body);
    const saved = await video.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update video (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete video (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
