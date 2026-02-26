import ModalHeader from '../components/ModalHeader';
import '../components/agent.css';

export default function ProgressBarTemplate({ data, currentPage, totalPages }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '0px',
      paddingBottom: '60px',
      boxSizing: 'border-box'
    }}>
      <ModalHeader title={data.title} subtitle={data.subtitle} />
      
      {/* Optional Top Metrics */}
      {data.topMetrics && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '24px 24px 0px 24px',
          width: '373px',
          boxSizing: 'border-box'
        }}>
          {data.topMetrics.map((metric, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '0px',
              width: '325px',
              marginBottom: index < data.topMetrics.length - 1 ? '24px' : '0px'
            }}>
              {/* Top description */}
              {metric.topLabel && (
                <div style={{
                  width: '325px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 510,
                  fontSize: '20px',
                  lineHeight: '110%',
                  color: '#FFFFFF'
                }}>
                  {metric.topLabel}
                </div>
              )}
              
              {/* Big content */}
              <div style={{
                width: '325px',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontStyle: 'normal',
                fontWeight: 274,
                fontSize: '72px',
                lineHeight: '110%',
                display: 'flex',
                alignItems: 'center',
                color: metric.positive === false ? '#FF3469' : '#48FF9B'
              }}>
                {metric.value}
              </div>
              
              {/* Bottom Description */}
              {metric.bottomLabel && (
                <div style={{
                  width: '325px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '18px',
                  lineHeight: '110%',
                  color: '#FFFFFF'
                }}>
                  {metric.bottomLabel}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div style={{ padding: '24px', paddingTop: data.topMetrics ? '16px' : '16px' }}>
        {data.sections && data.sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.items && section.items.map((item, itemIndex) => (
              <div key={itemIndex} style={{ marginBottom: '24px' }}>
                {/* Category - solo en el primer item */}
                {itemIndex === 0 && (
                  <div style={{
                    color: '#A6A6A6',
                    fontSize: '18px',
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: '700',
                    lineHeight: '19.80px',
                    marginBottom: '8px'
                  }}>{section.category}</div>
                )}
                
                {/* Value y Progress Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <div style={{
                    width: '80px',
                    color: 'white',
                    fontSize: '20px',
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: '510',
                    lineHeight: '22px'
                  }}>{item.value}</div>
                  
                  <div style={{
                    position: 'relative',
                    width: item.barSize || '150px',
                    height: '24px'
                  }}>
                    <div style={{
                      height: '24px',
                      width: `${item.barLength || 100}%`,
                      opacity: 0.20,
                      background: item.positive === false ? '#FF3469' : '#48FF9B',
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px'
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: `${item.barLength || 100}%`,
                      top: 0,
                      width: '2px',
                      height: '24px',
                      background: item.positive === false ? '#FF3469' : '#48FF9B'
                    }} />
                  </div>
                </div>
                
                {/* Description */}
                <div style={{
                  color: 'white',
                  fontSize: '12px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '510',
                  lineHeight: '14.40px'
                }}>{item.description}</div>
              </div>
            ))}
            
            {/* Divider entre secciones */}
            {sectionIndex < data.sections.length - 1 && (
              <div style={{
                width: 'calc(100% - 48px)',
                margin: '16px 24px',
                height: 0,
                borderTop: '1px solid rgba(255, 255, 255, 0.20)'
              }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
