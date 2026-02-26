import ModalHeader from '../components/ModalHeader';
import '../components/agent.css';

export default function IRDecisionTemplate({ data, currentPage, totalPages }) {
  return (
    <div className="scenario-page implementation-page" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '100%',
      padding: '0px',
      paddingBottom: '60px',
      overflowY: 'auto',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Modal Header */}
      <ModalHeader title={data.title} subtitle={data.subtitle || undefined} />
      
      {/* Content with padding */}
      <div style={{
        padding: '24px',
        paddingTop: '16px',
        flex: 1,
        overflowY: 'auto'
      }}>
        {/* Main Heading in Body */}
        {data.mainHeading && (
          <div style={{
            width: '100%',
            marginBottom: '16px'
          }}>
            <div style={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '700',
              lineHeight: '24px',
              wordWrap: 'break-word'
            }}>{data.mainHeading}</div>
          </div>
        )}
        <div style={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '12px',
          display: 'inline-flex'
        }}>
          {data.sections.map((section, index) => (
            <div key={index} data-divider="true" data-module="true" style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '8px',
              display: 'flex'
            }}>
              <div style={{
                alignSelf: 'stretch',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '4px',
                display: 'flex'
              }}>
                <div style={{
                  alignSelf: 'stretch',
                  color: '#A6A6A6',
                  fontSize: '18px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '700',
                  lineHeight: '19.80px',
                  wordWrap: 'break-word'
                }}>{section.category}</div>
                <div style={{
                  alignSelf: 'stretch',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '8px',
                  display: 'flex'
                }}>
                  <div style={{
                    alignSelf: 'stretch',
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: '510',
                    lineHeight: '22px',
                    wordWrap: 'break-word'
                  }}>{section.title}</div>
                </div>
                {section.value && (
                  <div style={{
                    alignSelf: 'stretch',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    gap: '8px',
                    display: 'inline-flex'
                  }}>
                    <div data-sentiment={section.positive ? "Positive" : "Negative"} style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: '10px',
                      display: 'inline-flex'
                    }}>
                      <div style={{
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        color: section.positive ? '#48FF9B' : '#FF4D4D',
                        fontSize: '18px',
                        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: '700',
                        lineHeight: '22px',
                        wordWrap: 'break-word',
                        whiteSpace: 'nowrap'
                      }}>{section.value}</div>
                    </div>
                  </div>
                )}
              </div>
              {/* Divider - show for all except last */}
              {index < data.sections.length - 1 && (
                <div style={{
                  alignSelf: 'stretch',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  display: 'flex'
                }}>
                  <div style={{
                    width: '100%',
                    height: 0,
                    borderTop: '1px solid rgba(255, 255, 255, 0.20)'
                  }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
