import AgentHeader from '../components/AgentHeader';
import MobileStatusHeader from '../assets/mobilestatusheader_black.svg';
import AIIcon from '../assets/AI.svg';
import PlusCircleIcon from '../assets/PlusCircle.svg';
import '../components/agent.css';

export default function RiskAssessmentTemplate({ 
  data, 
  currentPage, 
  totalPages 
}) {
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
      />

      {/* Content Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px'
      }}>

        {/* AI Title Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img 
            src={AIIcon} 
            alt="AI" 
            style={{
              width: '32px',
              height: '32px'
            }}
          />
          <div style={{
            color: 'white',
            fontSize: '18px',
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: '600',
            lineHeight: '22px'
          }}>
            {data.aiTitle}
          </div>
        </div>

        {/* Main Description */}
        <div style={{
          color: '#FFFFFF',
          fontSize: '22px',
          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: '400',
          lineHeight: '28px'
        }}>
          {data.description}
        </div>

        {/* Assessment Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {data.items && data.items.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              {/* Plus Icon */}
              <img 
                src={PlusCircleIcon} 
                alt="Plus" 
                style={{
                  width: '20px',
                  height: '20px',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              />
              
              {/* Content */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1
              }}>
                {/* Title */}
                <div style={{
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '700',
                  lineHeight: '22px'
                }}>
                  {item.label}
                </div>
                
                {/* Description */}
                <div style={{
                  color: '#A6A6A6',
                  fontSize: '16px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '400',
                  lineHeight: '22px'
                }}>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer space reserved for parent's navigation */}
      <div style={{
        height: '77px',
        flexShrink: 0
      }}>
      </div>
    </div>
  );
}
