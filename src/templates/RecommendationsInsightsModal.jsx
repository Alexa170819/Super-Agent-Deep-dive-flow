import AIIcon from '../assets/AI.svg';
import '../components/agent.css';

export default function RecommendationsInsightsModal({ 
  data,
  isModal = true
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '0 24px',
      boxSizing: 'border-box',
      gap: '16px'
    }}>
      {/* Header with AI Icon */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        width: '100%'
      }}>
        <img 
          src={AIIcon} 
          alt="AI" 
          style={{
            width: '32px',
            height: '32px',
            flexShrink: 0
          }}
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <span style={{
            color: '#FFFFFF',
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: '22px'
          }}>
            {data.title}
          </span>
        </div>
      </div>

      {/* Recommendation Content */}
      {data.recommendations && data.recommendations.map((recommendation, index) => (
        <div key={index} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%'
        }}>
          {/* Recommendation Title - Large Green Heading */}
          <div style={{
            color: '#48FF9B',
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '28px',
            wordWrap: 'break-word'
          }}>
            {recommendation.title}
          </div>

          {/* Recommendation Description */}
          {recommendation.description && (
            <div style={{
              color: '#FFFFFF',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '22px',
              wordWrap: 'break-word'
            }}>
              {recommendation.description}
            </div>
          )}

          {/* SKU List with Dividers */}
          {recommendation.items && recommendation.items.length > 0 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              marginTop: '8px'
            }}>
              {recommendation.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div style={{
                    padding: '16px 0',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '22px'
                  }}>
                    {typeof item === 'string' ? item : item.name}
                  </div>
                  {itemIndex < recommendation.items.length - 1 && (
                    <div style={{
                      height: '1px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      width: '100%'
                    }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
