# AI Team Integration Guide

## Overview

This document provides a comprehensive guide for integrating real AI-generated data into the AilyLabs Insights Platform prototype. The prototype currently uses mock data and services that need to be replaced with real API endpoints and data sources.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd agent-generator-main

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Architecture Overview

The application follows a 3-layer recommendation system architecture:

1. **Content Layer** - Generates stories from normalized data
2. **Personalization Layer** - Scores and filters stories based on user role
3. **Decision Layer** - Generates actionable decisions from top stories

### Current State: Mock Services
All services currently use mock data located in:
- `src/services/mock/contentLayerService.js`
- `src/services/mock/personalizationLayerService.js`
- `src/services/mock/decisionLayerService.js`

### Target State: Real Services
These mock services need to be replaced with real API calls.

---

## Key Integration Points

### 1. Story Generation (Content Layer)

**Location**: `src/services/recSysOrchestrator.js`

**Current Implementation**: Uses `generateStories()` from `contentLayerService.js`

**What Needs to Be Replaced**:
```javascript
// Current (mock)
const stories = config.useMockServices
  ? config.mockServices.contentLayer()
  : await config.realServices.contentLayer();
```

**Required API Contract**:
```typescript
interface Story {
  storyId: string;
  title: string;
  category: string; // e.g., ".fin", ".ops", ".sales"
  narrative: string;
  timestamp: number;
  domain: string; // e.g., "finance", "operations", "sales"
  type: string; // e.g., "sales_opportunity", "anomaly", "trend"
  impact: {
    opportunity?: boolean;
    risk?: "low" | "medium" | "high";
    financial?: string; // e.g., "+$300M (+12.3%)"
    kpi?: string;
  };
  rawData: {
    metadata: {
      region?: string;
      country?: string;
      entity?: string;
      channel?: string;
      category?: string;
      [key: string]: any;
    };
    metrics: {
      [key: string]: number;
    };
  };
  keyInsight?: string;
  urgency?: {
    level: "low" | "medium" | "high";
    timeToAct: string;
  };
  primaryAction?: {
    label: string;
    description: string;
  };
  trendDirection?: "up" | "down" | "neutral";
  anomalyScore?: number; // 0-1
}
```

**Integration Steps**:
1. Create a new service file: `src/services/real/contentLayerService.js`
2. Implement function that calls your API endpoint
3. Transform API response to match `Story` interface
4. Update `recSysOrchestrator.js` config to use real service

**Example Implementation**:
```javascript
// src/services/real/contentLayerService.js
export const getStoriesFromAPI = async () => {
  const response = await fetch('/api/v1/stories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add auth headers if needed
    }
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Transform API response to Story format
  return data.stories.map(transformToStory);
};

const transformToStory = (apiStory) => {
  return {
    storyId: apiStory.id,
    title: apiStory.title,
    category: apiStory.category,
    narrative: apiStory.narrative,
    timestamp: new Date(apiStory.timestamp).getTime(),
    domain: apiStory.domain,
    type: apiStory.type,
    impact: {
      opportunity: apiStory.impact?.opportunity || false,
      risk: apiStory.impact?.risk,
      financial: apiStory.impact?.financial,
      kpi: apiStory.impact?.kpi
    },
    rawData: {
      metadata: apiStory.metadata || {},
      metrics: apiStory.metrics || {}
    },
    keyInsight: apiStory.keyInsight,
    urgency: apiStory.urgency,
    primaryAction: apiStory.primaryAction,
    trendDirection: apiStory.trendDirection,
    anomalyScore: apiStory.anomalyScore
  };
};
```

---

### 2. Story Search for Playlists

**Location**: `src/services/playlistService.js` → `searchStoriesForPlaylist()`

**Current Implementation**: 
- Uses `getPersonalizedStories()` from orchestrator
- Has hardcoded logic for US stores queries
- Falls back to `generateUSStoreStories()` mock function

**What Needs to Be Replaced**:
```javascript
// Current (lines 150-275)
export const searchStoriesForPlaylist = async (prompt) => {
  // ... filtering logic ...
  // Returns mock stories for US stores
  if (isUSStores && isFinance) {
    return generateUSStoreStories();
  }
  // ...
}
```

