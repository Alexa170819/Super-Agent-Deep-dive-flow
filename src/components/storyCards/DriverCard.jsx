/**
 * DriverCard Component
 * Driver-focused insights design for story card step 2
 */

import './driverCard.css';

export default function DriverCard({ story, onDeepDive }) {
  if (!story) return null;
  
  const brand = story.rawData?.metadata?.brand || story.rawData?.brand || story.brand || 'Saint Laurent';
  const region = story.rawData?.metadata?.region || story.rawData?.region || story.region || 'Western Europe';
  const country = story.rawData?.metadata?.country || story.rawData?.country || story.country;
  const location = country || region;
  
  const keyIssues = story.rawData?.keyIssues || [];
  const topDrivers = keyIssues.slice(0, 3);
  
  // Get headline with revenue decline included for UK
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
    }
    return null;
  };
  
  const headlineSuffix = getHeadline();
  
  return (
    <div className="driver-card">
      <div className="driver-header">
        <h2 className="driver-headline">
          {brand} {location}{headlineSuffix ? `: ${headlineSuffix}` : ''}
        </h2>
        <div className="driver-subheadline">
          What's driving the decline
        </div>
      </div>
      
      {topDrivers.length > 0 ? (
        <div className="driver-list">
          {topDrivers.map((driver, index) => (
            <div key={index} className="driver-item">
              <div className="driver-item-number">{index + 1}</div>
              <div className="driver-item-content">
                <div className="driver-item-header">
                  <span className="driver-item-label">{driver.issue}</span>
                  <span className="driver-item-value critical">{driver.value}</span>
                </div>
                <div className="driver-item-context">{driver.context}</div>
                {driver.description && (
                  <div className="driver-item-description">{driver.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="driver-narrative">
          {story.rawData?.context?.narrative || story.narrative || story.keyInsight}
        </div>
      )}
      
      {/* Deep Dive CTA */}
      <button 
        className="driver-cta"
        onClick={onDeepDive}
      >
        Deep dive
      </button>
    </div>
  );
}
