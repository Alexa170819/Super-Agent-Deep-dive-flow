// Notification Banner Component
// Temporary banner notification when new insight arrives

import { useEffect, useState } from 'react';
import CloseIcon from '../assets/CloseIcon.svg';

export default function NotificationBanner({ message, onDismiss, autoDismissDelay = 5000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      
      // Auto-dismiss after delay
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDismissDelay);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, autoDismissDelay]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(() => onDismiss(), 300); // Wait for animation
    }
  };

  if (!message || !isVisible) {
    return null;
  }

  const getStatusIcon = (status) => {
    const statusMap = {
      'new-insight': '★',
      'please-check': '⚠️',
      'amazing-result': '🚀',
      'fyi': '👀',
    };
    return statusMap[status] || '★';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '375px',
        backgroundColor: '#1a1a1a',
        border: '1px solid rgba(72, 255, 155, 0.3)',
        borderRadius: '12px',
        padding: '16px',
        zIndex: 10000,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Category Icon */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#2a2a2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 500,
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {message.category || '.pro'}
          </span>
        </div>

        {/* Message Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '4px',
            }}
          >
            {getStatusIcon(message.status)} {message.title}
          </div>
          <div
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '12px',
              color: '#A6A6A6',
            }}
          >
            New insight added to your inbox
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <img
            src={CloseIcon}
            alt="Close"
            style={{
              width: '16px',
              height: '16px',
              opacity: 0.7,
            }}
          />
        </button>
      </div>
    </div>
  );
}
