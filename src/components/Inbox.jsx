// Inbox Component
// Main container for the inbox feature

import { useState, useEffect } from 'react';
import InboxTemplate from '../templates/InboxTemplate';
import NotificationBanner from './NotificationBanner';
import { useInbox } from '../contexts/InboxContext';
import { subscribeToNotifications } from '../services/notificationService';

export default function Inbox({ onClose }) {
  const { unreadCount } = useInbox();
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    // Subscribe to notifications
    const unsubscribe = subscribeToNotifications((message) => {
      setNotificationMessage(message);
    });

    return unsubscribe;
  }, []);

  const handleDismissNotification = () => {
    setNotificationMessage(null);
  };

  return (
    <>
      <NotificationBanner 
        message={notificationMessage} 
        onDismiss={handleDismissNotification}
      />
      <InboxTemplate data={{ unreadCount }} onClose={onClose} />
    </>
  );
}
