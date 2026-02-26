// Notification Service
// Manages in-app notifications and badge counts

import { addMessage, getUnreadCount } from './inboxService';

let notificationListeners = [];
let badgeListeners = [];

/**
 * Subscribe to notification events
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export const subscribeToNotifications = (callback) => {
  notificationListeners.push(callback);
  return () => {
    notificationListeners = notificationListeners.filter(cb => cb !== callback);
  };
};

/**
 * Subscribe to badge count updates
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export const subscribeToBadge = (callback) => {
  badgeListeners.push(callback);
  return () => {
    badgeListeners = badgeListeners.filter(cb => cb !== callback);
  };
};

/**
 * Show notification banner
 * @param {Object} message - The inbox message
 */
export const showNotification = (message) => {
  // Notify all listeners
  notificationListeners.forEach(callback => {
    callback(message);
  });
};

/**
 * Update notification badge count
 * @param {number} count - Unread count
 */
export const updateBadge = (count) => {
  // Notify all badge listeners
  badgeListeners.forEach(callback => {
    callback(count);
  });
};

/**
 * Clear/dismiss notification
 */
export const clearNotification = () => {
  // Notify listeners to clear
  notificationListeners.forEach(callback => {
    callback(null);
  });
};

/**
 * Trigger notification when new message is added
 * @param {Object} message - The new inbox message
 */
export const notifyNewMessage = (message) => {
  showNotification(message);
  const unreadCount = getUnreadCount();
  updateBadge(unreadCount);
};
