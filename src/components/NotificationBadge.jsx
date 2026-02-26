// Notification Badge Component
// Displays unread message count

export default function NotificationBadge({ count, onClick }) {
  if (count === 0) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          minWidth: '20px',
          height: '20px',
          borderRadius: '10px',
          backgroundColor: '#FF4444',
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 6px',
          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
          boxShadow: '0 2px 8px rgba(255, 68, 68, 0.4)',
        }}
      >
        {count > 99 ? '99+' : count}
      </div>
    </div>
  );
}
