/**
 * ImplementationCardDetailModal Component
 * Detailed view for implementation roadmap cards
 * Shows: description, correlated tasks, duration, confidence level, and forecasted business impact
 */

import './implementationCardDetailModal.css';

export default function ImplementationCardDetailModal({ section, onClose }) {
  if (!section) return null;

  // Extract enhanced data from section
  const title = section.title || 'Implementation Step';
  const description = section.description || 'No description available';
  const duration = section.duration || section.value || 'Not specified';
  const confidence = section.confidence || 0.75;
  const forecastedImpact = section.forecastedImpact || 'Not specified';
  const impactRevenue = section.impactRevenue;
  const impactMarketShare = section.impactMarketShare;
  const impactType = section.impactType || 'revenue';
  const correlatedTasks = section.correlatedTasks || [];

  // Format confidence as percentage
  const confidencePercentage = (confidence * 100).toFixed(0);

  // Format business impact in absolute terms
  const formatBusinessImpact = () => {
    if (impactType === 'market_share' && impactMarketShare !== undefined) {
      const sign = impactMarketShare >= 0 ? '+' : '';
      return `${sign}${impactMarketShare.toFixed(1)}% market share`;
    } else if (impactType === 'revenue' && impactRevenue !== undefined) {
      const sign = impactRevenue >= 0 ? '+' : '';
      const absValue = Math.abs(impactRevenue);
      return `${sign}€${(absValue / 1000000).toFixed(1)}M revenue`;
    } else if (impactRevenue !== undefined) {
      // Fallback to revenue if available
      const sign = impactRevenue >= 0 ? '+' : '';
      const absValue = Math.abs(impactRevenue);
      return `${sign}€${(absValue / 1000000).toFixed(1)}M revenue`;
    } else if (impactMarketShare !== undefined) {
      // Fallback to market share if available
      const sign = impactMarketShare >= 0 ? '+' : '';
      return `${sign}${impactMarketShare.toFixed(1)}% market share`;
    }
    return forecastedImpact; // Fallback to text description
  };

  const businessImpactFormatted = formatBusinessImpact();
  const isPositiveImpact = (impactRevenue !== undefined && impactRevenue >= 0) || 
                          (impactMarketShare !== undefined && impactMarketShare >= 0);

  return (
    <div className="impl-card-detail-modal">
      {/* Header */}
      <div className="impl-card-detail-header">
        <div className="impl-card-detail-category">{section.category || '.fin'}</div>
        <h2 className="impl-card-detail-title">{title}</h2>
      </div>

      {/* Description */}
      <div className="impl-card-detail-section">
        <div className="impl-card-detail-section-label">WHAT IT IS ABOUT</div>
        <div className="impl-card-detail-description">{description}</div>
      </div>

      {/* Duration */}
      <div className="impl-card-detail-section">
        <div className="impl-card-detail-section-label">DURATION</div>
        <div className="impl-card-detail-duration">{duration}</div>
      </div>

      {/* Confidence Level */}
      <div className="impl-card-detail-section">
        <div className="impl-card-detail-section-label">CONFIDENCE LEVEL</div>
        <div className="impl-card-detail-confidence">
          <div className="impl-card-detail-confidence-bar">
            <div 
              className="impl-card-detail-confidence-fill"
              style={{ width: `${confidencePercentage}%` }}
            />
          </div>
          <div className="impl-card-detail-confidence-value">{confidencePercentage}%</div>
        </div>
      </div>

      {/* Forecasted Business Impact */}
      <div className="impl-card-detail-section">
        <div className="impl-card-detail-section-label">FORECASTED BUSINESS IMPACT</div>
        <div className={`impl-card-detail-impact ${isPositiveImpact ? 'positive' : 'negative'}`}>
          <div className="impl-card-detail-impact-value">{businessImpactFormatted}</div>
          {forecastedImpact && businessImpactFormatted !== forecastedImpact && (
            <div className="impl-card-detail-impact-description">{forecastedImpact}</div>
          )}
        </div>
      </div>

      {/* Correlated Tasks */}
      {correlatedTasks.length > 0 && (
        <div className="impl-card-detail-section">
          <div className="impl-card-detail-section-label">CORRELATED TASKS</div>
          <div className="impl-card-detail-tasks">
            {correlatedTasks.map((task, index) => (
              <div key={index} className="impl-card-detail-task-item">
                <div className="impl-card-detail-task-bullet">•</div>
                <div className="impl-card-detail-task-text">{task}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
