import ModalHeader from '../components/ModalHeader';
import PlusCircleIcon from '../assets/PlusCircle.svg';
import ExclamationIcon from '../assets/ExclamationIcon.svg';
import '../components/agent.css';

export default function TRTAssessmentModal({ data, currentPage, totalPages }) {
  const getStatusIcon = (criterion) => {
    // Use iconType if provided, otherwise fallback to status
    const iconType = criterion.iconType || criterion.status;
    
    switch (iconType) {
      case 'success':
      case 'plus':
      case 'positive':
        return (
          <div data-type="plus" style={{
            alignSelf: 'stretch',
            height: '16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={PlusCircleIcon} 
              alt="Success" 
              style={{
                width: '16px',
                height: '16px'
              }}
            />
          </div>
        );
      case 'warning':
      case 'exclamation':
        return (
          <div data-type="exclamation" style={{
            alignSelf: 'stretch',
            height: '16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={ExclamationIcon} 
              alt="Warning" 
              style={{
                width: '16px',
                height: '16px'
              }}
            />
          </div>
        );
      case 'danger':
      case 'negative':
        return (
          <div data-type="danger" style={{
            alignSelf: 'stretch',
            height: '16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              background: '#FF4D4D',
              borderRadius: '4px'
            }} />
          </div>
        );
      case 'thunder':
      case 'thunder-blue':
        return (
          <div data-type="thunder-blue" style={{
            alignSelf: 'stretch',
            height: '16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0V8.79884H2.4V15.9979L8 6.39916H4.8L7.2 0H0Z" fill="url(#paint0_linear_thunder_blue)"/>
              <defs>
                <linearGradient id="paint0_linear_thunder_blue" x1="4" y1="15.9979" x2="4" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4BADE9"/>
                  <stop offset="1" stopColor="#224E69"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      case 'minus':
      case 'minus-red':
        return (
          <div data-type="minus-red" style={{
            alignSelf: 'stretch',
            height: '16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_minus_red)">
                <path d="M1.04021e-05 7.99187C0.00706817 3.57626 3.59947 -0.00704335 8.01057 1.03962e-05C12.4217 0.00706414 16.007 3.59742 16 8.00598C15.9929 12.4146 12.4005 15.9979 7.98943 15.9979C3.5783 15.9908 -0.00704737 12.4005 1.04021e-05 7.99187ZM14.6378 8.00598C14.6449 4.34511 11.6665 1.36843 8.00354 1.36138C4.34054 1.35433 1.36216 4.33101 1.3551 7.99187C1.34805 11.6528 4.32643 14.6295 7.98943 14.6365C11.6524 14.6436 14.6378 11.6598 14.6378 8.00598Z" fill="url(#paint0_linear_minus_red)"/>
                <path d="M4.17822 7.30273L11.8288 7.30977L11.8218 8.69238L4.17822 8.68535V7.30273Z" fill="url(#paint1_linear_minus_red)"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_minus_red" x1="8" y1="0" x2="8" y2="15.9979" gradientUnits="userSpaceOnUse">
                  <stop offset="0.8" stopColor="#FF3469"/>
                  <stop offset="1" stopColor="#FF3469"/>
                </linearGradient>
                <linearGradient id="paint1_linear_minus_red" x1="8.00353" y1="7.30273" x2="8.00353" y2="8.69238" gradientUnits="userSpaceOnUse">
                  <stop offset="0.8" stopColor="#FF3469"/>
                  <stop offset="1" stopColor="#FF3469"/>
                </linearGradient>
                <clipPath id="clip0_minus_red">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="scenario-page assessment-page" style={{
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
      <ModalHeader title={data.title} subtitle={data.subtitle} />
      
      {/* Content with padding */}
      <div style={{
        padding: '24px',
        paddingTop: '16px',
        flex: 1,
        overflowY: 'auto'
      }}>
        <div style={{
          alignSelf: 'stretch',
          height: '642px',
          maxHeight: '642px',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '32px',
          display: 'inline-flex'
        }}>
          <div style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '24px',
            display: 'flex'
          }}>
            {/* Description without icon */}
            <div data-additional-info="false" data-description="true" data-moduletitle="true" data-type="with icon" style={{
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '12px',
              display: 'inline-flex'
            }}>
              <div style={{
                flex: '1 1 0',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '4px',
                display: 'inline-flex'
              }}>
                <div style={{
                  alignSelf: 'stretch',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '16px',
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
                      color: '#FFFFFF',
                      fontSize: '20px',
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: '510',
                      lineHeight: '22px',
                      wordWrap: 'break-word'
                    }}>{data.description}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Criteria items with icons */}
            {data.criteria.map((criterion, index) => (
              <div key={index} data-additional-info="true" data-description="true" data-moduletitle="true" data-type="with icon" style={{
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '12px',
                display: 'inline-flex'
              }}>
                <div style={{
                  width: '16px',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '10px',
                  display: 'inline-flex'
                }}>
                  {getStatusIcon(criterion)}
                </div>
                <div style={{
                  flex: '1 1 0',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: '4px',
                  display: 'inline-flex'
                }}>
                  <div style={{
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: '16px',
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
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: '510',
                        lineHeight: '22px',
                        wordWrap: 'break-word'
                      }}>{criterion.title}</div>
                      <div style={{
                        alignSelf: 'stretch',
                        color: '#A6A6A6',
                        fontSize: '16px',
                        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: '510',
                        lineHeight: '19.20px',
                        wordWrap: 'break-word'
                      }}>{criterion.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
