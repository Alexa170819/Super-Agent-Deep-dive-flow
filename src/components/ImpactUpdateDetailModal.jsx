/**
 * ImpactUpdateDetailModal Component
 * Full-screen modal showing detailed impact comparison
 * Shows expected vs actual outcomes with side-by-side comparison
 */

import Modal from './Modal';
import { formatTimeElapsed } from '../services/timeSimulationService';
import { markUpdateAsRead } from '../services/impactUpdateService';
import './impactUpdateDetail.css';

export default function ImpactUpdateDetailModal({ update, onClose }) {
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
    category
  } = update;
  
  // Mark as read when opened
  if (!update.read) {
    markUpdateAsRead(id);
  }
  
  const getStatusColor = (status) => {
    const colors = {
      exceeded: '#48FF9B',
      met: '#ffb800',
      below: '#ff4d4d'
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
    <Modal isOpen={true} onClose={onClose} height={752} showHandle={true}>
      <div className="impact-update-detail">
        {/* Header */}
        <div className="impact-update-detail-header">
          <div className="impact-update-detail-category">
            {category || '.pro'}
          </div>
          <h2 className="impact-update-detail-title">
            {title || 'Impact Update'}
          </h2>
          <div className="impact-update-detail-time">
            {timeElapsedText}
          </div>
        </div>
        
        {/* Status Badge */}
        {comparison && (
          <div 
            className="impact-update-detail-status"
            style={{ backgroundColor: statusColor, color: '#000000' }}
          >
            {getStatusLabel(comparison.status)}
            {comparison.percentageDelta !== 0 && (
              <span style={{ marginLeft: '8px', fontWeight: 600 }}>
                ({comparison.percentageDelta > 0 ? '+' : ''}{comparison.percentageDelta}%)
              </span>
            )}
          </div>
        )}
        
        {/* Comparison Section */}
        <div className="impact-update-detail-comparison">
          <h3 className="impact-update-section-title">Expected vs Actual</h3>
          
          <div className="impact-update-comparison-grid">
            {/* Expected Outcome */}
            <div className="impact-update-comparison-card expected">
              <div className="impact-update-comparison-card-header">
                <span className="impact-update-comparison-label">Expected</span>
              </div>
              <div className="impact-update-comparison-content">
                <div className="impact-update-metric">
                  <div className="impact-update-metric-label">Impact</div>
                  <div className="impact-update-metric-value">
                    {expectedOutcome?.impact || 'N/A'}
                  </div>
                </div>
                {expectedOutcome?.confidence && (
                  <div className="impact-update-metric">
                    <div className="impact-update-metric-label">Confidence</div>
                    <div className="impact-update-metric-value">
                      {(expectedOutcome.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                )}
                {expectedOutcome?.risk && (
                  <div className="impact-update-metric">
                    <div className="impact-update-metric-label">Risk</div>
                    <div className="impact-update-metric-value">
                      {expectedOutcome.risk}
                    </div>
                  </div>
                )}
                {expectedOutcome?.timeline && (
                  <div className="impact-update-metric">
                    <div className="impact-update-metric-label">Timeline</div>
                    <div className="impact-update-metric-value">
                      {expectedOutcome.timeline}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Actual Outcome */}
            <div className="impact-update-comparison-card actual">
              <div className="impact-update-comparison-card-header">
                <span className="impact-update-comparison-label">Actual</span>
              </div>
              <div className="impact-update-comparison-content">
                <div className="impact-update-metric">
                  <div className="impact-update-metric-label">Impact</div>
                  <div className="impact-update-metric-value" style={{ color: '#48FF9B' }}>
                    {actualOutcome?.impact || 'N/A'}
                  </div>
                </div>
                {actualOutcome?.confidence && (
                  <div className="impact-update-metric">
                    <div className="impact-update-metric-label">Confidence</div>
                    <div className="impact-update-metric-value" style={{ color: '#48FF9B' }}>
                      {(actualOutcome.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                )}
                {actualOutcome?.status && (
                  <div className="impact-update-metric">
                    <div className="impact-update-metric-label">Status</div>
                    <div className="impact-update-metric-value" style={{ color: '#48FF9B' }}>
                      {actualOutcome.status}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Delta Section */}
        {comparison && comparison.impactDelta !== 0 && (
          <div className="impact-update-detail-delta">
            <h3 className="impact-update-section-title">Impact Difference</h3>
            <div 
              className="impact-update-delta-value"
              style={{ color: comparison.impactDelta > 0 ? '#48FF9B' : '#ff4d4d' }}
            >
              {comparison.impactDelta > 0 ? '+' : ''}
              ${Math.abs(comparison.impactDelta).toLocaleString()}
            </div>
            <div className="impact-update-delta-label">
              {comparison.impactDelta > 0 ? 'More than expected' : 'Less than expected'}
            </div>
          </div>
        )}
        
        {/* Learnings/Recommendations */}
        <div className="impact-update-detail-learnings">
          <h3 className="impact-update-section-title">Key Learnings</h3>
          <div className="impact-update-learnings-content">
            {comparison?.status === 'exceeded' && (
              <p>The decision performed better than expected. Consider scaling this approach to similar situations.</p>
            )}
            {comparison?.status === 'met' && (
              <p>The decision met expectations. The predictive model was accurate for this scenario.</p>
            )}
            {comparison?.status === 'below' && (
              <p>The decision performed below expectations. Review the assumptions and consider alternative approaches for similar decisions.</p>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="impact-update-detail-actions">
          <button
            className="impact-update-action-btn primary"
            onClick={onClose}
          >
            DISMISS
          </button>
        </div>
      </div>
    </Modal>
  );
}
