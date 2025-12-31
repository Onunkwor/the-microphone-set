import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  spotifyId: {
    type: String,
    required: true
  },
  spotifyUrl: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: ''
  },
  genre: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Playlist', playlistSchema);
