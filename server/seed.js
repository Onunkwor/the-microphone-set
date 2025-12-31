import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';
import Interview from './models/Interview.js';
import Playlist from './models/Playlist.js';
import Video from './models/Video.js';
import Artist from './models/Artist.js';
import Recommendation from './models/Recommendation.js';
import Trivia from './models/Trivia.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Blog.deleteMany({}),
      Interview.deleteMany({}),
      Playlist.deleteMany({}),
      Video.deleteMany({}),
      Artist.deleteMany({}),
      Recommendation.deleteMany({}),
      Trivia.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Seed Blogs
    const blogs = [
      {
        title: 'The Microphone Set Blog',
        excerpt: 'Your source for the latest in music culture, artist spotlights, and exclusive content.',
        content: 'Welcome to The Microphone Set blog. Stay tuned for exclusive articles, reviews, and more.',
        category: 'General',
        externalUrl: 'https://open.substack.com/pub/themicrophoneset',
        featured: true,
        published: true
      }
    ];
    await Blog.insertMany(blogs);
    console.log('Blogs seeded');

    // Seed Videos (YouTube)
    const videos = [
      {
        title: 'The Microphone Set Video 1',
        description: 'Featured video from The Microphone Set',
        youtubeId: 'NXR0tMt5CV4',
        youtubeUrl: 'https://youtu.be/NXR0tMt5CV4?si=NNacwQHv1jJEM-eo',
        category: 'other',
        featured: true
      },
      {
        title: 'The Microphone Set Video 2',
        description: 'Featured video from The Microphone Set',
        youtubeId: 'FPvi_yoLrK0',
        youtubeUrl: 'https://youtu.be/FPvi_yoLrK0?si=irYHnOTTG_mql7Yv',
        category: 'other',
        featured: true
      },
      {
        title: 'The Microphone Set Video 3',
        description: 'Featured video from The Microphone Set',
        youtubeId: 'Yu_RZ33wuuo',
        youtubeUrl: 'https://youtu.be/Yu_RZ33wuuo?si=NanUYr5zviGm8LXs',
        category: 'other',
        featured: true
      }
    ];
    await Video.insertMany(videos);
    console.log('Videos seeded');

    // Seed Interviews (Twitter/X)
    const interviews = [
      {
        title: 'Artist Interview 1',
        artistName: 'Featured Artist',
        description: 'Exclusive interview on Twitter',
        platform: 'twitter',
        externalUrl: 'https://x.com/microphoneset/status/1667954745246470152',
        featured: true
      },
      {
        title: 'Artist Interview 2',
        artistName: 'Featured Artist',
        description: 'Exclusive interview on Twitter',
        platform: 'twitter',
        externalUrl: 'https://x.com/microphoneset/status/1725969442394210405',
        featured: true
      },
      {
        title: 'Artist Interview 3',
        artistName: 'Featured Artist',
        description: 'Exclusive interview on Twitter',
        platform: 'twitter',
        externalUrl: 'https://x.com/microphoneset/status/1910785025634693244',
        featured: true
      },
      {
        title: 'Artist Interview 4',
        artistName: 'Featured Artist',
        description: 'Exclusive interview on Twitter',
        platform: 'twitter',
        externalUrl: 'https://x.com/microphoneset/status/1746260938359988660',
        featured: true
      }
    ];
    await Interview.insertMany(interviews);
    console.log('Interviews seeded');

    // Seed Playlists (Spotify)
    const playlists = [
      {
        title: 'The Microphone Set Playlist 1',
        description: 'Curated by The Microphone Set',
        spotifyId: '0LcvsPKbic8iScnHD5vZwx',
        spotifyUrl: 'https://open.spotify.com/playlist/0LcvsPKbic8iScnHD5vZwx',
        featured: true,
        order: 1
      },
      {
        title: 'The Microphone Set Playlist 2',
        description: 'Curated by The Microphone Set',
        spotifyId: '0r0cMav9opCDU5ITGzZosG',
        spotifyUrl: 'https://open.spotify.com/playlist/0r0cMav9opCDU5ITGzZosG',
        featured: true,
        order: 2
      },
      {
        title: 'The Microphone Set Playlist 3',
        description: 'Curated by The Microphone Set',
        spotifyId: '2OI0KtgFv6SY2JaW7AFNx0',
        spotifyUrl: 'https://open.spotify.com/playlist/2OI0KtgFv6SY2JaW7AFNx0',
        featured: true,
        order: 3
      }
    ];
    await Playlist.insertMany(playlists);
    console.log('Playlists seeded');

    // Seed sample Artists
    const artists = [
      {
        name: 'Sample Artist 1',
        image: '/merch1.jpg',
        genre: 'Hip-Hop',
        bio: 'An emerging artist making waves in the music scene.',
        featured: true,
        order: 1
      },
      {
        name: 'Sample Artist 2',
        image: '/merch2.jpg',
        genre: 'R&B',
        bio: 'A soulful voice bringing fresh perspectives to R&B.',
        featured: true,
        order: 2
      }
    ];
    await Artist.insertMany(artists);
    console.log('Artists seeded');

    // Seed sample Recommendations
    const recommendations = [
      {
        title: 'Featured Track 1',
        artist: 'Various Artists',
        genre: 'Hip-Hop',
        description: 'A must-listen track from our curated selection.',
        rating: 5,
        featured: true
      },
      {
        title: 'Featured Track 2',
        artist: 'Various Artists',
        genre: 'Afrobeats',
        description: 'Fresh sounds from the Afrobeats scene.',
        rating: 5,
        featured: true
      }
    ];
    await Recommendation.insertMany(recommendations);
    console.log('Recommendations seeded');

    // Seed Trivia questions
    const triviaQuestions = [
      {
        question: 'Who is known as the "King of Pop"?',
        options: ['Prince', 'Michael Jackson', 'James Brown', 'Stevie Wonder'],
        correctAnswer: 1,
        category: 'general',
        difficulty: 'easy'
      },
      {
        question: 'Which artist released the album "Thriller"?',
        options: ['Whitney Houston', 'Michael Jackson', 'Prince', 'Madonna'],
        correctAnswer: 1,
        category: 'general',
        difficulty: 'easy'
      },
      {
        question: 'What year was hip-hop born in the Bronx?',
        options: ['1970', '1973', '1976', '1979'],
        correctAnswer: 1,
        category: 'hip-hop',
        difficulty: 'medium'
      },
      {
        question: 'Who is considered the "Godfather of Hip-Hop"?',
        options: ['Grandmaster Flash', 'DJ Kool Herc', 'Afrika Bambaataa', 'Run-DMC'],
        correctAnswer: 1,
        category: 'hip-hop',
        difficulty: 'medium'
      },
      {
        question: 'Which Nigerian artist is known as "Starboy"?',
        options: ['Davido', 'Burna Boy', 'Wizkid', 'Olamide'],
        correctAnswer: 2,
        category: 'afrobeats',
        difficulty: 'easy'
      }
    ];
    await Trivia.insertMany(triviaQuestions);
    console.log('Trivia questions seeded');

    console.log('\\nSeed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
