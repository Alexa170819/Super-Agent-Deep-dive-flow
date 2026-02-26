/**
 * TeaserCard Component
 * Minimal, curiosity-driven design for story card step 2
 */

import './teaserCard.css';

export default function TeaserCard({ story, onDeepDive }) {
  if (!story) return null;
  
  const brand = story.rawData?.metadata?.brand || story.rawData?.brand || story.brand || 'Saint Laurent';
  const region = story.rawData?.metadata?.region || story.rawData?.region || story.region || 'Western Europe';
  const country = story.rawData?.metadata?.country || story.rawData?.country || story.country;
  const location = country || region; // Use country if available, otherwise region
  
  // Determine direction (up arrow for opportunity, down for risk)
  const isOpportunity = story.impact?.opportunity || story.type === 'regional_opportunity';
  const isRisk = !isOpportunity && (story.impact?.risk === 'high' || story.urgency?.level === 'high');
  
  // Get factual headline - include revenue decline directly in headline for UK
  const getHeadline = () => {
    // For UK risk: Include revenue decline with both % and absolute terms
    if (story.rawData?.country === 'UK' || story.rawData?.metadata?.country === 'UK') {
      const metrics = story.rawData.metrics || {};
      const revenue = metrics.revenue || 0;
      const revenue2024 = metrics.revenue2024 || 0;
      const yoyChange = metrics.yoyChange2024 || 0;
      const absoluteDecline = revenue2024 - revenue;
      
      if (revenue2024 > 0 && absoluteDecline > 0) {
        return `Revenue decline ${(yoyChange * 100).toFixed(1)}% (€${(absoluteDecline / 1000000).toFixed(1)}M) vs 2024`;
      }
      // Fallback if calculation fails
      return `Revenue ${(yoyChange * 100).toFixed(1)}% vs 2024`;
    }
    // For Western Europe opportunity
    if (story.rawData?.metrics?.jan2026Growth && story.rawData?.metrics?.h2Growth) {
      return 'Just turned the corner';
    }
    // Fallback
    return story.rawData?.context?.headline || story.title || 'Review required';
  };
  
  const headline = getHeadline();
  
  // Curiosity hook - question, not answer
  const getCuriosityHook = () => {
    if (story.rawData?.country === 'UK' || story.rawData?.metadata?.country === 'UK') {
      return "What's driving this decline?";
    }
    if (story.rawData?.metrics?.jan2026Growth && story.rawData?.metrics?.h2Growth) {
      return "What's behind this momentum?";
    }
    return "Explore the details";
  };
  
  const curiosityHook = getCuriosityHook();
  
  return (
    <div className="teaser-card">
      {/* Large Directional Icon */}
      <div className="teaser-icon-container">
        <div 
          className="teaser-icon"
          style={{ 
            borderColor: isOpportunity ? '#48FF9B' : (isRisk ? '#ff4d4d' : '#ffb800'),
            backgroundColor: isOpportunity ? 'rgba(72, 255, 155, 0.1)' : (isRisk ? 'rgba(255, 77, 77, 0.1)' : 'rgba(255, 184, 0, 0.1)')
          }}
        >
          {isOpportunity ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M7 14L12 9L17 14H7Z" fill="#48FF9B" />
            </svg>
          ) : isRisk ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10H7Z" fill="#ff4d4d" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 8V16M8 12H16" stroke="#ffb800" strokeWidth="2" />
            </svg>
          )}
        </div>
      </div>
      
      {/* Headline - State the fact with revenue decline included */}
      <h2 className="teaser-headline">
        {brand} {location}: {headline}
      </h2>
      
      {/* Curiosity Hook - Question */}
      <div className="teaser-metric">
        {curiosityHook}
      </div>
      
      {/* Deep Dive CTA */}
      <button 
        className="teaser-cta"
        onClick={onDeepDive}
      >
        Deep dive
      </button>
    </div>
  );
}
