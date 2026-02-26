/**
 * ImpactUpdateCard Component
 * Displays impact update with actual vs expected comparison
 */

import { formatTimeElapsed } from '../services/timeSimulationService';
import './impactUpdateCard.css';

export default function ImpactUpdateCard({ update, onClick }) {
  if (!update) {
    return null;
  }
  
  const {
    id,
    title,
    daysElapsed,
    actualOutcome,
    expectedOutcome,
    comparison,
    read,
    category
  } = update;
  
  const getStatusColor = (status) => {
    const colors = {
      exceeded: '#48FF9B', // Green
      met: '#ffb800',      // Yellow/Orange
      below: '#ff4d4d'     // Red
    };
    return colors[status] || '#48FF9B';
  };
  
  const getStatusLabel = (status) => {
    const labels = {
      exceeded: 'Exceeded Expectations',
      met: 'Met Expectations',
      below: 'Below Expectations'
    };
    return labels[status] || 'Met Expectations';
  };
  
  const statusColor = getStatusColor(comparison?.status || 'met');
  const timeElapsedText = formatTimeElapsed(daysElapsed);
  
  return (
    <div 
      className={`impact-update-card ${!read ? 'unread' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="impact-update-card-header">
        <div className="impact-update-card-category">
          {category || '.pro'}
        </div>
        <div className="impact-update-card-time">
          {timeElapsedText}
        </div>
      </div>
      
      <div className="impact-update-card-title">
        {title || 'Impact Update'}
      </div>
      
      <div className="impact-update-card-comparison">
        <div className="impact-update-comparison-item">
          <span className="impact-update-label">Expected:</span>
          <span className="impact-update-value expected">
            {expectedOutcome?.impact || 'N/A'}
          </span>
        </div>
        <div className="impact-update-comparison-item">
          <span className="impact-update-label">Actual:</span>
          <span className="impact-update-value actual">
            {actualOutcome?.impact || 'N/A'}
          </span>
        </div>
      </div>
      
      {comparison && (
        <div 
          className="impact-update-status-badge"
          style={{ 
            backgroundColor: statusColor,
            color: '#000000'
          }}
        >
          {getStatusLabel(comparison.status)}
          {comparison.percentageDelta !== 0 && (
            <span style={{ marginLeft: '8px', fontWeight: 600 }}>
              ({comparison.percentageDelta > 0 ? '+' : ''}{comparison.percentageDelta}%)
            </span>
          )}
        </div>
      )}
      
      {!read && (
        <div className="impact-update-unread-indicator" />
      )}
    </div>
  );
}
