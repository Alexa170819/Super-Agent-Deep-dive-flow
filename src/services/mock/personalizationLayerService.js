/**
 * Personalization Layer Mock Service
 * Role-based mapping, contextual awareness, and scoring models
 * Filters and scores stories for specific users based on their role
 */

/**
 * Role-based interest mapping
 * Defines what types of insights each role cares about
 */
const roleInterests = {
  cfo: {
    domains: ['finance', 'spend'],
    types: ['budget_variance', 'cash_flow', 'working_capital', 'vendor_anomaly', 'category_overspend', 'country_performance', 'regional_opportunity'],
    kpis: ['FCF', 'DSO', 'DPO', 'DIO', 'EBITDA', 'Working Capital', 'Revenue', 'Conversion', 'Outlet Exposure'],
    authority: 'high', // Can influence budget, pricing, cash flow
    scope: 'company-wide'
  },
  'financial-manager': {
    domains: ['finance', 'spend'],
    types: ['budget_variance', 'category_overspend', 'vendor_anomaly'],
    kpis: ['Budget Variance', 'Spend Efficiency'],
    authority: 'medium', // Can influence department budgets
    scope: 'department'
  },
  'regional-manager': {
    domains: ['marketing', 'finance'],
    types: ['lead_generation', 'budget_variance'],
    kpis: ['Lead Generation', 'Regional Revenue'],
    authority: 'medium',
    scope: 'regional'
  },
  'marketing-director': {
    domains: ['marketing'],
    types: ['lead_generation', 'spend_efficiency'],
    kpis: ['Lead Generation', 'ROI', 'Conversion Rate'],
    authority: 'high',
    scope: 'department'
  }
};

/**
 * Calculate relevance score based on role and story
 * @param {Object} story - Story object from Content Layer
 * @param {string} role - User role
 * @returns {number} Relevance score (0-1)
 */
const calculateRelevanceScore = (story, role) => {
  const roleConfig = roleInterests[role] || roleInterests.cfo;
  let score = 0;
  let factors = 0;
  
  // Domain match
  if (roleConfig.domains.includes(story.domain)) {
    score += 0.4;
    factors++;
  }
  
  // Type match
  if (roleConfig.types.includes(story.type)) {
    score += 0.4;
    factors++;
  }
  
  // KPI relevance (check if story mentions relevant KPIs)
  const storyKpis = story.impact?.kpi || '';
  const hasRelevantKpi = roleConfig.kpis.some(kpi => 
    storyKpis.toLowerCase().includes(kpi.toLowerCase())
  );
  if (hasRelevantKpi) {
    score += 0.2;
    factors++;
  }
  
  // Normalize if no factors matched
  if (factors === 0) {
    return 0.3; // Base relevance for unmatched items
  }
  
  return Math.min(score, 1.0);
};

/**
 * Calculate impact score
 * @param {Object} story - Story object
 * @returns {number} Impact score (0-1)
 */
const calculateImpactScore = (story) => {
  let score = 0;
  
  // Anomaly score contributes to impact
  score += story.anomalyScore * 0.4;
  
  // Risk level contributes
  const riskScores = { high: 0.4, medium: 0.2, low: 0.1 };
  score += riskScores[story.impact?.risk] || 0.2;
  
  // Financial magnitude (normalized)
  const financialText = story.impact?.financial || '';
  const financialMatch = financialText.match(/\$?([\d.]+)([MK])/);
  if (financialMatch) {
    const value = parseFloat(financialMatch[1]);
    const unit = financialMatch[2];
    let normalizedValue = value;
    if (unit === 'M') normalizedValue = value * 1000;
    // Normalize: $10M+ = 1.0, $1M = 0.5, $100K = 0.2
    score += Math.min(normalizedValue / 10000, 1.0) * 0.2;
  }
  
  return Math.min(score, 1.0);
};

/**
 * Calculate urgency score based on time decay and time to act
 * @param {Object} story - Story object
 * @returns {number} Urgency score (0-1)
 */
