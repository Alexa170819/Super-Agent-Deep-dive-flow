// Mock Insight Data
// These represent insights from the knowledge system and agents

export const mockInsights = [
  {
    id: 'insight-1',
    title: "Why is your data like an open bottle of Champagne?",
    category: '.pro',
    type: 'Chat',
    source: 'knowledge-system',
    sourceId: null,
    value: 85, // Above threshold
    threshold: {
      min: 20,
      max: 80,
      source: 'knowledge-system-db'
    },
    metadata: {
      status: 'New Insight',
      author: null,
      date: '31 Dec',
      expired: false,
      countdown: 'Day 7'
    }
  },
  {
    id: 'insight-2',
    title: "What happened in the global economy 1 second ago?",
    category: '.pro',
    type: 'Chat',
    source: 'knowledge-system',
    sourceId: null,
    value: 88, // Above threshold
    threshold: {
      min: 20,
      max: 80,
      source: 'knowledge-system-db'
    },
    metadata: {
      status: 'New Insight',
      author: null,
      date: '30 Dec',
      expired: false,
      countdown: 'Day 6'
    }
  },
  {
    id: 'insight-3',
    title: "Am I running fast just to stay in the same place?",
    category: '.pro',
    type: 'Chat',
    source: 'knowledge-system',
    sourceId: null,
    value: 12, // Below threshold
    threshold: {
      min: 20,
      max: 80,
      source: 'knowledge-system-db'
    },
    metadata: {
      status: 'New Insight',
      author: null,
      date: '29 Dec',
      expired: false,
      countdown: 'Day 5'
    }
  },
  {
    id: 'insight-4',
    title: "Who is the most dangerous animal in the boardroom?",
    category: '.pro',
    type: 'Chat',
    source: 'knowledge-system',
    sourceId: null,
    value: 8, // Below threshold
    threshold: {
      min: 20,
      max: 80,
      source: 'knowledge-system-db'
    },
    metadata: {
      status: 'New Insight',
      author: null,
      date: '28 Dec',
      expired: false,
      countdown: 'Day 4'
    }
  },
  {
    id: 'insight-5',
    title: "Slovenia sales growth led by Oncology +23.8% vs PY",
    category: '.fin',
    type: 'Story',
    source: 'agent',
    sourceId: 'cfo-cash-optimizer',
    value: 82, // Above threshold
    threshold: {
      min: 15,
      max: 75,
      source: 'agent-db'
    },
    metadata: {
      status: 'Please check',
      author: 'Victor Hugo Rocha',
      date: '5 Sept',
      expired: true
    }
  },
  {
    id: 'insight-6',
    title: "Latest conferences",
    category: '.r&d',
    type: 'Story',
    source: 'knowledge-system',
    sourceId: null,
    value: 95, // Above threshold
    threshold: {
      min: 10,
      max: 90,
      source: 'knowledge-system-db'
    },
    metadata: {
      status: 'Amazing result!',
      author: 'Victor Hugo Rocha',
      date: '20 Jun',
      expired: true
    }
  },
  {
    id: 'insight-7',
    title: "Czech Republic sales growth led by Neurology & Immunology...",
    category: '.fin',
    type: 'Story',
    source: 'agent',
    sourceId: 'cfo-cash-optimizer',
    value: 5, // Below threshold
    threshold: {
      min: 15,
      max: 75,
      source: 'agent-db'
    },
    metadata: {
      status: 'FYI',
      author: 'tenant.global.core',
      date: '14 Jul',
      expired: true
    }
  },
];

// Helper function to get status emoji/icon
export const getStatusIcon = (status) => {
  const statusMap = {
    'New Insight': '★',
    'Please check': '⚠️',
    'Amazing result!': '🚀',
    'FYI': '👀',
  };
  return statusMap[status] || '★';
};

// Helper function to format category display
export const formatCategory = (category) => {
  return category;
};
