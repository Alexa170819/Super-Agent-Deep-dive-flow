/**
 * Decision Layer Mock Service
 * Action/decision generation from stories, orchestration, and impact simulation
 * Generates top 3 actionable decisions with detailed cards
 */

/**
 * Generate recommended action based on story type
 */
const generateAction = (story) => {
  const actions = {
    budget_variance: {
      title: 'FREEZE MARKETING HIRING',
      action: 'Pause 3 planned Marketing hires until Q4',
      agentId: 'cfo-cash-optimizer',
      actions: ['IMPLEMENT FREEZE', 'See Details', 'Modify Plan']
    },
    cash_flow: {
      title: 'OPTIMIZE COLLECTION CYCLES',
      action: 'Implement accelerated payment terms and collection process improvements',
      agentId: 'cfo-cash-optimizer',
      actions: ['APPROVE EXPEDITE', 'See Details', 'Alternative Options']
    },
    working_capital: {
      title: 'IMPROVE WORKING CAPITAL RATIO',
      action: 'Optimize inventory levels and extend payables terms strategically',
      agentId: 'cfo-cash-optimizer',
      actions: ['IMPLEMENT PLAN', 'See Details', 'Modify Strategy']
    },
    lead_generation: {
      title: 'OPTIMIZE CAMPAIGN PERFORMANCE',
      action: 'Reallocate budget to high-performing channels and improve conversion funnel',
      agentId: 'marketing-optimizer',
      actions: ['APPROVE OPTIMIZATION', 'See Details', 'Alternative Channels']
    },
    vendor_anomaly: {
      title: 'REVIEW VENDOR CONTRACT',
      action: 'Audit vendor invoices and renegotiate terms to align with historical spend',
      agentId: 'spend-optimizer',
      actions: ['INITIATE AUDIT', 'See Details', 'Contact Vendor']
    },
    category_overspend: {
      title: 'REDUCE TRAVEL & ENTERTAINMENT SPEND',
      action: 'Implement travel policy restrictions and approval workflows for T&E',
      agentId: 'spend-optimizer',
      actions: ['IMPLEMENT POLICY', 'See Details', 'Modify Limits']
    },
    project_delay: {
      title: 'ACCELERATE PROJECT DELIVERY',
      action: 'Reallocate resources and adjust scope to meet original timeline',
      agentId: 'rnd-project-manager',
      actions: ['APPROVE ACCELERATION', 'See Details', 'Adjust Timeline']
    },
    sales_opportunity: {
      title: 'SCALE SUCCESSFUL STRATEGY',
      action: `Replicate the ${story.rawData?.metadata?.driver || story.rawData?.metrics?.category || 'successful'} strategy that drove $${((story.rawData?.metrics?.contributionGenerics || story.rawData?.metrics?.categoryContribution || 0) / 1000000).toFixed(1)}M growth in ${story.rawData?.metadata?.region || 'Switzerland'} to markets with similar characteristics`,
      agentId: 'cfo-cash-optimizer',
      actions: ['IMPLEMENT STRATEGY', 'See Details', 'Modify Plan']
    },
    country_performance: {
      title: story.rawData?.country === 'UK' ? 'UK STRATEGIC REVIEW' : 'COUNTRY PERFORMANCE REVIEW',
      action: story.rawData?.country === 'UK' 
        ? 'Launch a comprehensive review of Saint Laurent UK\'s performance, focusing on outlet strategy and clienteling investments.'
        : 'Review country performance and strategic positioning',
      agentId: 'cfo-strategic-advisor',
      actions: ['LAUNCH REVIEW', 'See Details', 'Delay Action']
    },
    kering_strategic_review: {
      title: 'UK STRATEGIC REVIEW',
      action: 'Launch a comprehensive review of Saint Laurent UK\'s performance, focusing on outlet strategy and clienteling investments.',
      agentId: 'cfo-strategic-advisor',
      actions: ['LAUNCH REVIEW', 'See Details', 'Delay Action']
    },
    regional_opportunity: {
      title: 'CAPITALIZE ON MOMENTUM',
      action: 'Scale successful H2 and January strategies across Western Europe to accelerate growth.',
      agentId: 'regional-growth-optimizer',
      actions: ['SCALE STRATEGY', 'See Details', 'Explore Markets']
    }
  };
  
  return actions[story.type] || {
    title: 'ADDRESS ANOMALY',
    action: 'Review and take action on detected anomaly',
    agentId: 'general-agent',
    actions: ['TAKE ACTION', 'See Details', 'Dismiss']
  };
};

