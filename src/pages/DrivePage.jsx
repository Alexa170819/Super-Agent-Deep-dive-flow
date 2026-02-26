/**
 * DrivePage Component
 * Main container for Drive tab view with grid layout and filter tabs
 */

import { useState, useEffect } from 'react';
import { useRole } from '../contexts/RoleContext';
import { getPersonalizedStories } from '../services/recSysOrchestrator';
import { getImpactUpdates, checkAndGenerateImpactUpdates } from '../services/impactUpdateService';
import { checkForImpactUpdates } from '../services/followUpNotificationService';
import InsightCard from '../components/InsightCard';
import ImpactUpdateCard from '../components/ImpactUpdateCard';
import DecisionDetailModal from '../components/DecisionDetailModal';
import ImpactUpdateDetailModal from '../components/ImpactUpdateDetailModal';
import DecisionSummaryCard from '../components/DecisionSummaryCard';
import './drive.css';

export default function DrivePage() {
  const { role } = useRole();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('for-you');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [impactUpdates, setImpactUpdates] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  // Load stories when role or filter changes
  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Loading stories for role:', role, 'filter:', activeFilter);
        const result = await getPersonalizedStories(role, {
          filterType: activeFilter,
          maxStories: 20
        });
        console.log('Stories loaded:', result);
        setStories(result.stories || []);
      } catch (error) {
        console.error('Error loading stories:', error);
        setError(error.message || 'Failed to load stories');
        setStories([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadStories();
  }, [role, activeFilter]);
  
  // Load impact updates
  useEffect(() => {
    const loadImpactUpdates = () => {
      // Check for new impact updates
      checkForImpactUpdates('user-1', role);
      
      // Load existing impact updates
      const updates = getImpactUpdates('user-1', role);
      setImpactUpdates(updates);
    };
    
    loadImpactUpdates();
    
    // Check periodically for new updates
    const interval = setInterval(loadImpactUpdates, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [role]);
  
  const handleCardClick = (storyOrDecision) => {
    // Check if it's a decision (has decisionId) or a story (has storyId)
    if (storyOrDecision.decisionId) {
      // It's a decision - convert to story format for modal
      setSelectedStory({
        ...storyOrDecision,
        storyId: storyOrDecision.storyId || storyOrDecision.decisionId
      });
    } else {
      // It's a story
      setSelectedStory(storyOrDecision);
    }
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };
  
  const handleUpdateClick = (update) => {
    setSelectedUpdate(update);
    setShowUpdateModal(true);
  };
  
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedUpdate(null);
    // Reload impact updates to refresh read status
    const updates = getImpactUpdates('user-1', role);
    setImpactUpdates(updates);
  };
  
  const filterTabs = [
    { id: 'for-you', label: 'For You' },
    { id: 'upside', label: 'Upside' },
    { id: 'downside', label: 'Downside' },
    { id: 'portfolio', label: 'Portfolio' }
  ];
  
  return (
    <div className="drive-page">
      {/* Header */}
      <div className="drive-header">
        <div className="drive-branding">
          <div className="drive-brand-name">aily.pro</div>
          <div className="drive-tagline">Connecting. The. Dots.</div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="drive-nav-tabs">
        <div className="drive-nav-tab">Routines</div>
        <div className="drive-nav-tab active">Drive</div>
        <div className="drive-nav-tab">Track</div>
      </div>
      
      {/* Filter Tabs */}
      <div className="drive-filter-tabs">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            className={`drive-filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
            
            {/* Decision Summary Card */}
            <DecisionSummaryCard onDecisionClick={handleCardClick} />
      
      {/* Impact Updates Section */}
      {impactUpdates.length > 0 && (
        <div className="drive-impact-updates">
          <div className="drive-section-title">Impact Updates</div>
          <div className="drive-impact-updates-grid">
            {impactUpdates.slice(0, 4).map((update) => (
              <ImpactUpdateCard
                key={update.id}
                update={update}
                onClick={() => handleUpdateClick(update)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Content Grid */}
      <div className="drive-content">
        {error ? (
          <div className="drive-empty" style={{ color: '#ff4d4d' }}>
            Error: {error}
          </div>
        ) : loading ? (
          <div className="drive-loading">Loading insights...</div>
        ) : stories.length === 0 ? (
          <div className="drive-empty">No insights available</div>
        ) : (
          <div className="drive-grid">
            {stories.map((story) => (
              <InsightCard
                key={story.storyId}
                insight={story}
                onClick={() => handleCardClick(story)}
              />
            ))}
          </div>
        )}
        
        {/* See More Button */}
        {!loading && stories.length > 0 && (
          <div className="drive-see-more">
            <button className="drive-see-more-btn">SEE MORE</button>
          </div>
        )}
      </div>
      
      {/* Decision Detail Modal */}
      {showModal && selectedStory && (
        <DecisionDetailModal
          story={selectedStory.decisionId ? undefined : selectedStory}
          decision={selectedStory.decisionId ? selectedStory : undefined}
          onClose={handleCloseModal}
        />
      )}
      
      {/* Impact Update Detail Modal */}
      {showUpdateModal && selectedUpdate && (
        <ImpactUpdateDetailModal
          update={selectedUpdate}
          onClose={handleCloseUpdateModal}
        />
      )}
    </div>
  );
}
