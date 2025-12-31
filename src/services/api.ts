const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth helpers
export const getToken = () => localStorage.getItem('admin_token');
export const setToken = (token: string) => localStorage.setItem('admin_token', token);
export const removeToken = () => localStorage.removeItem('admin_token');

// Generic fetch wrapper with auth
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (username: string, password: string) =>
    fetchApi<{ token: string; user: { username: string; role: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  verify: () => fetchApi<{ valid: boolean; user: { username: string; role: string } }>('/auth/verify'),
};

// Generic CRUD functions
function createCrudApi<T extends { _id?: string }>(resource: string) {
  return {
    getAll: (params?: Record<string, string>) => {
      const query = params ? `?${new URLSearchParams(params)}` : '';
      return fetchApi<T[]>(`/${resource}${query}`);
    },
    getById: (id: string) => fetchApi<T>(`/${resource}/${id}`),
    create: (data: Omit<T, '_id'>) =>
      fetchApi<T>(`/${resource}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<T>) =>
      fetchApi<T>(`/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchApi<{ message: string }>(`/${resource}/${id}`, {
        method: 'DELETE',
      }),
  };
}

// Resource APIs
export interface Blog {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  externalUrl: string;
  featured: boolean;
  published: boolean;
  createdAt?: string;
}

export interface Artist {
  _id?: string;
  name: string;
  image: string;
  genre: string;
  bio: string;
  spotifyUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  featured: boolean;
  order: number;
}

export interface Interview {
  _id?: string;
  title: string;
  artistName: string;
  description: string;
  image: string;
  platform: 'twitter' | 'youtube' | 'podcast' | 'article' | 'other';
  externalUrl: string;
  featured: boolean;
  published: boolean;
}

export interface Playlist {
  _id?: string;
  title: string;
  description: string;
  spotifyId: string;
  spotifyUrl: string;
  coverImage: string;
  genre: string;
  featured: boolean;
  order: number;
}

export interface Video {
  _id?: string;
  title: string;
  description: string;
  youtubeId: string;
  youtubeUrl: string;
  thumbnail: string;
  category: 'music-video' | 'interview' | 'review' | 'behind-the-scenes' | 'other';
  featured: boolean;
  published: boolean;
}

export interface Recommendation {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  description: string;
  image: string;
  spotifyUrl: string;
  youtubeUrl: string;
  rating: number;
  featured: boolean;
}

export interface Trivia {
  _id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'hip-hop' | 'rnb' | 'afrobeats' | 'general' | 'history';
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  active: boolean;
}

export const blogsApi = createCrudApi<Blog>('blogs');
export const artistsApi = createCrudApi<Artist>('artists');
export const interviewsApi = createCrudApi<Interview>('interviews');
export const playlistsApi = createCrudApi<Playlist>('playlists');
export const videosApi = createCrudApi<Video>('videos');
export const recommendationsApi = createCrudApi<Recommendation>('recommendations');
export const triviaApi = {
  ...createCrudApi<Trivia>('trivia'),
  getRandom: (count: number = 10) => fetchApi<Trivia[]>(`/trivia/random/${count}`),
};
