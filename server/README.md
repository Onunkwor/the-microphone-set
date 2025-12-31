# The Microphone Set - Backend API

Express + MongoDB backend for The Microphone Set website.

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud like MongoDB Atlas)

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/microphone-set
JWT_SECRET=your-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

3. Start MongoDB (if using local):
```bash
mongod
```

4. Seed the database with initial data:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev    # Development with auto-reload
npm start      # Production
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Public Endpoints
- `GET /api/blogs` - Get all blogs
- `GET /api/artists` - Get all artists
- `GET /api/interviews` - Get all interviews
- `GET /api/playlists` - Get all playlists
- `GET /api/videos` - Get all videos
- `GET /api/recommendations` - Get all recommendations
- `GET /api/trivia` - Get trivia questions
- `GET /api/trivia/random/:count` - Get random trivia questions

### Admin Endpoints (requires authentication)
All resources support CRUD operations:
- `POST /api/{resource}` - Create
- `PUT /api/{resource}/:id` - Update
- `DELETE /api/{resource}/:id` - Delete

## Admin Panel

Access the admin panel at: `http://localhost:5173/admin`

Default credentials:
- Username: `admin`
- Password: `admin123`

**Important:** Change these credentials in production!
