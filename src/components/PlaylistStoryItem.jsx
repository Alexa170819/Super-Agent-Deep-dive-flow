/**
 * PlaylistStoryItem Component
 * Single story row in playlist detail view
 */

import './playlistStoryItem.css';

export default function PlaylistStoryItem({ story, onClick }) {
  if (!story) return null;

  // Determine trend direction - use trendDirection if available, otherwise infer from impact
  const trendDirection = story.trendDirection || 
    (story.impact?.opportunity ? 'up' : 
     (story.impact?.risk === 'high' || story.impact?.risk === 'medium' ? 'down' : 'neutral'));
  const trendColor = trendDirection === 'up' ? '#48FF9B' : trendDirection === 'down' ? '#ff4d4d' : '#ffb800';

  // Format story text to match screenshot format
  const formatStoryText = () => {
    // If story has title and narrative in the format we want (from mock stories), use them directly
    if (story.title && story.narrative) {
      return `${story.title}: ${story.narrative}`;
    }
    
    // Try to match the screenshot format: "Sales - Kering Group: Feb 26 revenue reaching 673M"
    // or "Sales - vs PY: Feb 26 sales declined by -143M (-17.5%) vs PY"
    
    const metricType = story.type === 'sales_opportunity' ? 'Sales' : 
                      story.type === 'expenses' ? 'Total Operating Expenses' :
                      story.type === 'ebit' ? 'EBIT' : 'Sales';
    
    const entity = story.rawData?.metadata?.brand ? 
                   `${story.rawData.metadata.brand} - ${story.rawData.metadata.region || 'Kering Group'}` :
                   'Kering Group';
    
    // Format date
    const date = story.timestamp ? 
                 new Date(story.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }) :
                 'Feb 26';
    
    // Get value from impact
    const value = story.impact?.financial || story.impact?.kpi || '';
    
    // Build the text based on available data
    if (story.rawData?.metrics) {
      // Try to match screenshot format more closely
      if (story.type === 'sales_opportunity') {
        const revenue = story.rawData.metrics.revenue2025 || story.rawData.metrics.revenue || '';
        if (revenue) {
          return `${metricType} - ${entity}: ${date} revenue reaching ${typeof revenue === 'number' ? (revenue / 1000000).toFixed(0) + 'M' : revenue}`;
        }
      }
      
      // For vs PY comparisons
      if (story.impact?.kpi && story.impact.kpi.includes('vs PY')) {
        return `${metricType} - vs PY: ${date} ${story.impact.kpi}`;
      }
      
      // For vs Forecast comparisons
      if (story.impact?.kpi && story.impact.kpi.includes('vs Forecast')) {
        return `${metricType} - vs Forecast1: ${date} ${story.impact.kpi}`;
      }
      
      // Default format
      if (value) {
        return `${metricType} - ${entity}: ${date} ${value}`;
      }
    }
    
    // Fallback to simpler format
    return story.keyInsight || story.narrative || story.title || 'Story';
  };

  return (
    <div className="playlist-story-item" onClick={onClick}>
      <div className="playlist-story-item-trend">
        {trendDirection === 'up' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 14L12 9L17 14H7Z" fill={trendColor} />
          </svg>
        ) : trendDirection === 'down' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10H7Z" fill={trendColor} />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V16M8 12H16" stroke={trendColor} strokeWidth="2" />
          </svg>
        )}
      </div>
      <div className="playlist-story-item-text">
        {formatStoryText()}
      </div>
      <div className="playlist-story-item-chevron">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
