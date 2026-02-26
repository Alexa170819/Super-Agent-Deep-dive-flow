// Threshold Service
// Checks if insights cross configured thresholds

import { getThresholds } from '../data/thresholdConfig';

/**
 * Checks if an insight value crosses the configured thresholds
 * @param {Object} insight - The insight object with value and threshold info
 * @returns {boolean} - True if insight should trigger notification
 */
export const checkInsightThresholds = (insight) => {
  if (!insight || insight.value === undefined) {
    return false;
  }

  const threshold = getThresholds(
    insight.source,
    insight.sourceId,
    insight.category
  );

  if (!threshold) {
    // No threshold configured, don't notify
    return false;
  }

  const { minThreshold, maxThreshold } = threshold;
  const value = insight.value;

  // Check if value is below min threshold OR above max threshold
  const belowMin = minThreshold !== undefined && value < minThreshold;
  const aboveMax = maxThreshold !== undefined && value > maxThreshold;

  return belowMin || aboveMax;
};

/**
 * Determines if an insight should trigger a notification
 * @param {Object} insight - The insight object
 * @param {Object} threshold - The threshold configuration
 * @returns {boolean} - True if notification should be sent
 */
export const shouldNotify = (insight, threshold) => {
  if (!insight || !threshold || !threshold.enabled) {
    return false;
  }

  return checkInsightThresholds(insight);
};

/**
 * Gets the threshold configuration for a specific insight
 * @param {Object} insight - The insight object
 * @returns {Object|null} - The threshold configuration or null
 */
export const getThresholdForInsight = (insight) => {
  if (!insight) {
    return null;
  }

  return getThresholds(
    insight.source,
    insight.sourceId,
    insight.category
  );
};

/**
 * Evaluates multiple insights and returns those that qualify
 * @param {Array} insights - Array of insight objects
 * @returns {Array} - Array of insights that cross thresholds
 */
export const evaluateInsights = (insights) => {
  if (!Array.isArray(insights)) {
    return [];
  }

  return insights.filter((insight) => checkInsightThresholds(insight));
};
