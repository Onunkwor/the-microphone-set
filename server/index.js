import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { login, verifyToken, authMiddleware } from './middleware/auth.js';

// Import routes
import blogRoutes from './routes/blog.js';
import artistRoutes from './routes/artists.js';
import interviewRoutes from './routes/interviews.js';
import playlistRoutes from './routes/playlists.js';
import videoRoutes from './routes/videos.js';
import recommendationRoutes from './routes/recommendations.js';
import triviaRoutes from './routes/trivia.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Auth routes
app.post('/api/auth/login', login);
app.get('/api/auth/verify', authMiddleware, verifyToken);

// API routes
app.use('/api/blogs', blogRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/trivia', triviaRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
