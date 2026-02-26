import AgentHeader from '../components/AgentHeader';
import '../components/agent.css';
import AIIcon from '../assets/AI.svg';
import MobileStatusHeader from '../assets/mobilestatusheader_black.svg';

export default function DecisionTemplate({ data, currentPage, totalPages, onAction }) {
  const handleInsightsClick = () => {
    if (onAction) {
      onAction({ type: 'openModal', modalId: 'insights' });
    }
  };

  return (
    <div className="agent-page trigger-page" style={{
      position: 'relative',
      width: '375px',
      height: '812px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0px',
      justifyContent: 'flex-start',
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
      
      {/* Agent Header */}
      <AgentHeader title={data.title} />

      {/* Content */}
      <div className="page-content" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0px',
        gap: '24px',
        width: '311px',
        maxHeight: '550px',
      }}>
        <div className="trigger-content" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '24px',
          width: '311px'
        }}>
          {/* Subtitle */}
          <h3 className="trigger-subtitle" style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '110%',
            color: '#FFFFFF',
            width: '325px',
            height: '52px',
            margin: 0,
            textAlign: 'left'
          }}>{data.subtitle}</h3>
          
          {/* Primary Metric */}
          <div className="primary-metric" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '10px',
            width: '325px',
            height: '79px',
            maxHeight: '200px'
          }}>
            <div className="metric-value" style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 274,
              fontSize: '72px',
              lineHeight: '110%',
              color: '#48FF9B',
              width: '325px',
              height: '79px',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left'
            }}>{data.primaryMetric.value}</div>
          </div>

          {/* Primary Metric Label */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            width: '325px',
            height: '26px'
          }}>
            <div className="metric-label" style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '110%',
              color: '#FFFFFF',
              width: '325px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left'
            }}>{data.primaryMetric.label}</div>
          </div>
          
          {/* Secondary Metric */}
          {data.secondaryMetric && (
            <>
              <div className="secondary-metric" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '10px',
                width: '325px',
                height: '79px',
                maxHeight: '200px'
              }}>
                <div className="metric-value" style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 274,
                  fontSize: '72px',
                  lineHeight: '110%',
                  color: '#48FF9B',
                  width: '325px',
                  height: '79px',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'left'
                }}>{data.secondaryMetric.value}</div>
              </div>

              {/* Secondary Metric Label */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                width: '325px',
                height: '26px'
              }}>
                <div className="metric-label" style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '110%',
                  color: '#FFFFFF',
                  width: '325px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'left'
                }}>{data.secondaryMetric.label}</div>
              </div>
            </>
          )}

          {/* Description */}
          {data.description && (
            <p className="trigger-description" style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '110%',
              color: '#FFFFFF',
              margin: 0,
              textAlign: 'left'
            }}>{data.description}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px',
        width: '375px',
        height: '129px',
        flex: 'none',
        order: 2,
        flexGrow: 0
      }}>
        {/* Insights Button - Agent CTA */}
        {data.hasInsights && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0px',
            gap: '4px',
            width: '311px',
            height: '52px',
            borderRadius: '40px',
            flex: 'none',
            order: 0,
            flexGrow: 0,
            position: 'relative'
          }}>
            {/* Button Container */}
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0%',
              top: '0%',
              bottom: '0%',
              background: 'linear-gradient(80deg, #000000 80%, rgba(17, 79, 68, 1) 100%)',
              boxShadow: 'inset -1px 1px 2px rgba(255, 255, 255, 0.17)',
              borderRadius: '40px'
            }} />
            
            {/* Button Content */}
            <button 
              onClick={handleInsightsClick} 
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4px 0px',
                gap: '8px',
                position: 'absolute',
                width: '109px',
                height: '40px',
                left: 'calc(50% - 109px/2 + 0.5px)',
                top: 'calc(50% - 40px/2)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 860,
                fontSize: '12px',
                lineHeight: '180%',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                textAlign: 'center'
              }}
            >
              {/* AI Icon */}
              <img 
                src={AIIcon} 
                alt="AI" 
                style={{
                  width: '32px',
                  height: '32px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0
                }}
              />
              INSIGHTS
            </button>
          </div>
        )}
        
        {/* Navigation Footer */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: '16px 16px 32px',
          width: '375px',
          height: '77px', // Reserve space for parent's navigation
          flex: 'none',
          order: 1,
          alignSelf: 'stretch',
          flexGrow: 0
        }}>
        </div>
      </div>
    </div>
  );
}
