// Inbox Context
// Provides global inbox state and polling

import { createContext, useContext, useState, useEffect } from 'react';
import { getUnreadCount } from '../services/inboxService';
import { subscribeToBadge } from '../services/notificationService';

const InboxContext = createContext();

export const useInbox = () => {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error('useInbox must be used within InboxProvider');
  }
  return context;
};

export const InboxProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  // Update unread count periodically
  useEffect(() => {
    const updateCount = () => {
      setUnreadCount(getUnreadCount());
    };

    // Initial update
    updateCount();
    
    // Update every 2 seconds to stay in sync
    const interval = setInterval(updateCount, 2000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to badge updates from notification service
  useEffect(() => {
    const unsubscribe = subscribeToBadge((count) => {
      setUnreadCount(count);
    });

    return unsubscribe;
  }, []);

  return (
    <InboxContext.Provider value={{ unreadCount }}>
      {children}
    </InboxContext.Provider>
  );
};
