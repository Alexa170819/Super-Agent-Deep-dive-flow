/**
 * PlaylistDetailPage Component
 * Shows playlist detail view with stories list and meeting controls
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import { getPlaylist, getPlaylistStories, clonePlaylist } from '../services/playlistService';
import { initializeMockPlaylists } from '../data/mock/playlistMockData';
import { copyShareableLink, exportToPDF, downloadJSON } from '../services/playlistExportService';
import PlaylistStoryItem from '../components/PlaylistStoryItem';
import DecisionDetailModal from '../components/DecisionDetailModal';
import './playlistDetail.css';

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [playlist, setPlaylist] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('TOTAL REGION');
  const [showEditMenu, setShowEditMenu] = useState(false);

  useEffect(() => {
    // Initialize mock playlists if needed
    initializeMockPlaylists();
    
    // Load playlist
    const loadedPlaylist = getPlaylist(id);
    if (loadedPlaylist) {
      setPlaylist(loadedPlaylist);
      
      // Load stories
      loadStories(loadedPlaylist);
    } else {
      setLoading(false);
    }
  }, [id, role]);

  const loadStories = async (playlistData) => {
    setLoading(true);
    try {
      const playlistStories = await getPlaylistStories(playlistData.id, role);
      setStories(playlistStories);
    } catch (error) {
      console.error('Error loading playlist stories:', error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  const handlePlay = () => {
    navigate(`/playlists/${id}/meeting`);
  };

  const handleEdit = () => {
    navigate(`/playlists/${id}/edit`);
  };

  const handleClone = () => {
    const cloned = clonePlaylist(id);
    if (cloned) {
      // Navigate directly to editor for immediate editing
      navigate(`/playlists/${cloned.id}/edit`);
    } else {
      alert('Failed to clone playlist. Please try again.');
    }
  };

  const handleAddStories = () => {
    // Navigate to story selector with playlist context
    navigate(`/playlists/${id}/add-stories`);
  };

  const handleShare = async () => {
    const success = await copyShareableLink(id);
    if (success) {
      alert('Link copied to clipboard!');
    } else {
      alert('Failed to copy link. Please try again.');
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportToPDF(id, role);
    } catch (error) {
      alert('Failed to export PDF. Please try again.');
      console.error(error);
    }
  };

  const handleExportJSON = async () => {
    try {
      await downloadJSON(id, role);
    } catch (error) {
      alert('Failed to export JSON. Please try again.');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="playlist-detail-page">
        <div className="playlist-detail-loading">Loading playlist...</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="playlist-detail-page">
        <div className="playlist-detail-error">Playlist not found</div>
      </div>
    );
  }

  const theme = playlist.theme || {};
  // Match screenshot: darker green gradient (more green, less transparent)
  const headerGradient = `linear-gradient(180deg, rgba(34, 197, 94, 0.6) 0%, rgba(0, 0, 0, 1) 100%)`;

  return (
    <div className="playlist-detail-page">
      {/* Header with gradient - matching screenshot */}
      <div 
        className="playlist-detail-header"
        style={{ background: headerGradient }}
      >
        <button className="playlist-detail-close" onClick={() => navigate('/playlists')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="playlist-detail-header-content">
          <div className="playlist-detail-title-row">
            <h1 className="playlist-detail-title">{playlist.name}</h1>
            <div className="playlist-detail-edit-menu-container">
              <button 
                className="playlist-detail-edit-btn"
                onClick={() => setShowEditMenu(!showEditMenu)}
                title="Edit & Personalize"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Edit</span>
              </button>
              {showEditMenu && (
                <div className="playlist-detail-edit-menu">
                  <button 
                    className="playlist-detail-menu-item"
                    onClick={() => {
                      setShowEditMenu(false);
                      handleAddStories();
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Add Stories
                  </button>
                  <button 
                    className="playlist-detail-menu-item"
                    onClick={() => {
                      setShowEditMenu(false);
                      handleClone();
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                      <path d="M8 8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V14C21 15.1046 20.1046 16 19 16H16M8 8H5C3.89543 8 3 8.89543 3 10V19C3 20.1046 3.89543 21 5 21H14C15.1046 21 16 20.1046 16 19V16M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Clone Playlist
                  </button>
                  <button 
                    className="playlist-detail-menu-item"
                    onClick={() => {
                      setShowEditMenu(false);
                      handleEdit();
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Edit Details
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="playlist-detail-subtitle">
            {playlist.description || `Monthly Review Highlight stories at ${playlist.name} level`}
          </div>
        </div>
      </div>

      {/* Controls - matching screenshot */}
      <div className="playlist-detail-controls">
        <button className="playlist-detail-play-btn" onClick={handlePlay}>
          PLAY
        </button>
        <div className="playlist-detail-region-selector">
          <button 
            className="playlist-detail-region-btn"
            onClick={() => {
              // Toggle or show dropdown (simplified for now)
              const regions = ['TOTAL REGION', 'Western Europe', 'North America', 'Asia Pacific'];
              const currentIndex = regions.indexOf(selectedRegion);
              const nextIndex = (currentIndex + 1) % regions.length;
              setSelectedRegion(regions[nextIndex]);
            }}
          >
            {selectedRegion}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stories List */}
      <div className="playlist-detail-stories">
        {stories.length === 0 ? (
          <div className="playlist-detail-empty">
            No stories in this playlist yet.
          </div>
        ) : (
          <div className="playlist-detail-stories-list">
            {stories.map((story, index) => (
              <PlaylistStoryItem
                key={story.storyId || index}
                story={story}
                onClick={() => handleStoryClick(story)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions - Hidden for prototype to match screenshot */}
      {/* <div className="playlist-detail-actions">
        <button className="playlist-detail-action-btn" onClick={handleEdit}>
          Edit
        </button>
        <button className="playlist-detail-action-btn" onClick={handleShare}>
          Share
        </button>
        <button className="playlist-detail-action-btn" onClick={handleExportPDF}>
          Export PDF
        </button>
        <button className="playlist-detail-action-btn" onClick={handleExportJSON}>
          Export JSON
        </button>
      </div> */}

      {/* Story Detail Modal */}
      {showModal && selectedStory && (
        <DecisionDetailModal
          story={selectedStory}
          onClose={handleCloseModal}
        />
      )}

      {/* Click outside to close edit menu */}
      {showEditMenu && (
        <div 
          className="playlist-detail-menu-overlay"
          onClick={() => setShowEditMenu(false)}
        />
      )}
    </div>
  );
}
