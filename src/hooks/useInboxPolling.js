// Real-time Simulation Hook
// Simulates real-time updates by polling mock data
// In production, this would use WebSocket or SSE

import { useState, useEffect, useCallback } from 'react';
import { mockInsights } from '../data/inboxData';
import { evaluateInsights } from '../services/thresholdService';
import { addToInbox, getUnreadCount } from '../services/inboxService';

/**
 * Custom hook that simulates real-time insight monitoring
 * @param {number} interval - Polling interval in milliseconds (default: 10000 = 10 seconds)
 * @param {Function} onNewMessage - Callback when new message is added
 * @returns {Object} - { unreadCount, isPolling }
 */
export const useInboxPolling = (interval = 10000, onNewMessage = null) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPolling, setIsPolling] = useState(true);
  const [processedInsights, setProcessedInsights] = useState(new Set());

  // Check insights and add qualifying ones to inbox
  const checkAndProcessInsights = useCallback(() => {
    if (!isPolling) return;

    // Evaluate which insights cross thresholds
    const qualifyingInsights = evaluateInsights(mockInsights);

    // Process each qualifying insight
    qualifyingInsights.forEach((insight) => {
      // Only process if we haven't seen this insight before
      if (!processedInsights.has(insight.id)) {
        const message = addToInbox(insight);
        setProcessedInsights((prev) => new Set([...prev, insight.id]));

        // Notify callback if provided
        if (onNewMessage && message) {
          onNewMessage(message);
        }
      }
    });

    // Update unread count
    setUnreadCount(getUnreadCount());
  }, [isPolling, processedInsights, onNewMessage]);

  // Set up polling interval
  useEffect(() => {
    if (!isPolling) return;

    // Initial check
    checkAndProcessInsights();

    // Set up interval
    const pollInterval = setInterval(() => {
      checkAndProcessInsights();
    }, interval);

    return () => clearInterval(pollInterval);
  }, [interval, isPolling, checkAndProcessInsights]);

  // Manual trigger function
  const triggerCheck = useCallback(() => {
    checkAndProcessInsights();
  }, [checkAndProcessInsights]);

  return {
    unreadCount,
    isPolling,
    setIsPolling,
    triggerCheck,
  };
};
