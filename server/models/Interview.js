import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artistName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  platform: {
    type: String,
    enum: ['twitter', 'youtube', 'podcast', 'article', 'other'],
    default: 'twitter'
  },
  externalUrl: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Interview', interviewSchema);
