# Quick Start for AI Team

## 🚀 Getting Started (5 minutes)

```bash
# 1. Clone the repository
git clone <repository-url>
cd agent-generator-main

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173
```

## 📍 Key Integration Points

### 1. Story Generation API
**File**: `src/services/recSysOrchestrator.js` (line 54-56)

Replace mock service with your API:
```javascript
const stories = await fetch('/api/v1/stories').then(r => r.json());
```

### 2. Story Search API
**File**: `src/services/playlistService.js` (line 150-275)

Replace `searchStoriesForPlaylist()` to call your search API:
```javascript
const response = await fetch('/api/v1/stories/search', {
  method: 'POST',
  body: JSON.stringify({ prompt, filters })
});
```

### 3. AI Playlist Generation
**File**: `src/services/aiPlaylistService.js` (line 15-141)

Replace `generateAIPlaylists()` to call your AI service:
```javascript
const playlists = await fetch('/api/v1/playlists/generate', {
  method: 'POST',
  body: JSON.stringify({ role, context })
}).then(r => r.json());
```

## 📋 Required API Endpoints

1. **GET** `/api/v1/stories` - Get all stories
2. **POST** `/api/v1/stories/search` - Search stories by prompt
3. **POST** `/api/v1/playlists/generate` - Generate AI playlists

## 📖 Full Documentation

See `AI_TEAM_INTEGRATION_GUIDE.md` for complete details.

## 🧪 Test Your Integration

1. Go to `/playlists`
2. Click "Create New Plailist"
3. Enter: "Finance monthly review for US stores"
4. Verify stories appear from your API

## ⚙️ Configuration

Switch to real services in `src/services/recSysOrchestrator.js`:
```javascript
const config = {
  useMockServices: false, // Change this
  realServices: {
    contentLayer: yourAPIFunction
  }
};
```