/**
 * Generate expected outcome with impact simulation
 */
const generateExpectedOutcome = (story, action) => {
  const outcomes = {
    budget_variance: {
      impact: 'Save $520K in Q3/Q4 costs',
      confidence: 0.85,
      risk: '12% reduction in lead generation capacity',
      timeline: 'Immediate savings, 6-week impact visibility'
    },
    cash_flow: {
      impact: 'Improve FCF by $2.5M within 90 days',
      confidence: 0.80,
      risk: 'Potential customer relationship impact',
      timeline: '30-day implementation, 60-day impact visibility'
    },
    working_capital: {
      impact: 'Improve working capital by $3M within 6 months',
      confidence: 0.75,
      risk: 'Potential supplier relationship impact',
      timeline: '60-day implementation, 120-day impact visibility'
    },
    lead_generation: {
      impact: 'Increase lead generation by 600 leads in Q4',
      confidence: 0.70,
      risk: 'Budget reallocation may impact other channels',
      timeline: '2-week implementation, 4-week impact visibility'
    },
    vendor_anomaly: {
      impact: 'Reduce vendor spend by $200K annually',
      confidence: 0.85,
      risk: 'Potential service quality impact',
      timeline: '30-day audit, 60-day implementation'
    },
    category_overspend: {
      impact: 'Reduce T&E spend by $150K in Q4',
      confidence: 0.90,
      risk: 'Potential employee satisfaction impact',
      timeline: 'Immediate implementation, 30-day impact visibility'
    },
    project_delay: {
      impact: 'Recover 30 days of project timeline',
      confidence: 0.65,
      risk: 'Potential quality or scope impact',
      timeline: '2-week resource reallocation, 4-week impact visibility'
    },
    sales_opportunity: {
      impact: `Potential to unlock $${((story.rawData?.metrics?.growth || story.rawData?.metrics?.variance || 0) * 2 / 1000000).toFixed(0)}-${((story.rawData?.metrics?.growth || story.rawData?.metrics?.variance || 0) * 3 / 1000000).toFixed(0)}M additional revenue`,
      confidence: 0.85,
      risk: 'Market conditions may vary',
      timeline: '30-day market analysis, 60-day implementation'
    }
  };
  
  return outcomes[story.type] || {
    impact: 'Positive impact expected',
    confidence: 0.70,
    risk: 'Low risk',
    timeline: 'TBD'
  };
};

/**
 * Generate "why this matters" context
 */
const generateWhyThisMatters = (story, role) => {
  const contexts = {
    cfo: {
      budget_variance: 'Direct budget variance under your authority, affects EBITDA',
      cash_flow: 'Critical cash flow metric directly impacts company liquidity and valuation',
      working_capital: 'Working capital management is core to your financial stewardship',
      vendor_anomaly: 'Vendor spend anomalies directly impact cost management and P&L',
      category_overspend: 'Category overspend affects budget control and financial planning',
      lead_generation: 'Marketing efficiency impacts overall company growth and ROI',
      project_delay: 'R&D project delays impact product roadmap and competitive position',
      sales_opportunity: 'Revenue growth opportunities directly impact your P&L and company valuation'
    },
    'financial-manager': {
      budget_variance: 'Budget variance requires your attention for financial planning',
      category_overspend: 'Category overspend is within your oversight scope',
      vendor_anomaly: 'Vendor anomalies affect your department budget management'
    }
  };
  
  const roleContexts = contexts[role] || contexts.cfo;
  return roleContexts[story.type] || 'This insight is relevant to your role and responsibilities.';
};

/**
 * Check if user has authority to execute action
 */
const checkAuthority = (story, role) => {
  const authorityMap = {
    cfo: ['budget_variance', 'cash_flow', 'working_capital', 'vendor_anomaly', 'category_overspend', 'sales_opportunity'],
    'financial-manager': ['budget_variance', 'category_overspend', 'vendor_anomaly'],
    'regional-manager': ['lead_generation', 'budget_variance'],
    'marketing-director': ['lead_generation']
  };
  
  const authorizedTypes = authorityMap[role] || authorityMap.cfo;
  return authorizedTypes.includes(story.type);
};

/**
 * Detect conflicts between decisions
 */
