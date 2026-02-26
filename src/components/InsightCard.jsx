/**
 * InsightCard Component
 * Reusable card component for displaying insights/stories
 */

import './insightCard.css';

export default function InsightCard({ 
  insight, 
  onClick,
  showScores = false 
}) {
  if (!insight) {
    return null;
  }
  
  const {
    storyId,
    title,
    category,
    timestamp,
    impact,
    scores,
    finalScore,
    keyInsight,
    urgency,
    primaryAction
  } = insight;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get category display
  const getCategoryDisplay = (cat) => {
    return cat || '.pro';
  };
  
  // Get urgency color
  const getUrgencyColor = (urgencyLevel) => {
    const colors = {
      high: '#ff4d4d',
      medium: '#ffb800',
      low: '#48FF9B'
    };
    return colors[urgencyLevel] || '#48FF9B';
  };
  
  // Get urgency data (support both old and new format)
  const urgencyData = urgency;
  const urgencyLevel = typeof urgencyData === 'string' ? urgencyData : urgencyData?.level || (impact?.risk || 'medium');
  const timeToAct = urgencyData?.timeToAct || (urgencyLevel === 'high' ? '7 days' : urgencyLevel === 'medium' ? '2 weeks' : '1 month');
  
  // Get key insight (prefer keyInsight, fallback to narrative or title)
  const displayKeyInsight = keyInsight || insight.narrative || title;
  
  // Determine if this is a risk or opportunity
  const isOpportunity = impact?.opportunity || insight.type === 'sales_opportunity';
  const riskOrOppLabel = isOpportunity ? 'OPPORTUNITY' : 'RISK';
  const riskOrOppColor = isOpportunity ? '#48FF9B' : (impact?.risk === 'high' ? '#ff4d4d' : impact?.risk === 'medium' ? '#ffb800' : '#48FF9B');
  
  // Get brand/region context from rawData metadata (Kering style)
  const brandRegion = insight.rawData?.metadata?.region || insight.rawData?.metadata?.brand || 'Global';
  const entityName = insight.rawData?.metadata?.brand 
    ? `${insight.rawData.metadata.brand} - ${brandRegion}` 
    : brandRegion;
  
  // Determine risk direction (downside/upside)
  const isDownside = !isOpportunity && (impact?.risk === 'high' || impact?.risk === 'medium');
  const riskDirection = isOpportunity ? 'upside' : isDownside ? 'downside' : 'neutral';
  
  // Format Kering-style text
  const formatKeringText = () => {
    const directionText = riskDirection === 'downside' ? 'highest downside risk' : 
                         riskDirection === 'upside' ? 'highest upside opportunity' : 
                         'significant change';
    
    let text = `${entityName} shows the ${directionText} based on AI`;
    
    // Extract financial impact from impact object
    if (impact?.financial) {
      // Try to extract the main number (e.g., "+$6.4M" or "-$6.8M")
      const financialMatch = impact.financial.match(/([+-]?\$?[\d.]+[MK]?)/);
      if (financialMatch) {
        // Also try to get percentage if available
        const percentMatch = impact.financial.match(/\(([+-]?[\d.]+%)\)/);
        if (percentMatch) {
          text += ` with ${financialMatch[1]} (${percentMatch[1]})`;
        } else {
          text += ` with ${financialMatch[1]}`;
        }
      }
    }
    
    // Add comparison context if available
    if (insight.rawData?.metrics) {
      const comparison = insight.type === 'sales_opportunity' ? 'vs PY' : 'vs BUD Full Quarter';
      if (impact?.financial) {
        text += ` ${comparison}`;
      }
    }
    
    // Add KPI impact
    if (impact?.kpi) {
      text += `. ${impact.kpi}`;
    }
    
    return text;
  };
  
  return (
    <div 
      className={`insight-card insight-card-${riskDirection}`}
      style={{
        borderColor: riskOrOppColor,
        background: riskDirection === 'downside' 
          ? 'linear-gradient(180deg, rgba(255, 77, 77, 0.15) 0%, rgba(0, 0, 0, 0.8) 100%)'
          : riskDirection === 'upside'
          ? 'linear-gradient(180deg, rgba(72, 255, 155, 0.15) 0%, rgba(0, 0, 0, 0.8) 100%)'
          : 'rgba(255, 255, 255, 0.05)'
      }}
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
      {/* Brand/Region Header - Kering Style */}
      <div className="insight-card-brand-header">
        <div className="insight-card-brand-name">
          {entityName}
        </div>
        <div className="insight-card-ai-badge">
          AI-based {riskOrOppLabel.toLowerCase()}
        </div>
          </div>
      
      {/* Risk Direction Icon - Kering Style */}
      <div className="insight-card-icon-container">
        <div 
          className="insight-card-risk-icon"
          style={{ 
            borderColor: riskOrOppColor,
            backgroundColor: riskDirection === 'downside' ? 'rgba(255, 77, 77, 0.1)' : 
                           riskDirection === 'upside' ? 'rgba(72, 255, 155, 0.1)' : 
                           'rgba(255, 184, 0, 0.1)'
          }}
        >
          {riskDirection === 'downside' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10H7Z" fill={riskOrOppColor} />
            </svg>
          ) : riskDirection === 'upside' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 14L12 9L17 14H7Z" fill={riskOrOppColor} />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8V16M8 12H16" stroke={riskOrOppColor} strokeWidth="2" />
            </svg>
          )}
        </div>
      </div>
      
      {/* Kering-Style Text */}
      <div className="insight-card-kering-text">
        {formatKeringText()}
      </div>
      
      {/* Financial & Business Impact Section */}
      {impact && (
        <div className="insight-card-impact-section">
          <div className="insight-card-impact-label">FINANCIAL & BUSINESS IMPACT:</div>
          <div className="insight-card-impact-content">
            {impact.financial && (
              <div className="insight-card-impact-item">
                <span className="insight-card-impact-icon">💰</span>
                <span className="insight-card-impact-text">{impact.financial}</span>
              </div>
            )}
            {impact.kpi && (
              <div className="insight-card-impact-item">
                <span className="insight-card-impact-icon">📊</span>
                <span className="insight-card-impact-text">{impact.kpi}</span>
              </div>
            )}
            {primaryAction?.impact && (
              <div className="insight-card-impact-item">
                <span className="insight-card-impact-icon">🎯</span>
                <span className="insight-card-impact-text">{primaryAction.impact}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Decision Section - Clear Label */}
      {primaryAction && (
        <div className="insight-card-decision-section">
          <div className="insight-card-decision-label">ACTION TO TAKE:</div>
          <div className="insight-card-primary-action">
            <div className="insight-card-action-title">
              {primaryAction.title || 'Action Required'}
          </div>
            {primaryAction.description && (
              <div className="insight-card-action-description">
                {primaryAction.description}
          </div>
            )}
          </div>
        </div>
      )}
      
      {/* See More Button - Kering Style */}
      <div className="insight-card-see-more">
        <button 
          className="insight-card-see-more-btn" 
          onClick={(e) => { 
            e.stopPropagation(); 
            onClick?.(); 
          }}
        >
          SEE MORE <span className="insight-card-chevron">></span>
        </button>
      </div>
    </div>
  );
}
