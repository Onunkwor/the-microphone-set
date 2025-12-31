import express from 'express';
import Interview from '../models/Interview.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all interviews (public)
router.get('/', async (req, res) => {
  try {
    const { published, featured, platform } = req.query;
    const filter = {};

    if (published !== undefined) filter.published = published === 'true';
    if (featured !== undefined) filter.featured = featured === 'true';
    if (platform) filter.platform = platform;

    const interviews = await Interview.find(filter).sort({ createdAt: -1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single interview (public)
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create interview (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const interview = new Interview(req.body);
    const saved = await interview.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update interview (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete interview (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
