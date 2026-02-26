// Insight Evaluation Service
// Evaluates insights against configurable thresholds

import { getThresholdsForAgent } from '../config/insightThresholds';

/**
 * Calculate composite score from multiple factors
 * @param {Object} insight - The insight object
 * @returns {number} Composite score (0-100)
 */
export const calculateScore = (insight) => {
  let score = 50; // Base score

  // Factor 1: Metric value (if available)
  if (insight.value !== undefined) {
    // Normalize value to 0-100 scale (assuming values are typically 0-100)
    const normalizedValue = Math.min(Math.max(insight.value, 0), 100);
    score += (normalizedValue - 50) * 0.3; // 30% weight
  }

  // Factor 2: Severity level
  const severityMap = { high: 30, medium: 15, low: 5 };
  if (insight.severity) {
    score += severityMap[insight.severity] || 0;
  }

  // Factor 3: Time sensitivity
  if (insight.timeSensitive) {
    score += 10;
  }

  // Factor 4: Category importance
  const categoryMap = { '.pro': 5, '.fin': 8, '.r&d': 6 };
  if (insight.category) {
    score += categoryMap[insight.category] || 0;
  }

  return Math.min(Math.max(Math.round(score), 0), 100);
};

/**
 * Evaluate if an insight meets threshold criteria
 * @param {Object} insight - The insight object
 * @param {Object} thresholds - Threshold configuration
 * @returns {boolean} True if insight qualifies for inbox
 */
export const evaluateInsight = (insight, thresholds = null) => {
  if (!insight) {
    return false;
  }

  // Get thresholds for agent or use defaults
  const agentId = insight.agentId || insight.sourceId;
  const config = thresholds || getThresholdsForAgent(agentId);

  // Check metric thresholds
  if (insight.value !== undefined) {
    const { above, below } = config.metricThresholds || {};
    
    if (above !== undefined && insight.value > above) {
      return true; // Above threshold
    }
    
    if (below !== undefined && insight.value < below) {
      return true; // Below threshold
    }
  }

  // Check severity levels
  if (config.severityLevels && insight.severity) {
    if (config.severityLevels.includes(insight.severity)) {
      return true;
    }
  }

  // Check time sensitivity
  if (config.timeSensitive && insight.timeSensitive) {
    return true;
  }

  // Check composite score
  const score = calculateScore(insight);
  if (config.minScore && score >= config.minScore) {
    return true;
  }

  return false;
};

/**
 * Evaluate multiple insights
 * @param {Array} insights - Array of insight objects
 * @param {Object} thresholds - Optional threshold configuration
 * @returns {Array} Array of qualifying insights
 */
export const evaluateInsights = (insights, thresholds = null) => {
  if (!Array.isArray(insights)) {
    return [];
  }

  return insights.filter((insight) => evaluateInsight(insight, thresholds));
};
