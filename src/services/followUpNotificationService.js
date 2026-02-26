/**
 * Follow-up Notification Service
 * Checks for decisions that need impact updates and generates notifications
 * Integrates with existing notification system
 */

import { checkAndGenerateImpactUpdates, getUnreadImpactUpdatesCount as getUnreadCount } from './impactUpdateService';
import { notifyNewMessage } from './notificationService';
import { addMessage } from './inboxService';

/**
 * Check for new impact updates and generate notifications
 * @param {string} userId - User identifier
 * @param {string} role - User role
 * @returns {Array} Array of newly generated impact updates
 */
export const checkForImpactUpdates = (userId = 'user-1', role = null) => {
  // Check and generate impact updates for decisions that are 2+ weeks old
  const newlyGenerated = checkAndGenerateImpactUpdates(userId, role);
  
  // Create notifications for new updates
  newlyGenerated.forEach(update => {
    const notification = {
      id: `impact-update-${update.id}`,
      title: `Impact Update: ${update.title}`,
      message: `Your decision from ${update.daysElapsed} days ago has results. ${update.comparison?.status === 'exceeded' ? 'It exceeded expectations!' : update.comparison?.status === 'below' ? 'Results were below expectations.' : 'It met expectations.'}`,
      type: 'impact-update',
      updateId: update.id,
      category: update.category || '.pro'
    };
    
    // Add to inbox
    const inboxMessage = addMessage({
      id: notification.id,
      title: notification.title,
      content: notification.message,
      category: notification.category,
      type: 'Impact Update',
      status: 'new-insight',
      agentId: 'system',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      insightData: { updateId: update.id, type: 'impact-update' }
    });
    
    // Trigger notification
    notifyNewMessage(inboxMessage);
  });
  
  return newlyGenerated;
};

/**
 * Get unread impact updates count
 * @param {string} userId - User identifier
 * @param {string} role - User role
 * @returns {number} Count of unread impact updates
 */
export const getUnreadImpactUpdatesCount = (userId = 'user-1', role = null) => {
  return getUnreadCount(userId, role);
};

/**
 * Poll for impact updates (call this periodically)
 * @param {string} userId - User identifier
 * @param {string} role - User role
 * @param {number} intervalMs - Polling interval in milliseconds (default: 5 minutes)
 * @returns {Function} Cleanup function to stop polling
 */
export const startImpactUpdatePolling = (userId = 'user-1', role = null, intervalMs = 5 * 60 * 1000) => {
  // Check immediately
  checkForImpactUpdates(userId, role);
  
  // Then check periodically
  const interval = setInterval(() => {
    checkForImpactUpdates(userId, role);
  }, intervalMs);
  
  // Return cleanup function
  return () => clearInterval(interval);
};
