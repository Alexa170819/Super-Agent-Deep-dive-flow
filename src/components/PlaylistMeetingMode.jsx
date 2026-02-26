/**
 * PlaylistMeetingMode Component
 * Full-screen presentation view for meetings
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import { getPlaylist, getPlaylistStories } from '../services/playlistService';
import DecisionDetailModal from './DecisionDetailModal';
import './playlistMeetingMode.css';

export default function PlaylistMeetingMode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [playlist, setPlaylist] = useState(null);
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showStoryDetail, setShowStoryDetail] = useState(false);

  useEffect(() => {
    loadPlaylist();
  }, [id, role]);

  const loadPlaylist = async () => {
    setLoading(true);
    try {
      const loadedPlaylist = getPlaylist(id);
      if (loadedPlaylist) {
        setPlaylist(loadedPlaylist);
        const playlistStories = await getPlaylistStories(loadedPlaylist.id, role);
        setStories(playlistStories);
      }
    } catch (error) {
      console.error('Error loading playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleExit = () => {
    navigate(`/playlists/${id}`);
  };

  const handleStoryClick = () => {
    setShowStoryDetail(true);
  };

  if (loading) {
    return (
      <div className="playlist-meeting-mode">
        <div className="playlist-meeting-loading">Loading...</div>
      </div>
    );
  }

  if (!playlist || stories.length === 0) {
    return (
      <div className="playlist-meeting-mode">
        <div className="playlist-meeting-error">No stories available</div>
        <button className="playlist-meeting-exit" onClick={handleExit}>
          Exit Meeting
        </button>
      </div>
    );
  }

  const currentStory = stories[currentIndex];
  const progress = ((currentIndex + 1) / stories.length) * 100;

  return (
    <div className="playlist-meeting-mode">
      {/* Header */}
      <div className="playlist-meeting-header">
        <div className="playlist-meeting-info">
          <div className="playlist-meeting-title">{playlist.name}</div>
          <div className="playlist-meeting-progress">
            Story {currentIndex + 1} of {stories.length}
          </div>
        </div>
        <button className="playlist-meeting-exit" onClick={handleExit}>
          Exit
        </button>
      </div>

      {/* Progress Bar */}
      <div className="playlist-meeting-progress-bar">
        <div 
          className="playlist-meeting-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Story Content */}
      <div className="playlist-meeting-content" onClick={handleStoryClick}>
        <div className="playlist-meeting-story">
          <div className="playlist-meeting-story-title">
            {currentStory.title}
          </div>
          <div className="playlist-meeting-story-insight">
            {currentStory.keyInsight || currentStory.narrative || 'No content available'}
          </div>
          {currentStory.impact && (
            <div className="playlist-meeting-story-impact">
              <div className="playlist-meeting-impact-label">Impact:</div>
              <div className="playlist-meeting-impact-value">
                {currentStory.impact.financial || currentStory.impact.kpi || 'N/A'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="playlist-meeting-controls">
        <button
          className="playlist-meeting-nav-btn"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        <div className="playlist-meeting-nav-indicator">
          {currentIndex + 1} / {stories.length}
        </div>
        <button
          className="playlist-meeting-nav-btn"
          onClick={handleNext}
          disabled={currentIndex === stories.length - 1}
        >
          Next →
        </button>
      </div>

      {/* Story Detail Modal */}
      {showStoryDetail && currentStory && (
        <DecisionDetailModal
          story={currentStory}
          onClose={() => setShowStoryDetail(false)}
        />
      )}
    </div>
  );
}
