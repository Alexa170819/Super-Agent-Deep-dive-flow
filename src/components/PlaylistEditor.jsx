/**
 * PlaylistEditor Component
 * Drag-and-drop interface for reordering stories in a plailist
 * Falls back to up/down buttons if @dnd-kit packages are not installed
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import { createPlaylist, updatePlaylist, getPlaylist, getPlaylistStories } from '../services/playlistService';
import DecisionDetailModal from './DecisionDetailModal';
import './playlistEditor.css';

// Story item component (with up/down buttons for reordering)
function StoryItem({ story, index, onRemove, onMoveUp, onMoveDown, onEdit }) {
  return (
    <div className="playlist-editor-story-item">
      <div className="playlist-editor-story-move-buttons">
        <button 
          className="playlist-editor-move-btn" 
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
          title="Move up"
        >
          ↑
        </button>
        <button 
          className="playlist-editor-move-btn" 
          onClick={() => onMoveDown(index)}
          disabled={index === undefined}
          title="Move down"
        >
          ↓
        </button>
      </div>
      <div className="playlist-editor-story-content">
        <div className="playlist-editor-story-index">{index + 1}</div>
        <div className="playlist-editor-story-info">
          <div className="playlist-editor-story-title">{story.title}</div>
          <div className="playlist-editor-story-preview">
            {story.keyInsight || story.narrative || 'No preview available'}
          </div>
        </div>
      </div>
      <button
        className="playlist-editor-story-remove"
        onClick={() => onRemove(story.storyId)}
        title="Remove story"
      >
        ×
      </button>
    </div>
  );
}

export default function PlaylistEditor({ playlistId, initialStories = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useRole();
  const [stories, setStories] = useState(initialStories);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Finance - Monthly Review');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);

  useEffect(() => {
    // If coming from creator, get stories from location state
    if (location.state?.selectedStories) {
      setStories(location.state.selectedStories);
      if (location.state.prompt) {
        setName(location.state.prompt);
        setDescription(`Plailist created from: ${location.state.prompt}`);
      }
    }
    
    // If editing existing playlist, load it
    if (playlistId && !location.state?.selectedStories) {
      const loadPlaylist = async () => {
        setLoading(true);
        try {
          const playlist = getPlaylist(playlistId);
          if (playlist) {
            setName(playlist.name);
            setCategory(playlist.category);
            setDescription(playlist.description || '');
            // Load stories
            const playlistStories = await getPlaylistStories(playlistId, role);
            setStories(playlistStories);
          }
        } catch (error) {
          console.error('Error loading playlist:', error);
        } finally {
          setLoading(false);
        }
      };
      loadPlaylist();
    }

    // If returning from add-stories flow, reload stories
    if (location.state?.returnToEditor && playlistId) {
      const reloadStories = async () => {
        try {
          const playlistStories = await getPlaylistStories(playlistId, role);
          setStories(playlistStories);
          // Clear the state
          navigate(location.pathname, { replace: true, state: {} });
        } catch (error) {
          console.error('Error reloading stories:', error);
        }
      };
      reloadStories();
    }
  }, [location.state, playlistId, role, navigate, location.pathname]);

  const handleRemove = (storyId) => {
    setStories(prev => prev.filter(s => s.storyId !== storyId));
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      setStories(prev => {
        const newStories = [...prev];
        [newStories[index - 1], newStories[index]] = [newStories[index], newStories[index - 1]];
        return newStories;
      });
    }
  };

  const handleMoveDown = (index) => {
    if (index < stories.length - 1) {
      setStories(prev => {
        const newStories = [...prev];
        [newStories[index], newStories[index + 1]] = [newStories[index + 1], newStories[index]];
        return newStories;
      });
    }
  };

  const handleEditStory = (story) => {
    setSelectedStory(story);
    setShowStoryModal(true);
  };

  const handleCloseStoryModal = () => {
    setShowStoryModal(false);
    setSelectedStory(null);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a plailist name');
      return;
    }

    if (stories.length === 0) {
      alert('Please add at least one story to the plailist');
      return;
    }

    const storyIds = stories.map(s => s.storyId);

    if (playlistId) {
      // Update existing playlist
      const updated = updatePlaylist(playlistId, {
        name,
        category,
        description,
        storyIds
      });
      if (updated) {
        navigate(`/playlists/${playlistId}`);
      }
    } else {
      // Create new playlist - mark as user-created (not system or AI-generated)
      const newPlaylist = createPlaylist(name, category, storyIds, {
        description,
        metadata: {
          isUserCreated: true,
          aiGenerated: false,
          isSystemPlaylist: false
        }
      });
      // Navigate to playlists page, switch to "For You" tab, and set demo=after
      navigate('/playlists?demo=after', { state: { switchToTab: 'for-you', refresh: true } });
    }
  };

  const categories = [
    'Finance - Monthly Review',
    'Finance - QTD Review',
    'Finance - QTR1 landing',
    'Finance - YTD Review',
    'Finance - Business Review Gucci'
  ];

  if (loading) {
    return (
      <div className="playlist-editor">
        <div className="playlist-editor-loading">Loading plailist...</div>
      </div>
    );
  }

  return (
    <div className="playlist-editor">
      <div className="playlist-editor-header">
        <h2 className="playlist-editor-title">
          {playlistId ? 'Edit Plailist' : 'Create Plailist'}
        </h2>
        <button className="playlist-editor-close" onClick={() => navigate('/playlists')}>
          ×
        </button>
      </div>

      <div className="playlist-editor-content">
        <div className="playlist-editor-form">
          <div className="playlist-editor-field">
            <label className="playlist-editor-label">Plailist Name</label>
            <input
              type="text"
              className="playlist-editor-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter plailist name"
            />
          </div>

          <div className="playlist-editor-field">
            <label className="playlist-editor-label">Category</label>
            <select
              className="playlist-editor-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="playlist-editor-field">
            <label className="playlist-editor-label">Description (Optional)</label>
            <textarea
              className="playlist-editor-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>
        </div>

        <div className="playlist-editor-stories">
          <div className="playlist-editor-stories-header">
            <h3 className="playlist-editor-stories-title">
              Stories ({stories.length})
            </h3>
            <div className="playlist-editor-stories-actions">
              <button
                className="playlist-editor-add-stories-btn"
                onClick={() => navigate(`/playlists/${playlistId}/add-stories`, {
                  state: { returnToEditor: true }
                })}
                disabled={!playlistId}
              >
                + Add Stories
              </button>
            </div>
            <div className="playlist-editor-stories-hint">
              Use ↑ ↓ buttons to reorder, click story to edit
            </div>
          </div>

          {stories.length === 0 ? (
            <div className="playlist-editor-empty">
              No stories added yet. Go back to add stories.
            </div>
          ) : (
            <div className="playlist-editor-stories-list">
              {stories.map((story, index) => (
                <StoryItem
                  key={story.storyId}
                  story={story}
                  index={index}
                  onRemove={handleRemove}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onEdit={handleEditStory}
                />
              ))}
            </div>
          )}
        </div>

        <div className="playlist-editor-actions">
          <button
            className="playlist-editor-cancel"
            onClick={() => navigate('/playlists')}
          >
            Cancel
          </button>
          <button
            className="playlist-editor-save"
            onClick={handleSave}
            disabled={!name.trim() || stories.length === 0}
          >
            Save Playlist
          </button>
        </div>
      </div>

      {/* Story Detail Modal */}
      {showStoryModal && selectedStory && (
        <DecisionDetailModal
          story={selectedStory}
          onClose={handleCloseStoryModal}
        />
      )}
    </div>
  );
}
