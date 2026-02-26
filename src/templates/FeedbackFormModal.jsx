import { useState } from 'react';
import '../components/agent.css';

export default function FeedbackFormModal({ data, onClose, onSubmit }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [detailedFeedback, setDetailedFeedback] = useState('');

  const options = data?.options || [
    "Accurate but need to modify approach",
    "Not applicable to our line",
    "Need more technical details"
  ];

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        selectedOption,
        detailedFeedback
      });
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#0a0a0a',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Fixed Handle */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '12px 0 8px',
        flexShrink: 0
      }}>
        <div style={{
          width: '36px',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px'
        }} />
      </div>

      {/* Header */}
      <div style={{
        padding: '24px 24px 16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h1 style={{
          color: '#FFFFFF',
          fontSize: '24px',
          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: '700',
          margin: 0,
          lineHeight: '28px'
        }}>
          {data?.title || "Feedback"}
        </h1>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto'
      }}>
        {/* Question */}
        <div style={{
          color: '#A6A6A6',
          fontSize: '16px',
          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: '400',
          fontStyle: 'italic',
          lineHeight: '20px'
        }}>
          {data?.question || "Not helpful? Please tell us why."}
        </div>

        {/* Radio Options */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelectedOption(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer'
              }}
            >
              {/* Radio Circle */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: `2px solid ${selectedOption === index ? '#31D4B6' : '#31D4B6'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}>
                {selectedOption === index && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#31D4B6'
                  }} />
                )}
              </div>
              
              {/* Option Text */}
              <span style={{
                color: '#FFFFFF',
                fontSize: '18px',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: '600',
                lineHeight: '22px'
              }}>
                {option}
              </span>
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={detailedFeedback}
          onChange={(e) => setDetailedFeedback(e.target.value)}
          placeholder="Detailed feedback (optional)"
          style={{
            width: '100%',
            minHeight: '180px',
            padding: '16px',
            background: '#1A1A1A',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: '400',
            lineHeight: '22px',
            resize: 'none',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Submit Button */}
      <div style={{
        padding: '16px 24px 32px',
        flexShrink: 0
      }}>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            height: '56px',
            background: '#FFFFFF',
            borderRadius: '40px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: '700',
            fontSize: '16px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#000000',
            textAlign: 'center'
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
