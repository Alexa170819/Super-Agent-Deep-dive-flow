/**
 * MyAgentSection Component
 * Horizontal scrolling section showing top 3 decisions
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import { getTopDecisions } from '../services/recSysOrchestrator';
import './myAgent.css';

export default function MyAgentSection({ onDecisionClick }) {
  const { role } = useRole();
  const navigate = useNavigate();
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadDecisions = async () => {
      setLoading(true);
      try {
        const result = await getTopDecisions(role, {
          maxDecisions: 3,
          minScore: 0.6
        });
        setDecisions(result.decisions || []);
      } catch (error) {
        console.error('Error loading decisions:', error);
        setDecisions([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadDecisions();
  }, [role]);
  
  const handleCardClick = (decision) => {
    if (onDecisionClick) {
      onDecisionClick(decision);
    } else {
      // Default: navigate to decision detail
      navigate(`/decision/${decision.decisionId}`);
    }
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
  
  return (
    <div className="my-agent-section">
      <div className="my-agent-header">
        <h2 className="my-agent-title">My agent</h2>
        <a href="/my-agent" className="my-agent-see-all">See all</a>
      </div>
      
      {loading ? (
        <div className="my-agent-loading">Loading decisions...</div>
      ) : decisions.length === 0 ? (
        <div className="my-agent-empty">No decisions available</div>
      ) : (
        <div className="my-agent-scroll">
          <div className="my-agent-cards">
            {decisions.map((decision) => {
              // Determine if this is a risk or opportunity from the report
              const isOpportunity = decision.type === 'sales_opportunity' || 
                                   decision.impact?.opportunity ||
                                   decision.title?.includes('SCALE');
              
              // Get brand and region from decision data
              const brand = decision.rawData?.metadata?.brand || 
                           decision.rawData?.brand || 
                           decision.title?.split(':')[0]?.trim() || 
                           'Brand';
              // Prefer country, then region, then fallback
              const region = decision.rawData?.metadata?.country || 
                           decision.rawData?.country ||
                           decision.rawData?.metadata?.region || 
                           decision.rawData?.region ||
                           decision.title?.split('in ')[1]?.trim() ||
                           'Region';
              
              // Format: "Brand risk/opportunity in Region" (showing risk/opportunity from report)
              const riskOrOpp = isOpportunity ? 'opportunity' : 'risk';
              const cardText = `${brand} ${riskOrOpp} in ${region}`;
              
              return (
              <div
                key={decision.decisionId}
                  className={`my-agent-card-kering ${isOpportunity ? 'opportunity' : 'risk'}`}
                onClick={() => handleCardClick(decision)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(decision);
                  }
                }}
              >
                  {/* Circular Icon */}
                  <div className={`my-agent-card-kering-icon-circle ${isOpportunity ? 'opportunity' : 'risk'}`}>
                    {isOpportunity ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 14L12 9L17 14H7Z" fill="#48FF9B" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 10L12 15L17 10H7Z" fill="#ff4d4d" />
                      </svg>
                    )}
                </div>
                
                  {/* Text - showing risk/opportunity */}
                  <div className="my-agent-card-kering-text">
                    {cardText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
