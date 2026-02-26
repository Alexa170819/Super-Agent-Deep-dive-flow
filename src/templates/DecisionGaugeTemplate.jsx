import AgentHeader from '../components/AgentHeader';
import '../components/agent.css';
import MobileStatusHeader from '../assets/mobilestatusheader_black.svg';

export default function DecisionGaugeTemplate({ data, currentPage, totalPages, onAction }) {
  const handleButtonClick = () => {
    if (onAction && data.buttonAction) {
      onAction(data.buttonAction);
    }
  };

  // Calculate gauge arc based on percentage
  const percentage = data.gauge?.percentage || 52;
  const isOnTrack = data.isOnTrack !== undefined ? data.isOnTrack : percentage >= 70;
  const gaugeColor = isOnTrack ? '#48FF9B' : '#FF8C00';
  
  const radius = 110;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const gapAngle = 60; // Gap at bottom in degrees
  const availableArc = 360 - gapAngle;
  const arcLength = (availableArc / 360) * circumference;
  const filledLength = (percentage / 100) * arcLength;

  // Calculate dot position
  const startAngle = 120; // degrees (where the arc starts, from top)
  const filledAngle = (percentage / 100) * availableArc;
  const dotAngle = (startAngle + filledAngle) * (Math.PI / 180);
  const dotX = 130 + radius * Math.cos(dotAngle - Math.PI / 2);
  const dotY = 130 + radius * Math.sin(dotAngle - Math.PI / 2);

  return (
    <div className="agent-page" style={{
      position: 'relative',
      width: '375px',
      height: '812px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0px',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      background: '#000000'
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
      <AgentHeader title={data.title} subtitle={data.subtitle} />

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px 24px',
        gap: '16px',
        width: '100%',
        flex: 1,
        boxSizing: 'border-box'
      }}>
        {/* Status Text */}
        <h2 style={{
          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 500,
          fontSize: '28px',
          lineHeight: '120%',
          color: '#FFFFFF',
          margin: 0,
          textAlign: 'center'
        }}>
          {data.statusText || (isOnTrack ? "You're on track!" : "You're not on track!")}
        </h2>

        {/* Gauge Container with Glow */}
        <div style={{
          position: 'relative',
          width: '280px',
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Golden/Green Glow Effect */}
          <div style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: isOnTrack 
              ? 'radial-gradient(circle, rgba(72, 255, 155, 0.15) 0%, rgba(72, 255, 155, 0.05) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 140, 0, 0.2) 0%, rgba(180, 100, 0, 0.1) 50%, transparent 70%)',
            filter: 'blur(20px)'
          }} />

          {/* Inner dark circle background */}
          <div style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #1a1a1a 0%, #0d0d0d 100%)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)'
          }} />

          {/* SVG Gauge */}
          <svg
            width="260"
            height="260"
            viewBox="0 0 260 260"
            style={{ position: 'absolute' }}
          >
            {/* Background Arc */}
            <circle
              cx="130"
              cy="130"
              r={radius}
              fill="none"
              stroke="rgba(50, 50, 50, 0.5)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${arcLength} ${circumference}`}
              transform="rotate(120 130 130)"
            />
            {/* Filled Arc */}
            <circle
              cx="130"
              cy="130"
              r={radius}
              fill="none"
              stroke={gaugeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${filledLength} ${circumference}`}
              transform="rotate(120 130 130)"
              style={{
                filter: `drop-shadow(0 0 6px ${gaugeColor})`
              }}
            />
            {/* Dot indicator at end of filled arc */}
            <circle
              cx={dotX}
              cy={dotY}
              r="8"
              fill="#FFFFFF"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))'
              }}
            />
          </svg>

          {/* Center Content */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {/* Percentage */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '2px'
            }}>
              <span style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 200,
                fontSize: '72px',
                lineHeight: '100%',
                color: gaugeColor
              }}>
                {percentage}
              </span>
              <span style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 200,
                fontSize: '36px',
                lineHeight: '100%',
                color: gaugeColor
              }}>
                %
              </span>
            </div>
            
            {/* Gauge Label */}
            <div style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '140%',
              color: '#FFFFFF',
              textAlign: 'center'
            }}>
              {data.gauge?.label || "EoM Sales Prediction"}
            </div>

            {/* Secondary Label */}
            {data.gauge?.secondaryLabel && (
              <div style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '140%',
                textAlign: 'center'
              }}>
                <span style={{ color: '#48FF9B' }}>{data.gauge.secondaryLabelHighlight || '#8'}</span>
                <span style={{ color: '#A6A6A6' }}> {data.gauge.secondaryLabelText || 'Leaderboard position'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Opportunity Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          marginTop: '16px'
        }}>
          <div style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '130%',
            color: '#FFFFFF',
            textAlign: 'center'
          }}>
            {data.opportunityLabel || "This week's opportunity"}
          </div>
          <div style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            fontSize: '44px',
            lineHeight: '120%',
            color: '#48FF9B',
            textAlign: 'center'
          }}>
            {data.opportunityValue || "€250,000"}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px 24px 32px',
        width: '100%',
        boxSizing: 'border-box',
        gap: '16px'
      }}>
        {/* CTA Button */}
        {data.buttonText && (
          <button
            onClick={handleButtonClick}
            style={{
              width: '100%',
              maxWidth: '327px',
              height: '56px',
              background: 'linear-gradient(90deg, #0a1a15 0%, #0d2922 50%, #0a1a15 100%)',
              borderRadius: '40px',
              border: '1px solid rgba(72, 255, 155, 0.3)',
              cursor: 'pointer',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '180%',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              textAlign: 'center',
              boxShadow: '0 0 20px rgba(72, 255, 155, 0.15)'
            }}
          >
            {data.buttonText}
          </button>
        )}

        {/* Navigation Footer Space */}
        <div style={{
          width: '100%',
          height: '45px'
        }} />
      </div>
    </div>
  );
}
