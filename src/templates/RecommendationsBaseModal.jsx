import { useState, useEffect } from 'react';
import '../components/agent.css';
import ModalHeader from '../components/ModalHeader';
import FeedbackFormModal from './FeedbackFormModal';
import { evaluateAndAddInsight } from '../hooks/useInsightEvaluation';

export default function RecommendationsBaseModal({ data, onClose, agentId }) {
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleFeedback = (type) => {
    if (type === 'no') {
      setShowFeedbackForm(true);
    } else {
      setFeedbackGiven(type);
      setShowToast(true);
    }
  };

  const handleFeedbackFormSubmit = () => {
    setShowFeedbackForm(false);
    setFeedbackGiven('no');
    setShowToast(true);
  };

  const handleFeedbackFormClose = () => {
    setShowFeedbackForm(false);
    setFeedbackGiven('no');
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleDismissToast = () => {
    setShowToast(false);
  };

  // Evaluate and add insight to inbox when modal is shown
  useEffect(() => {
    if (data && agentId) {
      // Convert modal data to insight format
      const insight = {
        id: `insight-${agentId}-${Date.now()}`,
        title: data.title || 'New Insight',
        content: data.sections?.map(s => s.content || s.description).join(' ') || '',
        category: '.pro',
        type: 'Chat',
        status: 'new-insight',
        agentId,
      };
      evaluateAndAddInsight(insight, agentId);
    }
  }, [data, agentId]);

  // Check if this is the new format with feedback
  const hasFeedback = data.feedbackQuestion !== undefined;

  // Show feedback form if "No" was clicked
  if (showFeedbackForm) {
    return (
      <FeedbackFormModal 
        data={{
          title: "Feedback",
          question: "Not helpful? Please tell us why.",
          options: [
            "Accurate but need to modify approach",
            "Not applicable to our line",
            "Need more technical details"
          ]
        }}
        onClose={handleFeedbackFormClose}
        onSubmit={handleFeedbackFormSubmit}
      />
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '100%',
      padding: '0px',
      paddingBottom: hasFeedback ? '0px' : '60px',
      overflowY: 'auto',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      position: 'relative'
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
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '24px',
          display: 'inline-flex'
        }}>
          {data.sections.map((section, index) => (
            <div key={index} style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '12px',
              display: 'flex'
            }}>
              {/* Section Title - Green for new format, grey for old */}
              <div style={{
                alignSelf: 'stretch',
                color: hasFeedback ? '#48FF9B' : '#A6A6A6',
                fontSize: hasFeedback ? '20px' : '18px',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: hasFeedback ? '500' : '700',
                lineHeight: hasFeedback ? '24px' : '19.80px',
                wordWrap: 'break-word'
              }}>{section.title}</div>

              {/* Section Content/Description */}
              {(section.content || section.description) && (
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
                    fontSize: '16px',
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: '510',
                    lineHeight: '22px',
                    wordWrap: 'break-word'
                  }}>{section.content || section.description}</div>
                </div>
              )}

              {/* Bullet Points */}
              {section.bullets && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '4px',
                  width: '100%'
                }}>
                  {section.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      {/* Bullet dot */}
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#48FF9B',
                        marginTop: '8px',
                        flexShrink: 0
                      }} />
                      {/* Bullet text */}
                      <div style={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: '400',
                        lineHeight: '22px'
                      }}>
                        {bullet.text && <span>{bullet.text}</span>}
                        {bullet.highlight && (
                          <span style={{ fontWeight: '700' }}>{bullet.highlight}</span>
                        )}
                        {bullet.suffix && <span>{bullet.suffix}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      {hasFeedback && (
        <div style={{
          padding: '16px 24px 32px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)'
        }}>
          {/* Question */}
          <div style={{
            color: '#A6A6A6',
            fontSize: '14px',
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: '400',
            lineHeight: '18px'
          }}>
            {data.feedbackQuestion}
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            {/* Yes Button */}
            <button
              onClick={() => handleFeedback('yes')}
              style={{
                flex: 1,
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: feedbackGiven === 'yes' ? '#FFFFFF' : '#2A2A2A',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Thumbs up icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" 
                  stroke={feedbackGiven === 'yes' ? '#000000' : '#FFFFFF'}
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{
                color: feedbackGiven === 'yes' ? '#000000' : '#FFFFFF',
                fontSize: '16px',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: '600'
              }}>
                Yes
              </span>
            </button>

            {/* No Button */}
            <button
              onClick={() => handleFeedback('no')}
              style={{
                flex: 1,
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: feedbackGiven === 'no' ? '#FFFFFF' : '#2A2A2A',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Thumbs down icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M17 2V13M22 11V4C22 2.89543 21.1046 2 20 2H6.57385C5.09302 2 3.83377 3.08034 3.60858 4.54379L2.53168 11.5438C2.25212 13.3611 3.65817 15 5.49693 15H9C9.55228 15 10 15.4477 10 16V19.5342C10 20.896 11.104 22 12.4658 22C12.7907 22 13.085 21.8087 13.2169 21.5119L16.7361 13.5939C16.8966 13.2327 17.2547 13 17.6499 13H20C21.1046 13 22 12.1046 22 11Z" 
                  stroke={feedbackGiven === 'no' ? '#000000' : '#FFFFFF'}
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{
                color: feedbackGiven === 'no' ? '#000000' : '#FFFFFF',
                fontSize: '16px',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: '600'
              }}>
                No
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'absolute',
          bottom: hasFeedback ? '120px' : '80px',
          left: '24px',
          right: '24px',
          background: '#1A1A1A',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'slideUp 0.3s ease-out',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          zIndex: 100
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Checkmark icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M5 13L9 17L19 7" 
                stroke="#48FF9B" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span style={{
              color: '#FFFFFF',
              fontSize: '14px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '500'
            }}>
              Thanks for your feedback!
            </span>
          </div>
          {/* Close button */}
          <button
            onClick={handleDismissToast}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="#A6A6A6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
