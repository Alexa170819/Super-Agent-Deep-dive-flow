// Threshold Configuration
// Thresholds can come from agent DB or knowledge system DB

export const thresholdConfigs = [
  {
    id: 'threshold-1',
    source: 'knowledge-system',
    sourceId: null,
    category: '.pro',
    minThreshold: 20,
    maxThreshold: 80,
    enabled: true,
  },
  {
    id: 'threshold-2',
    source: 'agent',
    sourceId: 'cfo-cash-optimizer',
    category: '.fin',
    minThreshold: 15,
    maxThreshold: 75,
    enabled: true,
  },
  {
    id: 'threshold-3',
    source: 'knowledge-system',
    sourceId: null,
    category: '.r&d',
    minThreshold: 10,
    maxThreshold: 90,
    enabled: true,
  },
  {
    id: 'threshold-4',
    source: 'agent',
    sourceId: 'shopfloor-optimizer',
    category: '.pro',
    minThreshold: 25,
    maxThreshold: 85,
    enabled: true,
  },
];

// Helper function to get thresholds for a specific source and category
export const getThresholds = (source, sourceId, category) => {
  return thresholdConfigs.find(
    (config) =>
      config.source === source &&
      (sourceId ? config.sourceId === sourceId : config.sourceId === null) &&
      config.category === category &&
      config.enabled
  );
};

// Helper function to get all thresholds for a source
export const getThresholdsBySource = (source, sourceId = null) => {
  return thresholdConfigs.filter(
    (config) =>
      config.source === source &&
      (sourceId ? config.sourceId === sourceId : config.sourceId === null) &&
      config.enabled
  );
};
