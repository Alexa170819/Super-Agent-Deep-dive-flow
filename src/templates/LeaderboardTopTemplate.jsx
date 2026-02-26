import AgentHeader from '../components/AgentHeader';
import AIIcon from '../assets/AI.svg';
import MobileStatusHeader from '../assets/mobilestatusheader_black.svg';
import NavigationDots from '../components/NavigationDots';
import '../components/agent.css';

export default function LeaderboardTopTemplate({ data, currentPage, totalPages, onClose }) {
  const items = data.items || [];
  const currentPageIndex = currentPage || 0;
  const totalPagesCount = totalPages || 1;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      background: '#000000',
      overflow: 'hidden'
    }}>
      {/* Mobile Status Header */}
      <img 
        src={MobileStatusHeader} 
        alt="Mobile Status Header" 
        style={{
          width: '375px',
          height: '48px',
          display: 'block',
          flexShrink: 0
        }}
      />

      {/* Header with Title, Subtitle, Share and Close */}
      <AgentHeader 
        title={data.title || "Dupixent Highlights"} 
        subtitle={data.subtitle || "Priority Label"}
      />

      {/* Opportunity Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '16px 24px',
        gap: '12px'
      }}>
        {/* AI Icon */}
        <img 
          src={AIIcon} 
          alt="AI" 
          style={{
            width: '32px',
            height: '32px',
            flexShrink: 0
          }}
        />
        {/* Opportunity Text */}
        <div style={{
          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: '16px',
          fontWeight: '600',
          color: '#FFFFFF',
          lineHeight: '22px'
        }}>
          Opportunity
        </div>
      </div>

      {/* Leaderboard Items List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {items.map((item, index) => (
          <div key={index}>
            {/* Leaderboard Item */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 0',
              gap: '8px'
            }}>
              {/* Rank and Title Row */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px'
              }}>
                {/* Rank */}
                <div style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#A6A6A6',
                  lineHeight: '20px'
                }}>
                  {item.rank || `#${String(index + 1).padStart(2, '0')}`}
                </div>
                {/* Title */}
                <div style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  lineHeight: '20px',
                  flex: 1
                }}>
                  {item.title || "Leaderboard Item"}
                </div>
              </div>

              {/* Additional Info */}
              {item.additionalInfo && (
                <div style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '14px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '18px',
                  paddingLeft: '40px'
                }}>
                  {item.additionalInfo}
                </div>
              )}

              {/* Value and Trend */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4px',
                paddingLeft: '40px'
              }}>
                {/* Value */}
                <div style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                  color: item.positive === false ? '#FF3469' : '#48FF9B',
                  lineHeight: '20px'
                }}>
                  {item.value || "0.0"}
                </div>
                {/* Trend Indicator */}
                <div style={{
                  fontSize: '10px',
                  color: item.positive === false ? '#FF3469' : '#48FF9B',
                  lineHeight: '20px'
                }}>
                  {item.positive === false ? '▼' : (item.positive === true ? '▲' : '▼')}
                </div>
              </div>
            </div>

            {/* Separator Line */}
            {index < items.length - 1 && (
              <div style={{
                height: '1px',
                background: 'rgba(255, 255, 255, 0.1)',
                width: '100%'
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {totalPagesCount > 1 && (
        <div style={{
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <NavigationDots total={totalPagesCount} current={currentPageIndex} />
        </div>
      )}
    </div>
  );
}
