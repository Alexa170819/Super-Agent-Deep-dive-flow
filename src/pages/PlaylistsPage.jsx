/**
 * PlaylistsPage Component
 * Main dashboard with tabbed interface for different plailist types
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import { getUserPlaylists, getSystemPlaylists } from '../services/playlistService';
import { initializeMockPlaylists } from '../data/mock/playlistMockData';
import { initializeAIPlaylists, getAIGeneratedPlaylists } from '../services/aiPlaylistService';
import PlaylistCategory from '../components/PlaylistCategory';
import PlaylistCard from '../components/PlaylistCard';
import './playlists.css';

const TABS = {
  FOR_YOU: 'for-you',
  QUICK_START: 'quick-start'
};

export default function PlaylistsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState(TABS.QUICK_START);
  const [aiPlaylists, setAiPlaylists] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [systemPlaylists, setSystemPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Check for demo mode in URL (e.g., ?demo=before or ?demo=after)
  const demoMode = searchParams.get('demo'); // 'before' or 'after' or null

  // Set initial tab based on demo mode
  useEffect(() => {
    if (demoMode === 'before' || demoMode === 'after') {
      setActiveTab(TABS.FOR_YOU);
    }
  }, [demoMode]);

  useEffect(() => {
    loadPlaylists();
  }, [role]);

  // Handle navigation state (e.g., switch tab after creating playlist)
  useEffect(() => {
    if (location.state?.switchToTab) {
      setActiveTab(location.state.switchToTab);
      // Clear the state to prevent re-triggering
      navigate(location.pathname, { replace: true, state: {} });
    }
    if (location.state?.refresh) {
      loadPlaylists();
    }
  }, [location.state]);

  const loadPlaylists = async () => {
    setLoading(true);
    try {
      // Initialize mock/system playlists if needed
      initializeMockPlaylists();
      
      // Initialize AI playlists
      const context = {
        upcomingMeetings: [
          {
            id: 'meeting-1',
            title: 'Q1 Business Review',
            description: 'Quarterly business review meeting',
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            category: 'Finance - QTD Review'
          }
        ]
      };
      
      await initializeAIPlaylists(role, context);
      
      // Load all plailist types
      const aiGenerated = getAIGeneratedPlaylists();
      const userCreated = getUserPlaylists();
      const system = getSystemPlaylists();
      
      setAiPlaylists(aiGenerated);
      setUserPlaylists(userCreated);
      setSystemPlaylists(system);
    } catch (error) {
      console.error('Error loading playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/playlists/create');
  };

  const handleSeeAll = (category) => {
    navigate(`/playlists?category=${encodeURIComponent(category)}&tab=${activeTab}`);
  };

  // Filter playlists by search query
  const filterPlaylists = (playlists) => {
    if (!searchQuery.trim()) return playlists;
    
    const query = searchQuery.toLowerCase();
    return playlists.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
  };

  // Group playlists by category
  const groupByCategory = (playlists) => {
    const categoryMap = new Map();
    playlists.forEach(playlist => {
      if (!categoryMap.has(playlist.category)) {
        categoryMap.set(playlist.category, []);
      }
      categoryMap.get(playlist.category).push(playlist);
    });

    return Array.from(categoryMap.entries())
      .map(([category, playlists]) => ({ category, playlists }))
      .sort((a, b) => a.category.localeCompare(b.category));
  };

  // Render "My Plailists" tab content - Shows user-created playlists
  const renderForYouTab = () => {
    // In demo mode, check URL parameter to show before/after state
    let filtered = filterPlaylists(userPlaylists);
    
    // Demo mode: if ?demo=before, force empty state; if ?demo=after, show playlists normally
    if (demoMode === 'before') {
      filtered = []; // Force empty state for demo
    }
    // If demo=after or no demo param, show actual playlists (normal behavior)
    
    const categories = groupByCategory(filtered);
    
    if (loading) {
      return <div className="playlists-loading">Loading your plailists...</div>;
    }

    // Show empty state when no playlists exist (or demo=before)
    if (filtered.length === 0) {
      return (
        <div className="playlists-tab-content">
          <div className="playlists-empty-state">
            <div className="playlists-empty-icon">✨</div>
            <h2 className="playlists-empty-title">Welcome here</h2>
            <p className="playlists-empty-message">
              Create your own plailist for your meetings and reviews.
            </p>
            <p className="playlists-empty-submessage">
              Select relevant stories, organize them in your preferred order, and present them seamlessly.
            </p>
            <button className="playlists-empty-cta" onClick={handleCreateNew}>
              Create Your First Plailist
            </button>
          </div>
        </div>
      );
    }

    // Show user-created playlists
    return (
      <div className="playlists-tab-content">
        {/* Create Button */}
        <div className="playlists-actions">
          <button className="playlists-create-btn" onClick={handleCreateNew}>
            + Create New Plailist
          </button>
        </div>

        {/* User-Created Playlists */}
        {categories.map(({ category, playlists: categoryPlaylists }) => (
          <PlaylistCategory
            key={category}
            category={category}
            playlists={categoryPlaylists}
            onSeeAll={handleSeeAll}
          />
        ))}
      </div>
    );
  };


  // Render "Quick Start" tab content - matching screenshot design
  const renderQuickStartTab = () => {
    // Combine AI and system playlists (but don't show badges)
    const combined = [...aiPlaylists, ...systemPlaylists];
    const filtered = filterPlaylists(combined);
    
    if (loading) {
      return <div className="playlists-loading">Loading quick start plailists...</div>;
    }

    if (filtered.length === 0) {
      return (
        <div className="playlists-empty">
          <p>No quick start plailists available yet. Check back soon for personalized recommendations!</p>
        </div>
      );
    }

    // Group playlists by category - matching screenshot design
    // Filter out "Finance - Monthly Review" category
    const categories = groupByCategory(filtered).filter(
      ({ category }) => category !== 'Finance - Monthly Review'
    );

    return (
      <div className="playlists-tab-content">
        {/* Intro Text */}
        <div className="playlists-quick-start-intro">
          <p className="playlists-quick-start-intro-text">
            Ready-to-use plailists generated based on your profile and relevant meetings.
          </p>
        </div>
        
        {/* Categories - matching screenshot design with horizontal scrolling rows */}
        {categories.map(({ category, playlists: categoryPlaylists }) => (
          <PlaylistCategory
            key={category}
            category={category}
            playlists={categoryPlaylists}
            onSeeAll={handleSeeAll}
          />
        ))}
      </div>
    );
  };

  const getTabCount = (tab) => {
    switch (tab) {
      case TABS.FOR_YOU:
        return userPlaylists.length;
      case TABS.QUICK_START:
        return aiPlaylists.length + systemPlaylists.length;
      default:
        return 0;
    }
  };

  return (
    <div className="playlists-page">
      {/* Header */}
      <div className="playlists-header">
        <div className="playlists-branding">
          <div className="playlists-brand-name">aily.pro</div>
          <div className="playlists-tagline">Connecting. The. Dots.</div>
        </div>
      </div>

      {/* Main Title */}
      <div className="playlists-main-title">
        <h1 className="playlists-title">Plaillists</h1>
      </div>

      {/* Search Bar */}
      <div className="playlists-search">
        <input
          type="text"
          className="playlists-search-input"
          placeholder="Search plailists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Playlist Type Tabs */}
      <div className="playlists-type-tabs">
        <button
          className={`playlists-type-tab ${activeTab === TABS.QUICK_START ? 'active' : ''}`}
          onClick={() => setActiveTab(TABS.QUICK_START)}
        >
          Quick Start
          {getTabCount(TABS.QUICK_START) > 0 && (
            <span className="playlists-tab-badge">{getTabCount(TABS.QUICK_START)}</span>
          )}
        </button>
        <button
          className={`playlists-type-tab ${activeTab === TABS.FOR_YOU ? 'active' : ''}`}
          onClick={() => setActiveTab(TABS.FOR_YOU)}
        >
          My Plailists
        </button>
      </div>

      {/* Tab Content */}
      <div className="playlists-content">
        {activeTab === TABS.FOR_YOU && renderForYouTab()}
        {activeTab === TABS.QUICK_START && renderQuickStartTab()}
      </div>
    </div>
  );
}
