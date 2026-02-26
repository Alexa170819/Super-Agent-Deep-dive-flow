# AilyLabs Insights Platform - Prototype

This prototype walks through the deep dive from a story card in my agent to deep dive in super agent, using 3 different options for story card to deep dive

## Features

### 1. Story Card Modal (3 Options)
Interactive story cards with three display variants:
- **Teaser Card** - Minimal, curiosity-driven design
- **Impact Card** - Detailed impact analysis
- **Driver Card** - Root cause and driver analysis

Users can toggle between these views and deep dive into Super Agent analysis.

### 2. Personalizable Playlists ("Plailists")
Create, manage, and share dynamic collections of storytelling insights:
- **Quick Start** - AI-generated playlists based on user profile and meetings
- **My Plailists** - User-created personalized collections
- **Create New Plailist** - Natural language search to find relevant stories
- **Edit & Personalize** - Add stories, clone, and reorder playlists
- **Meeting Mode** - Full-screen presentation mode

## Tech Stack

- React 19.1
- Vite 7.1
- React Router DOM - For navigation
- CSS Modules - Component-specific styling
- LocalStorage - For playlist persistence

## Project Structure

```
src/
├── components/
│   ├── StoryCardModal.jsx          # Story card modal with 3 options
│   ├── storyCards/
│   │   ├── TeaserCard.jsx         # Teaser view
│   │   ├── ImpactCard.jsx         # Impact view
│   │   └── DriverCard.jsx        # Driver view
│   ├── PlaylistsPage.jsx          # Main playlists dashboard
│   ├── PlaylistCreator.jsx         # Create new playlist
│   ├── PlaylistEditor.jsx         # Edit playlist
│   ├── PlaylistDetailPage.jsx     # View playlist details
│   └── ...                        # Other components
├── pages/
│   ├── PlaylistsPage.jsx          # Main playlists page
│   ├── PlaylistDetailPage.jsx     # Playlist detail view
│   └── ...                        # Other pages
├── services/
│   ├── playlistService.js         # Playlist CRUD operations
│   ├── aiPlaylistService.js       # AI playlist generation
│   └── recSysOrchestrator.js      # Story generation
└── data/
    └── playlistData.js            # Playlist data structures
```

## Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Key Features

### Story Card Modal
- Toggle between Teaser, Impact, and Driver views
- Deep dive into Super Agent analysis
- Responsive design

### Personalizable Playlists
- **Quick Start Tab**: AI-generated playlists for first-time users
- **My Plailists Tab**: User-created collections
- **Create Flow**: Natural language search → Select stories → Edit order → Save
- **Edit Options**: Add stories, clone playlist, edit details
- **Meeting Mode**: Full-screen presentation

## Integration Points for AI Team

See `AI_TEAM_INTEGRATION_GUIDE.md` for complete integration documentation.

Main API endpoints needed:
1. `GET /api/v1/stories` - Story generation
2. `POST /api/v1/stories/search` - Story search by prompt
3. `POST /api/v1/playlists/generate` - AI playlist generation

## Documentation

- **AI_TEAM_INTEGRATION_GUIDE.md** - Complete integration guide for AI team
- **QUICK_START.md** - Quick setup guide
- **GITHUB_SETUP_STEPS.md** - GitHub repository setup

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Dark theme optimized

## Development

The prototype currently uses mock data and services. Real API integration points are documented in `AI_TEAM_INTEGRATION_GUIDE.md`.
