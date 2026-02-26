import AIIcon from '../assets/AI.svg';
import '../components/agent.css';

export default function ProgressTrackingModal({ 
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
          {data.subtitle && (
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '18px'
            }}>
              {data.subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Primary Metric */}
      {data.primaryMetric && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '48px',
            fontWeight: '300',
            lineHeight: '52px',
            color: '#48FF9B'
          }}>
            {data.primaryMetric.value}
          </div>
          {data.primaryMetric.label && (
            <div style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '20px',
              color: '#FFFFFF'
            }}>
              {data.primaryMetric.label}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      {data.legend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px'
        }}>
          {data.legend.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: item.color 
              }} />
              <span style={{ 
                color: '#FFFFFF', 
                fontSize: '14px', 
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif" 
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Items List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        flex: 1,
        overflowY: 'auto',
        marginBottom: '60px'
      }}>
        {data.items && data.items.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '16px 0',
            borderBottom: index < data.items.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
          }}>
            {/* Item Title */}
            <div style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '20px',
              color: '#FFFFFF'
            }}>
              {item.title}
            </div>

            {/* Units Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                {item.unitsNeeded}
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {/* Triangle indicator */}
                <span style={{
                  color: item.changePositive ? '#48FF9B' : '#FF3469',
                  fontSize: '10px'
                }}>
                  {item.changePositive ? '▲' : '▼'}
                </span>
                <span style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '14px',
                  fontWeight: '600',
                  color: item.changePositive ? '#48FF9B' : '#FF3469'
                }}>
                  {item.changeValue}
                </span>
                <span style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '12px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  vs PM
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px'
            }}>
              {/* AI Forecast (pink bar) */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '4px',
                width: `${item.forecastPercent || 0}%`,
                background: '#FF3469',
                borderRadius: '2px'
              }} />
              {/* Target dot (white) */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: `${item.targetPercent || 0}%`,
                transform: 'translate(-50%, -50%)',
                width: '10px',
                height: '10px',
                background: '#FFFFFF',
                borderRadius: '50%'
              }} />
            </div>

            {/* Forecast vs Target Labels */}
            <div style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '12px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              {item.forecastLabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