**Required Functionality**:
- Accept a natural language prompt (e.g., "Finance monthly review for US stores")
- Search/filter stories based on:
  - Keywords (finance, sales, revenue, etc.)
  - Region (US, Europe, etc.)
  - Entity (stores, online, etc.)
  - Category (handbags, ready-to-wear, etc.)
  - Time period (monthly, quarterly, etc.)
- Return relevant stories matching the query

**Integration Steps**:
1. Create search API endpoint that accepts:
   - `prompt`: string (natural language query)
   - `filters`: object (optional filters)
2. Update `searchStoriesForPlaylist()` to call your API
3. Ensure returned stories match the `Story` interface

**Example API Contract**:
```typescript
POST /api/v1/stories/search
Body: {
  prompt: string;
  filters?: {
    region?: string;
    entity?: string;
    category?: string;
    domain?: string;
    timePeriod?: string;
  };
}

Response: {
  stories: Story[];
  metadata: {
    totalResults: number;
    searchTime: number;
  };
}
```

---

### 3. AI-Generated Playlists

**Location**: `src/services/aiPlaylistService.js`

**Current Implementation**: 
- Generates playlists based on:
  - Monthly review cycle
  - Top opportunities
  - High priority risks
  - Upcoming meetings

**What Needs to Be Replaced**:
```javascript
// Current (lines 15-141)
export const generateAIPlaylists = async (role = 'cfo', context = {}) => {
  // Gets stories from orchestrator
  // Filters and groups them
  // Creates playlists
}
```

**Required Functionality**:
- Generate playlists automatically based on:
  - User role (cfo, financial-manager, etc.)
  - User profile/preferences
  - Upcoming meetings/calendar
  - Recent activity
  - Business context (month-end, quarter-end, etc.)
- Return playlists with:
  - Relevant story IDs
  - Descriptive names and categories
  - Metadata indicating AI generation

**Integration Steps**:
1. Create API endpoint: `POST /api/v1/playlists/generate`
2. Accept user context (role, meetings, preferences)
3. Use AI to:
   - Understand user intent
   - Select relevant stories
   - Group stories logically
   - Generate descriptive names
4. Return playlists in the format expected by the frontend

**Example API Contract**:
```typescript
POST /api/v1/playlists/generate
Body: {
  role: string;
  context: {
    upcomingMeetings?: Array<{
      id: string;
      title: string;
      description?: string;
      date: string;
      category?: string;
    }>;
    preferences?: {
      focusAreas?: string[];
      timeHorizon?: string;
    };
    recentActivity?: any;
  };
}

Response: {
  playlists: Array<{
    name: string;
    category: string;
    description: string;
    storyIds: string[];
    metadata: {
      aiGenerated: true;
      generatedAt: number;
      reason: string;
      source: 'ai';
    };
  }>;
}
```

---

### 4. Story Personalization

**Location**: `src/services/mock/personalizationLayerService.js`

**Current Implementation**: Scores stories based on role with mock logic

**What Needs to Be Replaced**:
- Personalization scoring algorithm
- Role-based filtering
- User preference matching

**Integration Steps**:
1. Create personalization API endpoint
2. Implement scoring based on:
   - User role
   - Historical behavior
   - Preferences
   - Context
3. Return scored and ranked stories

---

### 5. Decision Generation

**Location**: `src/services/mock/decisionLayerService.js`

**Current Implementation**: Generates mock actionable decisions from stories

**What Needs to Be Replaced**:
- Decision generation logic
- Action recommendation system

**Integration Steps**:
1. Create decision generation API
2. Analyze stories to extract:
   - Actionable insights
   - Recommended actions
   - Impact estimates
   - Authority requirements

---

## Data Structures Reference

### Playlist Structure
```typescript
interface Playlist {
  id: string;
  name: string;
  category: string;
  description?: string;
  storyIds: string[]; // Ordered list of story IDs
  createdAt: number;
  updatedAt: number;
  theme?: {
    gradient?: string;
    color?: string;
  };
  metadata?: {
    aiGenerated?: boolean;
    isSystemPlaylist?: boolean;
    generatedAt?: number;
    reason?: string;
    source?: string;
    meetingId?: string;
    meetingDate?: string;
  };
}
```

### Story Structure (Full)
See section 1 above for complete `Story` interface.

---

## Configuration

### Switching to Real Services

**File**: `src/services/recSysOrchestrator.js`

