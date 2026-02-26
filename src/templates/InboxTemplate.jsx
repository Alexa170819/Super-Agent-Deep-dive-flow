import { useState, useEffect } from 'react';
import '../components/agent.css';
import '../components/inbox.css';
import MobileStatusHeader from '../assets/mobilestatusheader_black.svg';
import CloseIcon from '../assets/CloseIcon.svg';
import ShareIcon from '../assets/share.svg';
import { getMessages, markAsRead } from '../services/inboxService';

// Helper to get status icon
const getStatusIcon = (status) => {
  const statusMap = {
    'new-insight': '★',
    'please-check': '⚠️',
    'amazing-result': '🚀',
    'fyi': '👀',
    'New Insight': '★',
    'Please check': '⚠️',
    'Amazing result!': '🚀',
    'FYI': '👀',
  };
  return statusMap[status] || '★';
};

export default function InboxTemplate({ data, onClose, onAction }) {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('Messages');

  useEffect(() => {
    // Load messages from inbox service
    const loadMessages = () => {
      const inboxMessages = getMessages();
      setMessages(inboxMessages);
    };

    loadMessages();
    // Refresh messages every 2 seconds
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMessageClick = (messageId) => {
    markAsRead(messageId);
    setMessages(getInboxMessages());
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  // Split messages into two columns
  const leftColumn = messages.filter((_, index) => index % 2 === 0);
  const rightColumn = messages.filter((_, index) => index % 2 === 1);

  const renderMessage = (message) => {
    const isUnread = !message.read;
    // Support both new and old status formats
    const status = message.status || message.metadata?.status || 'new-insight';
    const statusIcon = getStatusIcon(status);
    // Support both new and old countdown formats
    const countdown = message.countdownDays 
      ? `Countdown Day ${message.countdownDays}` 
      : message.countdown || message.metadata?.countdown;
    // Support both new tags array and old expired boolean
    const hasExpiredTag = message.tags?.includes('Expired') || message.expired;

    return (
      <div
        key={message.id}
        className="inbox-message-item"
        onClick={() => handleMessageClick(message.id)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '12px 0',
          cursor: 'pointer',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          {/* Category Icon */}
          <div
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
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
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              {message.category}
            </span>
            {/* Red dot indicator */}
            {isUnread && (
              <div
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#FF4444',
                  border: '2px solid #000000',
                }}
              />
            )}
          </div>

          {/* Message Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: '#FFFFFF',
                lineHeight: '1.4',
                marginBottom: '8px',
              }}
            >
              {message.title}
            </div>

            {/* Status and Metadata */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: '#A6A6A6',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              <span>{statusIcon} {status}</span>
              <span>•</span>
              <span>{message.type || 'Chat'}</span>
              {countdown && (
                <>
                  <span>•</span>
                  <span>{countdown}</span>
                </>
              )}
              {!countdown && message.author && (
                <>
                  <span>•</span>
                  <span>{message.author}</span>
                </>
              )}
              <span>•</span>
              <span>{message.date}</span>
            </div>

            {/* Tags (Expired, etc.) */}
            {hasExpiredTag && (
              <div
                style={{
                  marginTop: '8px',
                  display: 'inline-block',
                  padding: '2px 8px',
                  backgroundColor: '#2a2a2a',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#FFFFFF',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  marginRight: '4px',
                }}
              >
                Expired
              </div>
            )}
            {message.tags && message.tags.filter(tag => tag !== 'Expired').map((tag, idx) => (
              <div
                key={idx}
                style={{
                  marginTop: '8px',
                  display: 'inline-block',
                  padding: '2px 8px',
                  backgroundColor: '#2a2a2a',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#FFFFFF',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  marginRight: '4px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '375px',
        height: '812px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* Mobile Status Header */}
      <img
        src={MobileStatusHeader}
        alt="Mobile Status Header"
        style={{
          width: '375px',
          height: '48px',
          display: 'block',
          flexShrink: 0,
        }}
      />

      {/* Profile Section */}
      <div
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Profile Badge */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '2px solid rgba(255, 215, 0, 0.3)',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFD700',
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            V
          </div>
        </div>

        {/* User Name */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '24px',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: '1.2',
            }}
          >
            Alexa Cotiaux
          </div>
          {/* Upgrade Button */}
          <div
            style={{
              marginTop: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: '#A6A6A6',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            <span>💎</span>
            <span>Go Silver!</span>
            <span>→</span>
          </div>
        </div>

        {/* Close Button */}
        <div
          onClick={handleClose}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#2a2a2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <img
            src={CloseIcon}
            alt="Close"
            style={{
              width: '15px',
              height: '15px',
            }}
          />
        </div>
      </div>

      {/* Brand Logo */}
      <div
        style={{
          padding: '0 16px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <img
          src={ShareIcon}
          alt="Share"
          style={{
            width: '16px',
            height: '16px',
            opacity: 0.7,
          }}
        />
        <span
          style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          <span style={{ color: '#48FF9B' }}>aily</span>
          <span style={{ color: '#FFFFFF' }}>.box</span>
        </span>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          padding: '0 16px',
          display: 'flex',
          gap: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {['Messages', 'Library', 'Bookmarks', 'Decisions', 'Your Brain'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 0',
              background: 'none',
              border: 'none',
              color: activeTab === tab ? '#FFFFFF' : '#A6A6A6',
              fontSize: '14px',
              fontWeight: activeTab === tab ? 600 : 400,
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid #FFFFFF' : '2px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Messages Content */}
      <div
        className="inbox-messages-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {activeTab === 'Messages' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            {/* Left Column */}
            <div>{leftColumn.map(renderMessage)}</div>

            {/* Right Column */}
            <div>{rightColumn.map(renderMessage)}</div>
          </div>
        )}

        {activeTab !== 'Messages' && (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: '#A6A6A6',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {activeTab} coming soon
          </div>
        )}
      </div>
    </div>
  );
}
