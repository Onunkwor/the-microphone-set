import express from 'express';
import Trivia from '../models/Trivia.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all trivia questions (public - only active ones)
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, active } = req.query;
    const filter = {};

    // Public access only shows active questions
    if (active !== undefined) {
      filter.active = active === 'true';
    } else {
      filter.active = true;
    }

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const trivia = await Trivia.find(filter).sort({ createdAt: -1 });
    res.json(trivia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get random trivia questions for quiz
router.get('/random/:count', async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 10;
    const { category, difficulty } = req.query;
    const filter = { active: true };

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const trivia = await Trivia.aggregate([
      { $match: filter },
      { $sample: { size: count } }
    ]);
    res.json(trivia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single trivia question (public)
router.get('/:id', async (req, res) => {
  try {
    const trivia = await Trivia.findById(req.params.id);
    if (!trivia) return res.status(404).json({ message: 'Trivia question not found' });
    res.json(trivia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create trivia question (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const trivia = new Trivia(req.body);
    const saved = await trivia.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Bulk create trivia questions (admin only)
router.post('/bulk', authMiddleware, async (req, res) => {
  try {
    const { questions } = req.body;
    if (!Array.isArray(questions)) {
      return res.status(400).json({ message: 'Questions must be an array' });
    }
    const saved = await Trivia.insertMany(questions);
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update trivia question (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const trivia = await Trivia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trivia) return res.status(404).json({ message: 'Trivia question not found' });
    res.json(trivia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete trivia question (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const trivia = await Trivia.findByIdAndDelete(req.params.id);
    if (!trivia) return res.status(404).json({ message: 'Trivia question not found' });
    res.json({ message: 'Trivia question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