const calculateUrgencyScore = (story) => {
  let score = 0;
  
  // Time decay: newer stories are more urgent
  const storyDate = new Date(story.timestamp);
  const now = new Date();
  const hoursAgo = (now - storyDate) / (1000 * 60 * 60);
  
  // Decay: 0-24 hours = 1.0, 24-48 hours = 0.8, 48-72 hours = 0.6, etc.
  const timeDecay = Math.max(0, 1.0 - (hoursAgo / 120)); // Full decay over 5 days
  score += timeDecay * 0.5;
  
  // Risk level affects urgency
  const riskScores = { high: 0.4, medium: 0.2, low: 0.1 };
  score += riskScores[story.impact?.risk] || 0.2;
  
  // Type-specific urgency
  const urgentTypes = ['cash_flow', 'vendor_anomaly', 'project_delay'];
  if (urgentTypes.includes(story.type)) {
    score += 0.1;
  }
  
  return Math.min(score, 1.0);
};

/**
 * Get personalization context for a role
 * @param {string} role - User role
 * @returns {Object} Personalization context
 */
const getPersonalizationContext = (role) => {
  const roleConfig = roleInterests[role] || roleInterests.cfo;
  return {
    role,
    authority: roleConfig.authority,
    kpiRelevance: 'high', // Simplified
    scopeMatch: roleConfig.scope
  };
};

/**
 * Score and filter stories for a specific role
 * @param {Array} stories - Array of story objects from Content Layer
 * @param {string} role - User role
 * @returns {Array} Scored and filtered stories
 */
export const personalizeStories = (stories, role = 'cfo') => {
  if (!stories || stories.length === 0) {
    return [];
  }
  
  const roleConfig = roleInterests[role] || roleInterests.cfo;
  const personalizationContext = getPersonalizationContext(role);
  
  // Score each story
  const scoredStories = stories.map(story => {
    // Boost Kering stories - give them maximum scores to ensure they appear first
    if (story.storyId?.includes('kering')) {
      return {
        ...story,
        scores: {
          relevance: 1.0,
          impact: 1.0,
          urgency: 1.0
        },
        personalizationContext,
        finalScore: 1.0
      };
    }
    
    // Regular scoring for other stories
    const relevance = calculateRelevanceScore(story, role);
    const impact = calculateImpactScore(story);
    const urgency = calculateUrgencyScore(story);
    
    // Weighted final score
    const finalScore = (relevance * 0.4) + (impact * 0.35) + (urgency * 0.25);
    
    return {
      ...story,
      scores: {
        relevance: Math.round(relevance * 100) / 100,
        impact: Math.round(impact * 100) / 100,
        urgency: Math.round(urgency * 100) / 100
      },
      personalizationContext,
      finalScore: Math.round(finalScore * 100) / 100
    };
  });
  
  // Filter by minimum relevance threshold
  const minRelevance = 0.3;
  const filtered = scoredStories.filter(story => 
    story.scores.relevance >= minRelevance
  );
  
  // Prioritize Kering stories (ensure they appear in top results)
  const keringStories = filtered.filter(s => s.storyId?.includes('kering'));
  const otherStories = filtered.filter(s => !s.storyId?.includes('kering'));
  
  // Sort by final score (descending)
  keringStories.sort((a, b) => b.finalScore - a.finalScore);
  otherStories.sort((a, b) => b.finalScore - a.finalScore);
  
  // Return Kering stories first, then others
  return [...keringStories, ...otherStories];
};

/**
 * Get top N stories for a role
 * @param {Array} stories - Array of story objects
 * @param {string} role - User role
 * @param {number} limit - Maximum number of stories to return
 * @returns {Array} Top N personalized stories
 */
export const getTopStories = (stories, role = 'cfo', limit = 10) => {
  const personalized = personalizeStories(stories, role);
  return personalized.slice(0, limit);
};

/**
 * Filter stories by category/filter type
 * @param {Array} stories - Scored stories
 * @param {string} filterType - Filter type ('for-you', 'upside', 'downside', 'portfolio')
 * @returns {Array} Filtered stories
 */
export const filterStoriesByType = (stories, filterType = 'for-you') => {
  if (filterType === 'for-you') {
    return stories; // Already personalized
  }
  
  if (filterType === 'upside') {
    // Stories with positive impact or opportunities
    return stories.filter(story => 
      story.type === 'lead_generation' || 
      story.impact?.risk === 'low' ||
      story.scores?.impact > 0.6
    );
  }
  
  if (filterType === 'downside') {
    // Stories with risks or negative impact
    return stories.filter(story => 
      story.impact?.risk === 'high' ||
      story.type === 'budget_variance' ||
      story.type === 'vendor_anomaly' ||
      story.type === 'project_delay'
    );
  }
  
  if (filterType === 'portfolio') {
    // All stories across all domains
    return stories;
  }
  
  return stories;
};
