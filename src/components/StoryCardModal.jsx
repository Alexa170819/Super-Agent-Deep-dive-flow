/**
 * StoryCardModal Component
 * Step 2 of the user flow - Shows 3 different options (Teaser, Impact, Driver) with Deep dive link
 */

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import TeaserCard from './storyCards/TeaserCard';
import ImpactCard from './storyCards/ImpactCard';
import DriverCard from './storyCards/DriverCard';
import SuperagentOrchestrator from './SuperagentOrchestrator';
import { transformStoryToAgentData } from '../services/recSysOrchestrator';
import { config as cfoConfig } from '../agents/cfo/config';
import { data as cfoData } from '../agents/cfo/data';
import './storyCardModal.css';

export default function StoryCardModal({ story, decision, onClose }) {
  const [variant, setVariant] = useState('teaser'); // 'teaser', 'impact', 'driver'
  const [showSuperagent, setShowSuperagent] = useState(false);
  
  // Use story or decision data
  const storyData = story || decision;
  
  if (!storyData) {
    return null;
  }
  
  const handleDeepDive = () => {
    console.log('Deep dive clicked, launching Superagent');
    setShowSuperagent(true);
  };
  
  const handleCloseSuperagent = () => {
    setShowSuperagent(false);
  };
  
  // If Superagent should be shown, render it using portal
  if (showSuperagent) {
    const enhancedData = storyData
      ? transformStoryToAgentData(storyData, cfoData)
      : cfoData;
    
    return createPortal(
      <div className="story-card-superagent-wrapper">
        <button
          className="story-card-back-btn"
          onClick={handleCloseSuperagent}
        >
          ← Back to Story
        </button>
        <SuperagentOrchestrator
          config={cfoConfig}
          data={enhancedData}
          storyContext={storyData}
          decisionContext={decision}
        />
      </div>,
      document.body
    );
  }
  
  // Render story card modal with 3 variant toggle
  return (
    <Modal isOpen={true} onClose={onClose} height={600} showHandle={true}>
      <div className="story-card-modal">
        {/* Variant Toggle */}
        <div className="story-card-toggle">
          <button
            className={`story-card-toggle-btn ${variant === 'teaser' ? 'active' : ''}`}
            onClick={() => setVariant('teaser')}
          >
            Teaser
          </button>
          <button
            className={`story-card-toggle-btn ${variant === 'impact' ? 'active' : ''}`}
            onClick={() => setVariant('impact')}
          >
            Impact
          </button>
          <button
            className={`story-card-toggle-btn ${variant === 'driver' ? 'active' : ''}`}
            onClick={() => setVariant('driver')}
          >
            Drivers
          </button>
        </div>
        
        {/* Render Selected Variant */}
        <div className="story-card-content">
          {variant === 'teaser' && (
            <TeaserCard story={storyData} onDeepDive={handleDeepDive} />
          )}
          {variant === 'impact' && (
            <ImpactCard story={storyData} onDeepDive={handleDeepDive} />
          )}
          {variant === 'driver' && (
            <DriverCard story={storyData} onDeepDive={handleDeepDive} />
          )}
        </div>
      </div>
    </Modal>
  );
}
