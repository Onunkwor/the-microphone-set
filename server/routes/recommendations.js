import express from 'express';
import Recommendation from '../models/Recommendation.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all recommendations (public)
router.get('/', async (req, res) => {
  try {
    const { featured, genre } = req.query;
    const filter = {};

    if (featured !== undefined) filter.featured = featured === 'true';
    if (genre) filter.genre = genre;

    const recommendations = await Recommendation.find(filter).sort({ createdAt: -1 });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single recommendation (public)
router.get('/:id', async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create recommendation (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const recommendation = new Recommendation(req.body);
    const saved = await recommendation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update recommendation (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });
    res.json(recommendation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete recommendation (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndDelete(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });
    res.json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
