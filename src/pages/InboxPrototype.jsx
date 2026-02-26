// Inbox Prototype Page
// Demonstrates the complete flow: insight generation → evaluation → inbox → notifications

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBanner from '../components/NotificationBanner';
import NotificationBadge from '../components/NotificationBadge';
import { useInbox } from '../contexts/InboxContext';
import { evaluateAndAddInsight } from '../hooks/useInsightEvaluation';
import { getMessages, clearInbox } from '../services/inboxService';
import { subscribeToNotifications, subscribeToBadge } from '../services/notificationService';

export default function InboxPrototype() {
  const navigate = useNavigate();
  const { unreadCount } = useInbox();
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('cfo-cash-optimizer');

  // Sample insights for testing
  const sampleInsights = [
    {
      id: 'insight-1',
      title: "Why is your data like an open bottle of Champagne?",
      category: '.pro',
      type: 'Chat',
      status: 'new-insight',
      value: 85, // Above threshold
      date: '31 Dec',
      countdownDays: 7,
      agentId: 'cfo-cash-optimizer',
    },
    {
      id: 'insight-2',
      title: "What happened in the global economy 1 second ago?",
      category: '.pro',
      type: 'Chat',
      status: 'new-insight',
      value: 88, // Above threshold
      date: '30 Dec',
      countdownDays: 6,
      agentId: 'cfo-cash-optimizer',
    },
    {
      id: 'insight-3',
      title: "Am I running fast just to stay in the same place?",
      category: '.pro',
      type: 'Chat',
      status: 'new-insight',
      value: 12, // Below threshold
      date: '29 Dec',
      countdownDays: 5,
      agentId: 'cfo-cash-optimizer',
    },
    {
      id: 'insight-4',
      title: "Slovenia sales growth led by Oncology +23.8% vs PY",
      category: '.fin',
      type: 'Story',
      status: 'please-check',
      value: 82, // Above threshold
      date: '5 Sept',
      author: 'Victor Hugo Rocha',
      tags: ['Expired'],
      agentId: 'cfo-cash-optimizer',
    },
    {
      id: 'insight-5',
      title: "Latest conferences",
      category: '.r&d',
      type: 'Story',
      status: 'amazing-result',
      value: 95, // Above threshold
      date: '20 Jun',
      author: 'Victor Hugo Rocha',
      tags: ['Expired'],
      agentId: 'shopfloor-optimizer',
    },
  ];

  useEffect(() => {
    // Subscribe to notifications
    const unsubscribeNotifications = subscribeToNotifications((message) => {
      setNotificationMessage(message);
    });

    // Subscribe to badge updates
    const unsubscribeBadge = subscribeToBadge((count) => {
      setBadgeCount(count);
    });

    // Load messages
    const loadMessages = () => {
      setMessages(getMessages());
    };
    loadMessages();

    const interval = setInterval(loadMessages, 2000);

    return () => {
      unsubscribeNotifications();
      unsubscribeBadge();
      clearInterval(interval);
    };
  }, []);

  const handleGenerateInsight = (insight) => {
    const message = evaluateAndAddInsight(insight, selectedAgent);
    if (message) {
      console.log('✅ Insight qualified and added to inbox:', message);
    } else {
      console.log('❌ Insight did not meet threshold criteria');
    }
    setMessages(getMessages());
  };

  const handleClearInbox = () => {
    if (window.confirm('Clear all messages from inbox?')) {
      clearInbox();
      setMessages([]);
      setNotificationMessage(null);
    }
  };

  const handleDismissNotification = () => {
    setNotificationMessage(null);
  };

  const handleGoToInbox = () => {
    navigate('/inbox');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        padding: '20px',
        color: '#FFFFFF',
        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Inbox Prototype</h1>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2a2a2a',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            Back to App
          </button>
        </div>
        <p style={{ color: '#A6A6A6', fontSize: '14px', margin: 0 }}>
          Complete flow demonstration: Generate insights → Evaluate thresholds → Add to inbox → Show notifications
        </p>
      </div>

      {/* Notification Banner */}
      <NotificationBanner 
        message={notificationMessage} 
        onDismiss={handleDismissNotification}
      />

      {/* Stats Dashboard */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '30px',
        }}
      >
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#A6A6A6', marginBottom: '8px' }}>Unread Count</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#48FF9B' }}>
            {unreadCount}
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#A6A6A6', marginBottom: '8px' }}>Total Messages</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF' }}>
            {messages.length}
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#A6A6A6', marginBottom: '8px' }}>Badge</div>
            <NotificationBadge count={badgeCount} onClick={handleGoToInbox} />
          </div>
        </div>
      </div>

      {/* Agent Selection */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#A6A6A6' }}>
          Select Agent:
        </label>
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          style={{
            padding: '10px 16px',
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '14px',
            minWidth: '200px',
          }}
        >
          <option value="cfo-cash-optimizer">CFO Cash Optimizer</option>
          <option value="shopfloor-optimizer">Shopfloor Optimizer</option>
          <option value="inventory-optimizer">Inventory Optimizer</option>
        </select>
      </div>

      {/* Sample Insights Generator */}
      <div
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '30px',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          Generate Sample Insights
        </h2>
        <p style={{ fontSize: '14px', color: '#A6A6A6', marginBottom: '20px' }}>
          Click on any insight below to evaluate it against thresholds and add to inbox if it qualifies.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '12px',
          }}
        >
          {sampleInsights.map((insight) => {
            const willQualify = insight.value > 90 || insight.value < 70;
            return (
              <button
                key={insight.id}
                onClick={() => handleGenerateInsight({ ...insight, agentId: selectedAgent })}
                style={{
                  padding: '16px',
                  backgroundColor: willQualify ? 'rgba(72, 255, 155, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${willQualify ? 'rgba(72, 255, 155, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '8px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = willQualify
                    ? 'rgba(72, 255, 155, 0.15)'
                    : 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = willQualify
                    ? 'rgba(72, 255, 155, 0.1)'
                    : 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      backgroundColor: '#2a2a2a',
                      borderRadius: '4px',
                    }}
                  >
                    {insight.category}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      backgroundColor: willQualify ? 'rgba(72, 255, 155, 0.2)' : 'rgba(255, 68, 68, 0.2)',
                      borderRadius: '4px',
                      color: willQualify ? '#48FF9B' : '#FF4444',
                    }}
                  >
                    Value: {insight.value}
                  </span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                  {insight.title}
                </div>
                <div style={{ fontSize: '12px', color: '#A6A6A6' }}>
                  {willQualify ? '✅ Will qualify' : '❌ Will not qualify'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
        <button
          onClick={handleGoToInbox}
          style={{
            padding: '12px 24px',
            backgroundColor: '#48FF9B',
            border: 'none',
            borderRadius: '8px',
            color: '#000000',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          View Inbox ({unreadCount} unread)
        </button>
        <button
          onClick={handleClearInbox}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2a2a2a',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Clear Inbox
        </button>
      </div>

      {/* Inbox Preview */}
      <div
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          Inbox Preview (Last 5 Messages)
        </h2>
        {messages.length === 0 ? (
          <p style={{ color: '#A6A6A6', fontSize: '14px' }}>
            No messages in inbox. Generate insights above to see them here.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.slice(0, 5).map((message) => (
              <div
                key={message.id}
                style={{
                  padding: '12px',
                  backgroundColor: message.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(72, 255, 155, 0.05)',
                  border: `1px solid ${message.read ? 'rgba(255, 255, 255, 0.05)' : 'rgba(72, 255, 155, 0.2)'}`,
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#2a2a2a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                    }}
                  >
                    {message.category}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                      {message.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#A6A6A6' }}>
                      {message.status} • {message.type} • {message.date}
                      {!message.read && (
                        <span style={{ marginLeft: '8px', color: '#FF4444' }}>● Unread</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Flow Diagram */}
      <div
        style={{
          marginTop: '30px',
          padding: '24px',
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          Flow Diagram
        </h2>
        <div style={{ fontSize: '14px', color: '#A6A6A6', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#48FF9B' }}>1. Generate Insight</strong> → Click on sample insight above
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#48FF9B' }}>2. Evaluate Threshold</strong> → insightEvaluator checks if value meets criteria
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#48FF9B' }}>3. Add to Inbox</strong> → If qualified, message added to inboxService (localStorage)
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#48FF9B' }}>4. Trigger Notification</strong> → notificationService shows banner and updates badge
          </div>
          <div>
            <strong style={{ color: '#48FF9B' }}>5. View Inbox</strong> → User can view all messages in inbox UI
          </div>
        </div>
      </div>
    </div>
  );
}
