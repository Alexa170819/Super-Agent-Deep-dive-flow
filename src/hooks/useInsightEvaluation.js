// Hook for evaluating insights and adding to inbox
// Integrates with agent orchestrators

import { useEffect } from 'react';
import { evaluateInsight } from '../services/insightEvaluator';
import { addMessage } from '../services/inboxService';
import { notifyNewMessage } from '../services/notificationService';

/**
 * Hook to evaluate and process insights from agent data
 * @param {Object} insightData - Insight data from agent
 * @param {string} agentId - Agent identifier
 * @param {boolean} enabled - Whether evaluation is enabled
 */
export const useInsightEvaluation = (insightData, agentId, enabled = true) => {
  useEffect(() => {
    if (!enabled || !insightData || !agentId) {
      return;
    }

    // Process insights based on data structure
    const processInsights = () => {
      let insights = [];

      // Handle different insight data structures
      if (Array.isArray(insightData)) {
        insights = insightData;
      } else if (insightData.sections && Array.isArray(insightData.sections)) {
        // Convert sections to insights
        insights = insightData.sections.map((section, index) => ({
          id: `insight-${agentId}-${index}`,
          title: section.title || section.content?.substring(0, 50) || 'New Insight',
          content: section.content || section.description,
          category: '.pro',
          type: 'Chat',
          status: 'new-insight',
          agentId,
        }));
      } else if (insightData.title || insightData.content) {
        // Single insight object
        insights = [{
          id: `insight-${agentId}-0`,
          ...insightData,
          agentId,
        }];
      }

      // Evaluate each insight
      insights.forEach((insight) => {
        if (evaluateInsight(insight, null)) {
          const message = addMessage(insight, agentId);
          notifyNewMessage(message);
        }
      });
    };

    processInsights();
  }, [insightData, agentId, enabled]);
};

/**
 * Evaluate a single insight object
 * @param {Object} insight - Insight object
 * @param {string} agentId - Agent identifier
 */
export const evaluateAndAddInsight = (insight, agentId) => {
  if (!insight || !agentId) {
    return null;
  }

  if (evaluateInsight(insight, null)) {
    const message = addMessage(insight, agentId);
    notifyNewMessage(message);
    return message;
  }

  return null;
};