```javascript
const config = {
  useMockServices: false, // Change to false
  realServices: {
    contentLayer: getStoriesFromAPI, // Your implementation
    personalizationLayer: personalizeStoriesAPI, // Your implementation
    decisionLayer: generateDecisionsAPI // Your implementation
  }
};
```

---

## Key Files to Modify

### High Priority
1. **`src/services/recSysOrchestrator.js`**
   - Update config to use real services
   - Ensure error handling

2. **`src/services/playlistService.js`**
   - Replace `searchStoriesForPlaylist()` with API call
   - Remove `generateUSStoreStories()` mock function

3. **`src/services/aiPlaylistService.js`**
   - Replace `generateAIPlaylists()` with API call

### Medium Priority
4. **`src/services/mock/personalizationLayerService.js`**
   - Create real personalization service

5. **`src/services/mock/decisionLayerService.js`**
   - Create real decision generation service

### Low Priority (Optional)
6. **`src/services/playlistService.js`**
   - Consider moving playlist storage from localStorage to backend
   - Add API endpoints for playlist CRUD operations

---

## API Endpoints Summary

You'll need to implement the following endpoints:

### Stories
- `GET /api/v1/stories` - Get all stories
- `POST /api/v1/stories/search` - Search stories by prompt/filters
- `GET /api/v1/stories/:id` - Get single story details

### Playlists
- `POST /api/v1/playlists/generate` - Generate AI playlists
- `GET /api/v1/playlists` - Get user playlists (optional, currently uses localStorage)
- `POST /api/v1/playlists` - Create playlist (optional)
- `PUT /api/v1/playlists/:id` - Update playlist (optional)
- `DELETE /api/v1/playlists/:id` - Delete playlist (optional)

### Personalization
- `POST /api/v1/personalize` - Personalize stories for user

### Decisions
- `POST /api/v1/decisions/generate` - Generate decisions from stories

---

## Testing Your Integration

### 1. Test Story Generation
- Navigate to `/playlists`
- Click "Create New Plailist"
- Enter a prompt like "Finance monthly review for US stores"
- Verify stories are returned from your API

### 2. Test AI Playlist Generation
- Navigate to `/playlists`
- Check "Quick Start" tab
- Verify AI-generated playlists appear

### 3. Test Story Search
- Create a new playlist
- Search for various queries
- Verify relevant stories are returned

---

## Common Issues & Solutions

### Issue: Stories not loading
**Solution**: 
- Check browser console for API errors
- Verify API endpoint URLs are correct
- Ensure CORS is configured on your API server
- Check that response format matches expected `Story` interface

### Issue: Playlists not generating
**Solution**:
- Verify `generateAIPlaylists()` is calling your API
- Check that API returns playlists in correct format
- Ensure `metadata.aiGenerated: true` is set

### Issue: Search returning no results
**Solution**:
- Verify search API is handling natural language queries
- Check that filters are being applied correctly
- Ensure fallback logic is in place

---

## Environment Variables

Create a `.env` file for API configuration:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_KEY=your-api-key-here
VITE_ENABLE_MOCK_SERVICES=false
```

Access in code:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## Next Steps

1. **Set up API infrastructure**
   - Create backend API server
   - Define endpoints and contracts
   - Set up authentication if needed

2. **Implement Content Layer API**
   - Start with story generation endpoint
   - Ensure response matches `Story` interface

3. **Implement Search API**
   - Natural language query processing
   - Story filtering and ranking

4. **Implement AI Playlist Generation**
   - User context analysis
   - Story selection and grouping
   - Playlist naming

5. **Test Integration**
   - Verify all features work with real data
   - Handle error cases
   - Optimize performance

6. **Deploy**
   - Set up production API
   - Update environment variables
   - Test end-to-end

---

## Support & Questions

For questions or issues:
1. Check browser console for errors
2. Review API response formats
3. Verify data structures match interfaces
4. Contact the frontend team for clarification

---

## Additional Resources

- **Story Data Format**: See `src/data/playlistData.js` for playlist structure
- **Mock Implementations**: Review `src/services/mock/` for reference implementations
- **Component Usage**: Check `src/components/PlaylistStorySelector.jsx` to see how stories are displayed

---

**Last Updated**: 2025-02-26
**Version**: 1.0
