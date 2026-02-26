import AgentHeader from '../components/AgentHeader';
import MobileStatusHeader from '../assets/mobilestatusheader_black.svg';
import AIIcon from '../assets/AI.svg';
import '../components/agent.css';

export default function IRInteractiveDecisionTemplate({ 
  data, 
  currentPage, 
  totalPages,
  onAction 
}) {
  const handleCardClick = (itemIndex) => {
    if (onAction) {
      onAction({ type: 'openModal', modalId: `procurementInsight-${itemIndex}` });
    }
  };
  return (
    <div className="agent-page" style={{
      position: 'relative',
      width: '375px',
      height: '812px',
      background: 'linear-gradient(139deg, #31D4B6 0%, #114F44 7%, #111521 13%, black 17%)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: '0px',
      justifyContent: 'flex-start'
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

      {/* Agent Header */}
      <AgentHeader 
        title={data.title}
        subtitle={data.subtitle}
        location={data.location}
      />

      {/* Content Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'auto',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '16px'
      }}>

        {/* Main Content */}
        <div style={{
          flexDirection: 'column',
          gap: '40px',
          display: 'flex'
        }}>
          {/* AI Title Section */}
          <div style={{
            paddingLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img 
              src={AIIcon} 
              alt="AI" 
              style={{
                width: '28px',
                height: '28px'
              }}
            />
            <div style={{
              flex: '1 1 0',
              flexDirection: 'column',
              gap: '4px',
              display: 'flex'
            }}>
              <div style={{
                color: 'white',
                fontSize: '16px',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: '700',
                lineHeight: '19.20px'
              }}>
                {data.aiTitle}
              </div>
              {data.aiSubtitle && (
                <div style={{
                  color: '#A6A6A6',
                  fontSize: '12px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '510',
                  lineHeight: '14.40px'
                }}>
                  {data.aiSubtitle}
                </div>
              )}
            </div>
          </div>

          {/* Cards */}
          <div style={{
            paddingLeft: '8px',
            paddingRight: '8px',
            flexDirection: 'column',
            gap: '16px',
            display: 'flex'
          }}>
            {data.items && data.items.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleCardClick(index)}
                style={{
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  background: '#1A1A1A',
                  borderRadius: '12px',
                  flexDirection: 'column',
                  gap: '4px',
                  display: 'flex',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#252525'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1A1A1A'}
              >
                {/* Card Title */}
                <div style={{
                  color: '#A6A6A6',
                  fontSize: '16px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '700',
                  lineHeight: '19.20px'
                }}>
                  {item.label}
                </div>

                {/* Card Description */}
                <div style={{
                  color: 'white',
                  fontSize: '16px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '510',
                  lineHeight: '19.20px'
                }}>
                  {item.description}
                </div>

                {/* Card Value/Date */}
                {item.value && (
                  <div style={{
                    color: '#48FF9B',
                    fontSize: '28px',
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: '274',
                    lineHeight: '30.80px'
                  }}>
                    {item.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer space reserved for parent's navigation */}
      <div style={{
        height: '77px', // Reserve space for parent's navigation
        flexShrink: 0
      }}>
      </div>
    </div>
  );
}