const detectConflicts = (decisions) => {
  // Simple conflict detection: same agent, similar actions
  const conflicts = [];
  for (let i = 0; i < decisions.length; i++) {
    for (let j = i + 1; j < decisions.length; j++) {
      if (decisions[i].agentId === decisions[j].agentId) {
        conflicts.push({
          decision1: decisions[i].decisionId,
          decision2: decisions[j].decisionId,
          reason: 'Same agent may create resource conflicts'
        });
      }
    }
  }
  return conflicts;
};

/**
 * Generate decisions from scored stories
 * @param {Array} scoredStories - Stories with scores from Personalization Layer
 * @param {string} role - User role
 * @param {Object} options - Options for decision generation
 * @returns {Array} Top 3 decisions
 */
export const generateDecisions = (scoredStories, role = 'cfo', options = {}) => {
  const {
    minScore = 0.6,
    maxDecisions = 3,
    requireAuthority = true
  } = options;
  
  if (!scoredStories || scoredStories.length === 0) {
    return [];
  }
  
  // Separate Kering stories and others
  const keringStories = scoredStories.filter(s => s.storyId?.includes('kering'));
  const otherStories = scoredStories.filter(s => !s.storyId?.includes('kering'));
  
  // Filter others by minimum score
  let filteredOthers = otherStories.filter(story => story.finalScore >= minScore);
  
  // Filter by authority if required (for others, Kering stories always included)
  if (requireAuthority) {
    filteredOthers = filteredOthers.filter(story => checkAuthority(story, role));
  }
  
  // Sort by final score (descending)
  keringStories.sort((a, b) => b.finalScore - a.finalScore);
  filteredOthers.sort((a, b) => b.finalScore - a.finalScore);
  
  // Combine: Kering stories first, then others
  const candidates = [...keringStories, ...filteredOthers];
  
  // Take top N
  const topStories = candidates.slice(0, maxDecisions);
  
  // Generate decisions
  const decisions = topStories.map((story, index) => {
    const action = generateAction(story);
    const expectedOutcome = generateExpectedOutcome(story, action);
    const whyThisMatters = generateWhyThisMatters(story, role);
    
    // Determine urgency and impact levels
    const urgencyLevel = story.scores.urgency >= 0.7 ? 'high' : 
                        story.scores.urgency >= 0.5 ? 'medium' : 'low';
    const impactLevel = story.scores.impact >= 0.7 ? 'high' :
                       story.scores.impact >= 0.5 ? 'medium' : 'low';
    
    // Generate time-based urgency
    const timeToAct = urgencyLevel === 'high' ? '7 days' :
                     urgencyLevel === 'medium' ? '2 weeks' : '1 month';
    
    // Extract key insight from narrative (use narrative as key insight)
    const keyInsight = story.narrative;
    
    // Create primary action object
    const primaryAction = {
      title: action.title,
      description: action.action,
      impact: expectedOutcome.impact,
      confidence: expectedOutcome.confidence
    };
    
    return {
      decisionId: `decision-${index + 1}-${story.storyId}`,
      storyId: story.storyId,
      title: action.title,
      keyInsight: keyInsight,
      urgency: {
        level: urgencyLevel,
        timeToAct: timeToAct,
        reason: urgencyLevel === 'high' ? 'Market opportunity window closing' : 
                urgencyLevel === 'medium' ? 'Optimal timing for action' : 'Monitor and plan'
      },
      primaryAction: primaryAction,
      supportingContext: whyThisMatters,
      expectedOutcome,
      whyThisMatters,
      actions: action.actions,
      agentId: action.agentId,
      finalScore: story.finalScore,
      category: story.category,
      timestamp: story.timestamp,
      type: story.type, // Add story type for risk/opportunity detection
      impact: story.impact, // Add impact for risk/opportunity detection (includes opportunity flag)
      rawData: story.rawData // Preserve rawData (including Kering data) for card display
    };
  });
  
  // Check for conflicts
  const conflicts = detectConflicts(decisions);
  if (conflicts.length > 0) {
    console.warn('Decision conflicts detected:', conflicts);
  }
  
  return decisions;
};

/**
 * Get top decision (highest score)
 * @param {Array} scoredStories - Scored stories
 * @param {string} role - User role
 * @returns {Object|null} Top decision or null
 */
export const getTopDecision = (scoredStories, role = 'cfo') => {
  const decisions = generateDecisions(scoredStories, role, { maxDecisions: 1 });
  return decisions.length > 0 ? decisions[0] : null;
};
