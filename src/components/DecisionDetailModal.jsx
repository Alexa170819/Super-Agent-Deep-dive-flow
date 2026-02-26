/**
 * DecisionDetailModal Component
 * Full-screen or large modal showing decision details
 * Can launch SuperagentOrchestrator from decision context
 */

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useRole } from '../contexts/RoleContext';
import { getDecisionById, getStoryById, transformStoryToAgentData } from '../services/recSysOrchestrator';
import SuperagentOrchestrator from './SuperagentOrchestrator';
import { config as cfoConfig } from '../agents/cfo/config';
import { data as cfoData } from '../agents/cfo/data';
import './decisionDetail.css';

export default function DecisionDetailModal({ story, decision, onClose }) {
  const { role } = useRole();
  const navigate = useNavigate();
  const [decisionData, setDecisionData] = useState(decision);
  const [storyData, setStoryData] = useState(story);
  const [loading, setLoading] = useState(false);
  const [showSuperagent, setShowSuperagent] = useState(false);
  
  // Load decision or story if not provided
  useEffect(() => {
    const loadData = async () => {
      if (!decisionData && storyData) {
        // If we have a story, try to get the decision from the orchestrator
        try {
          const decisionResult = await getDecisionById(storyData.storyId, role);
          if (decisionResult) {
            setDecisionData(decisionResult);
          } else {
            // Fallback: create basic decision structure from story
            setDecisionData({
              storyId: storyData.storyId,
              title: storyData.title || 'Action Required',
              keyInsight: storyData.narrative || storyData.title,
              expectedOutcome: {
                impact: storyData.impact?.financial || 'Positive impact expected',
                confidence: 0.70
              },
              whyThisMatters: 'This insight is relevant to your role and responsibilities.',
              impact: storyData.impact,
              category: storyData.category,
              agentId: 'cfo-cash-optimizer',
              actions: ['See Details', 'Dismiss']
            });
          }
        } catch (error) {
          console.error('Error loading decision:', error);
          // Fallback structure
        setDecisionData({
          storyId: storyData.storyId,
          title: storyData.title || 'Action Required',
            keyInsight: storyData.narrative || storyData.title,
          expectedOutcome: {
              impact: storyData.impact?.financial || 'Positive impact expected',
              confidence: 0.70
          },
          whyThisMatters: 'This insight is relevant to your role and responsibilities.',
            impact: storyData.impact,
            category: storyData.category,
          agentId: 'cfo-cash-optimizer',
            actions: ['See Details', 'Dismiss']
        });
        }
      } else if (decision) {
        setDecisionData(decision);
      } else if (story) {
        setStoryData(story);
      }
    };
    
    loadData();
  }, [decision, story, decisionData, storyData, role]);
  
  const handleLaunchAgent = () => {
    setShowSuperagent(true);
  };
  
  const handleSeeDetails = () => {
    // Launch Superagent with story/decision context for in-depth analysis
    console.log('See Details clicked, launching Superagent');
    setShowSuperagent(true);
    // Note: Modal will be replaced by Superagent portal
  };
  
  const handleCloseSuperagent = () => {
    setShowSuperagent(false);
  };
  
  const getUrgencyColor = (urgency) => {
    const colors = {
      high: '#ff4d4d',
      medium: '#ffb800',
      low: '#48FF9B'
    };
    return colors[urgency] || '#48FF9B';
  };
  
  const getImpactColor = (impact) => {
    const colors = {
      high: '#48FF9B',
      medium: '#ffb800',
      low: '#ff4d4d'
    };
    return colors[impact] || '#48FF9B';
  };
  
  // If Superagent should be shown, render it using portal to break out of modal
  if (showSuperagent) {
    console.log('Rendering Superagent with story context:', storyData);
    // Transform story context into agent data if available
    const enhancedData = storyData 
      ? transformStoryToAgentData(storyData, cfoData)
      : cfoData;
    
    // Use React portal to render outside modal DOM hierarchy
    return createPortal(
      <div className="decision-superagent-wrapper">
        <button 
          className="decision-back-btn"
          onClick={handleCloseSuperagent}
        >
          ← Back to Decision
        </button>
        <SuperagentOrchestrator 
          config={cfoConfig} 
          data={enhancedData}
          storyContext={storyData}
          decisionContext={decisionData}
        />
      </div>,
      document.body
    );
  }
  
  if (!decisionData && !storyData) {
    return (
      <Modal isOpen={true} onClose={onClose} height={752}>
        <div className="decision-detail-loading">Loading decision details...</div>
      </Modal>
    );
  }
  
  // Get data for display
  const title = decisionData?.title || storyData?.title || 'Decision';
  const narrative = decisionData?.keyInsight || storyData?.narrative || storyData?.title || 'No details available.';
  const expectedOutcome = decisionData?.expectedOutcome || storyData?.expectedOutcome;
  const whyThisMatters = decisionData?.whyThisMatters || storyData?.whyThisMatters;
  const impact = decisionData?.impact || storyData?.impact;
  const actions = decisionData?.actions || ['See Details', 'Dismiss'];
  
  // Get impact level for badge
  const impactLevel = impact?.risk || (impact?.financial ? 'medium' : 'low');
  const impactColor = getImpactColor(impactLevel);
  
  return (
    <Modal isOpen={true} onClose={onClose} height={752} showHandle={true}>
      <div className="decision-detail">
        {/* Category Badge */}
            <div className="decision-detail-category">
              {decisionData?.category || storyData?.category || '.pro'}
            </div>
        
        {/* Title */}
            <h2 className="decision-detail-title">
          {title}
            </h2>
        
        {/* Impact Badge */}
        {impact && (
            <div className="decision-detail-badges">
                <span
              className="decision-impact-badge"
              style={{ backgroundColor: impactColor }}
                >
              {impactLevel.toUpperCase()} IMPACT
                </span>
          </div>
        )}
        
        {/* The Issue */}
        <div className="decision-detail-section">
          <h3 className="decision-section-title">The Issue</h3>
          <p className="decision-section-content">
            {narrative}
          </p>
        </div>
        
        {/* Expected Outcome */}
        {expectedOutcome && (
          <div className="decision-detail-section">
            <h3 className="decision-section-title">Expected Outcome</h3>
            <div className="decision-outcome">
              {expectedOutcome.impact && (
                <p className="decision-outcome-impact">
                  <strong>Impact:</strong> {expectedOutcome.impact}
                </p>
              )}
              {expectedOutcome.confidence && (
                <p className="decision-outcome-confidence">
                  <strong>Confidence:</strong> {(expectedOutcome.confidence * 100).toFixed(0)}%
                </p>
              )}
              {expectedOutcome.timeline && (
                <p className="decision-outcome-timeline">
                  <strong>Timeline:</strong> {expectedOutcome.timeline}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Why This Matters */}
        {whyThisMatters && (
          <div className="decision-detail-section">
            <h3 className="decision-section-title">Why This Matters</h3>
            <p className="decision-section-content">
              {whyThisMatters}
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="decision-detail-actions">
          {actions.map((action, index) => {
            const isSeeDetails = action.toLowerCase().includes('see details') || action.toLowerCase().includes('details');
            const isPrimary = isSeeDetails || index === 0;
            
            return (
              <button
                key={index}
                className={`decision-action-btn ${isPrimary ? 'primary' : 'secondary'}`}
                onClick={isSeeDetails ? handleSeeDetails : onClose}
              >
                {action}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
