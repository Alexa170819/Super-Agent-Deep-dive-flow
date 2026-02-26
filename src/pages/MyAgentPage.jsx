/**
 * MyAgentPage Component
 * Page showing top 3 decisions in My Agent section
 */

import { useState, useEffect } from 'react';
import { useRole } from '../contexts/RoleContext';
import { getImpactUpdates, checkAndGenerateImpactUpdates } from '../services/impactUpdateService';
import { checkForImpactUpdates } from '../services/followUpNotificationService';
import MyAgentSection from '../components/MyAgentSection';
import ImpactUpdateCard from '../components/ImpactUpdateCard';
import StoryCardModal from '../components/StoryCardModal';
import ImpactUpdateDetailModal from '../components/ImpactUpdateDetailModal';
import './myAgentPage.css';

export default function MyAgentPage() {
  const { role } = useRole();
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [impactUpdates, setImpactUpdates] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
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
  
  const handleDecisionClick = (decision) => {
    setSelectedDecision(decision);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDecision(null);
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
  
  return (
    <div className="my-agent-page">
      <div className="my-agent-page-header">
        <div className="my-agent-page-branding">
          <div className="my-agent-page-brand-name">aily.pro</div>
          <div className="my-agent-page-tagline">Connecting. The. Dots.</div>
        </div>
      </div>
      
      {/* Impact Updates Section */}
      {impactUpdates.length > 0 && (
        <div className="my-agent-impact-updates">
          <div className="my-agent-section-header">
            <span className="my-agent-section-title">Impact Updates</span>
            {impactUpdates.filter(u => !u.read).length > 0 && (
              <span className="my-agent-badge">
                {impactUpdates.filter(u => !u.read).length}
              </span>
            )}
          </div>
          <div className="my-agent-impact-updates-scroll">
            {impactUpdates.map((update) => (
              <ImpactUpdateCard
                key={update.id}
                update={update}
                onClick={() => handleUpdateClick(update)}
              />
            ))}
          </div>
        </div>
      )}
      
      <MyAgentSection onDecisionClick={handleDecisionClick} />
      
      {showModal && selectedDecision && (
        <StoryCardModal
          story={selectedDecision}
          decision={selectedDecision}
          onClose={handleCloseModal}
        />
      )}
      
      {showUpdateModal && selectedUpdate && (
        <ImpactUpdateDetailModal
          update={selectedUpdate}
          onClose={handleCloseUpdateModal}
        />
      )}
    </div>
  );
}
