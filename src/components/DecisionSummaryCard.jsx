/**
 * DecisionSummaryCard Component
 * Shows personalized greeting and top decisions summary
 */

import { useState, useEffect } from 'react';
import { useRole } from '../contexts/RoleContext';
import { getRoleDisplayName } from '../contexts/RoleContext';
import { getTopDecisions } from '../services/recSysOrchestrator';
import './decisionSummaryCard.css';

export default function DecisionSummaryCard({ onDecisionClick }) {
  const { role } = useRole();
  const [topDecisions, setTopDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadTopDecisions = async () => {
      setLoading(true);
      try {
        const result = await getTopDecisions(role, {
          maxDecisions: 3,
          minScore: 0.6
        });
        setTopDecisions(result.decisions || []);
      } catch (error) {
        console.error('Error loading top decisions:', error);
        setTopDecisions([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadTopDecisions();
  }, [role]);
  
  const roleDisplayName = getRoleDisplayName(role);
  
  const getUrgencyColor = (urgencyLevel) => {
    const colors = {
      high: '#ff4d4d',
      medium: '#ffb800',
      low: '#48FF9B'
    };
    return colors[urgencyLevel] || '#48FF9B';
  };
  
  if (loading || topDecisions.length === 0) {
    return null; // Don't show if no decisions
  }
  
  return (
    <div className="decision-summary-card">
      <div className="decision-summary-header">
        <h2 className="decision-summary-greeting">
          Hi {roleDisplayName},
        </h2>
        <p className="decision-summary-subtitle">
          These are your decisions to look at today
        </p>
      </div>
      
      <div className="decision-summary-list">
        {topDecisions.map((decision, index) => {
          const urgencyLevel = typeof decision.urgency === 'string' 
            ? decision.urgency 
            : decision.urgency?.level || 'medium';
          const timeToAct = decision.urgency?.timeToAct || 
            (urgencyLevel === 'high' ? '7 days' : urgencyLevel === 'medium' ? '2 weeks' : '1 month');
          
          return (
            <div
              key={decision.decisionId}
              className="decision-summary-item"
              onClick={() => onDecisionClick?.(decision)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onDecisionClick?.(decision);
                }
              }}
            >
              <div className="decision-summary-item-number">
                {index + 1}
              </div>
              <div className="decision-summary-item-content">
                <div className="decision-summary-item-header">
                  <span className="decision-summary-item-title">
                    {decision.primaryAction?.title || decision.title}
                  </span>
                  <span
                    className="decision-summary-item-urgency"
                    style={{ backgroundColor: getUrgencyColor(urgencyLevel) }}
                  >
                    {urgencyLevel === 'high' ? 'URGENT' : urgencyLevel === 'medium' ? 'ACT SOON' : 'MONITOR'}
                  </span>
                </div>
                
                {/* Financial & Business Impact */}
                {decision.impact && (
                  <div className="decision-summary-item-impact">
                    {decision.impact.financial && (
                      <span className="decision-summary-impact-badge">💰 {decision.impact.financial}</span>
                    )}
                    {decision.impact.kpi && (
                      <span className="decision-summary-impact-badge">📊 {decision.impact.kpi}</span>
                    )}
                    {decision.primaryAction?.impact && (
                      <span className="decision-summary-impact-badge">🎯 {decision.primaryAction.impact}</span>
                    )}
                  </div>
                )}
                
                {/* Action to Take */}
                {decision.primaryAction && (
                  <div className="decision-summary-item-action">
                    <span className="decision-summary-action-label">Action:</span>
                    <span className="decision-summary-action-text">{decision.primaryAction.title}</span>
                  </div>
                )}
                
                <p className="decision-summary-item-description">
                  {decision.primaryAction?.description || decision.keyInsight || 'Review this decision'}
                </p>
                <div className="decision-summary-item-footer">
                  <span className="decision-summary-item-time">
                    ⏱ Act within {timeToAct}
                  </span>
                  <span className="decision-summary-item-arrow">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
