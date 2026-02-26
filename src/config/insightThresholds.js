// Insight Threshold Configuration
// Configurable per agent or global defaults

export const defaultThresholds = {
  metricThresholds: {
    above: 100,
    below: 80,
  },
  severityLevels: ['high'],
  timeSensitive: true,
  minScore: 75,
};

export const agentThresholds = {
  'cfo-cash-optimizer': {
    metricThresholds: {
      above: 90,
      below: 70,
    },
    severityLevels: ['high', 'medium'],
    timeSensitive: true,
    minScore: 70,
  },
  'shopfloor-optimizer': {
    metricThresholds: {
      above: 85,
      below: 75,
    },
    severityLevels: ['high'],
    timeSensitive: true,
    minScore: 80,
  },
  'inventory-optimizer': {
    metricThresholds: {
      above: 95,
      below: 65,
    },
    severityLevels: ['high', 'medium'],
    timeSensitive: false,
    minScore: 75,
  },
};

/**
 * Get thresholds for a specific agent
 * @param {string} agentId - Agent identifier
 * @returns {Object} Threshold configuration
 */
export const getThresholdsForAgent = (agentId) => {
  return agentThresholds[agentId] || defaultThresholds;
};
