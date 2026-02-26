/**
 * Content/Contextual Layer Mock Service
 * Simulates anomaly/outlier detection and story generation from normalized data
 * This service generates insight-level models with anomaly scores and stories
 */

import { getAllNormalizedData } from '../../data/mock/normalizedData';
import { getKeringWEOpportunityData, getKeringUKData } from '../../data/mock/keringData';

/**
 * Calculate anomaly score based on variance and thresholds
 */
const calculateAnomalyScore = (data) => {
  let score = 0;
  
  if (data.type === 'budget_variance') {
    const variancePercent = Math.abs(data.metrics.variancePercent);
    score = Math.min(variancePercent / 20, 1.0); // Normalize to 0-1
  } else if (data.type === 'cash_flow') {
    const gap = Math.abs(data.metrics.gap);
    score = Math.min(gap / 10000000, 1.0); // Normalize based on $10M gap
  } else if (data.type === 'working_capital') {
    const gap = Math.abs(data.metrics.gap);
    score = Math.min(gap / 10000000, 1.0);
  } else if (data.type === 'lead_generation') {
    const gap = data.metrics.gap;
    score = Math.min(gap / 2000, 1.0);
  } else if (data.type === 'vendor_anomaly') {
    const variancePercent = Math.abs(data.metrics.variancePercent);
    score = Math.min(variancePercent / 100, 1.0);
  } else if (data.type === 'category_overspend') {
    const variancePercent = Math.abs(data.metrics.variancePercent);
    score = Math.min(variancePercent / 50, 1.0);
  } else if (data.type === 'project_delay') {
    const delayDays = data.metrics.delayDays;
    score = Math.min(delayDays / 60, 1.0);
  } else if (data.type === 'sales_opportunity') {
    // Higher variance = higher opportunity score
    const variancePercent = data.metrics.variancePercent;
    score = Math.min(variancePercent / 30, 1.0); // Normalize based on 30% growth
  }
  
  return Math.round(score * 100) / 100; // Round to 2 decimals
};

/**
 * Generate impact quantification
 */
const generateImpact = (data) => {
  const impact = {
    financial: null,
    kpi: null,
    risk: 'medium'
  };
  
  if (data.type === 'budget_variance') {
    impact.financial = `$${(Math.abs(data.metrics.variance) / 1000000).toFixed(1)}M budget variance`;
    impact.kpi = `Q3 budget variance: ${data.metrics.variancePercent}%`;
    impact.risk = data.metrics.variancePercent > 15 ? 'high' : 'medium';
  } else if (data.type === 'sales_opportunity') {
    const growth = data.metrics.growth || data.metrics.variance || 0;
    const growthPercent = data.metrics.growthPercent || data.metrics.variancePercent || 0;
    impact.financial = `+$${(growth / 1000000).toFixed(1)}M YTD sales growth`;
    impact.kpi = `Growth: ${growthPercent}%`;
    impact.risk = 'low'; // Opportunity is low risk
    impact.opportunity = true;
  } else if (data.type === 'cash_flow') {
    impact.financial = `$${(Math.abs(data.metrics.gap) / 1000000).toFixed(1)}M FCF gap`;
    impact.kpi = `DSO: ${data.metrics.dso} days, DPO: ${data.metrics.dpo} days`;
    impact.risk = 'high';
  } else if (data.type === 'working_capital') {
    impact.financial = `$${(Math.abs(data.metrics.gap) / 1000000).toFixed(1)}M working capital gap`;
    impact.kpi = `Current ratio: ${data.metrics.currentRatio} (target: ${data.metrics.targetRatio})`;
    impact.risk = 'medium';
  } else if (data.type === 'lead_generation') {
    impact.financial = `${data.metrics.gap} leads short of target`;
    impact.kpi = `Conversion rate: ${data.metrics.conversionRate}% (target: ${data.metrics.targetConversionRate}%)`;
    impact.risk = 'medium';
  } else if (data.type === 'vendor_anomaly') {
    impact.financial = `$${(Math.abs(data.metrics.variance) / 1000).toFixed(0)}K vendor spend anomaly`;
    impact.kpi = `Vendor spend variance: ${data.metrics.variancePercent}%`;
    impact.risk = data.metrics.variancePercent > 50 ? 'high' : 'medium';
  } else if (data.type === 'category_overspend') {
    impact.financial = `$${(Math.abs(data.metrics.variance) / 1000).toFixed(0)}K category overspend`;
    impact.kpi = `${data.metrics.category} variance: ${data.metrics.variancePercent}%`;
    impact.risk = data.metrics.variancePercent > 30 ? 'high' : 'medium';
  } else if (data.type === 'project_delay') {
    impact.financial = `$${(data.metrics.remaining / 1000000).toFixed(1)}M remaining budget at risk`;
    impact.kpi = `Project delay: ${data.metrics.delayDays} days`;
    impact.risk = data.metrics.delayDays > 30 ? 'high' : 'medium';
  }
  
  return impact;
};

/**
 * Generate narrative/story from data
 */
const generateNarrative = (data) => {
  const narratives = {
    budget_variance: (d) => 
      `${d.metadata.department} spend is ${d.metrics.variancePercent}% over Q3 budget ($${(d.metrics.actual / 1000000).toFixed(1)}M vs $${(d.metrics.budget / 1000000).toFixed(1)}M target). This variance is primarily driven by increased hiring and campaign spend.`,
    
    cash_flow: (d) =>
      `Free cash flow is $${(Math.abs(d.metrics.gap) / 1000000).toFixed(1)}M below target. DSO at ${d.metrics.dso} days is above target, while DPO at ${d.metrics.dpo} days could be optimized. Improving collection cycles could unlock significant cash.`,
    
    working_capital: (d) =>
      `Working capital is $${(Math.abs(d.metrics.gap) / 1000000).toFixed(1)}M below target. Current ratio of ${d.metrics.currentRatio} indicates potential liquidity constraints. Optimizing inventory and payables could improve the ratio to target ${d.metrics.targetRatio}.`,
    
    lead_generation: (d) =>
      `Lead generation is ${d.metrics.gap} leads short of Q3 target (${d.metrics.leads} vs ${d.metrics.target}). Conversion rate at ${d.metrics.conversionRate}% is below target of ${d.metrics.targetConversionRate}%. Campaign optimization could close the gap.`,
    
    vendor_anomaly: (d) =>
      `${d.metadata.vendor} spend shows ${d.metrics.variancePercent}% variance from average ($${(d.metrics.spend / 1000).toFixed(0)}K vs $${(d.metrics.avgSpend / 1000).toFixed(0)}K avg). Invoice count increased from ${d.metrics.avgInvoices} to ${d.metrics.invoices}, suggesting potential billing issues or scope expansion.`,
    
    category_overspend: (d) =>
      `${d.metrics.category} category is ${d.metrics.variancePercent}% over budget ($${(d.metrics.actual / 1000).toFixed(0)}K vs $${(d.metrics.budget / 1000).toFixed(0)}K). This overspend is impacting Q3 financial targets and may require immediate action.`,
    
    project_delay: (d) =>
      `${d.metadata.project} is delayed by ${d.metrics.delayDays} days (projected completion: ${new Date(d.metrics.projectedCompletion).toLocaleDateString()}). With $${(d.metrics.remaining / 1000000).toFixed(1)}M remaining budget, the delay increases cost risk and may impact product launch timeline.`,
    
    sales_opportunity: (d) => {
      const brand = d.metadata?.brand || '';
      const region = d.metadata?.region || 'Global';
      const entityName = brand ? `${brand} - ${region}` : region;
      const growth = d.metrics.growth || d.metrics.variance || 0;
      const growthPercent = d.metrics.growthPercent || d.metrics.variancePercent || 0;
      return `${entityName} shows the highest upside opportunity based on AI with +$${(growth / 1000000).toFixed(1)}M (${growthPercent}%) vs PY. Growth driven by $${((d.metrics.contributionGenerics || d.metrics.categoryContribution || 0) / 1000000).toFixed(1)}M contribution from ${d.metadata?.driver || d.metrics.category}.`;
    }
  };
  
  const narrativeFn = narratives[data.type];
  return narrativeFn ? narrativeFn(data) : 'Anomaly detected in data that requires attention.';
};

/**
 * Determine category tag based on domain
 */
const getCategory = (domain) => {
  const categoryMap = {
    finance: '.fin',
    marketing: '.mkt',
    rnd: '.rnd',
    spend: '.spend'
  };
  return categoryMap[domain] || '.pro';
};

/**
 * Generate title from data
 */
const generateTitle = (data) => {
  const titles = {
    budget_variance: `Budget Variance Detected - ${data.metadata.department}`,
    cash_flow: 'Cash Flow Gap Identified',
    working_capital: 'Working Capital Below Target',
    lead_generation: 'Lead Generation Shortfall',
    vendor_anomaly: `Vendor Anomaly - ${data.metadata.vendor}`,
    category_overspend: `${data.metrics.category} Overspend`,
    project_delay: `Project Delay - ${data.metadata.project}`,
    sales_opportunity: `Sales Opportunity - ${data.metadata.region || 'Switzerland'}`
  };
  
  return titles[data.type] || 'Anomaly Detected';
};

/**
 * Generate Kering Western Europe Opportunity story (for Step 1)
 */
const generateKeringWEOpportunityStory = () => {
  const keringData = getKeringWEOpportunityData();
  
  // Calculate anomaly score based on growth momentum
  const anomalyScore = Math.min((keringData.metrics.jan2026Growth + keringData.metrics.h2Growth) / 0.3, 1.0);
  
  // Generate impact
  const impact = {
    financial: `€${(keringData.metrics.revenue2025 / 1000000).toFixed(0)}M revenue (H2 +${(keringData.metrics.h2Growth * 100).toFixed(1)}%, Jan +${(keringData.metrics.jan2026Growth * 100).toFixed(1)}%)`,
    kpi: `January 2026: +${(keringData.metrics.jan2026Growth * 100).toFixed(1)}% (strongest start in region's history)`,
    risk: 'low',
    opportunity: true
  };
  
  // Generate narrative (teaser version for Step 1)
  const narrative = keringData.context.narrative;
  
  // Generate title
  const title = `Saint Laurent Western Europe: Momentum shift`;
  
  // Generate urgency
  const urgency = {
    level: keringData.metadata.urgency || 'medium',
    timeToAct: keringData.metadata.timeToAct || '2 weeks',
    reason: keringData.metadata.reason || 'Capitalize on recovery momentum'
  };
  
  // Generate primary action
  const primaryAction = {
    title: 'CAPITALIZE ON MOMENTUM',
    description: 'Scale successful H2 and January strategies across Western Europe',
    impact: `Potential to accelerate growth trajectory and exceed regional targets`,
    confidence: 0.80
  };
  
  return {
    storyId: keringData.id,
    title,
    category: '.fin',
    anomalyScore: Math.round(anomalyScore * 100) / 100,
    impact,
    narrative,
    timestamp: keringData.timestamp,
    domain: keringData.domain,
    type: keringData.type,
    rawData: keringData,
    keyInsight: narrative,
    urgency,
    primaryAction
  };
};

/**
 * Generate Kering UK story from Kering data (for deep dive)
 */
const generateKeringUKStory = () => {
  const keringData = getKeringUKData();
  
  // Calculate anomaly score based on decline severity
  const anomalyScore = Math.min(Math.abs(keringData.metrics.yoyChange2024) / 0.3, 1.0);
  
  // Generate impact
  const impact = {
    financial: `€${(keringData.metrics.revenue / 1000000).toFixed(1)}M revenue (${(keringData.metrics.yoyChange2024 * 100).toFixed(1)}% vs 2024)`,
    kpi: `${(keringData.metrics.conversionRate * 100).toFixed(2)}% conversion (lowest in region), ${(keringData.metrics.outletExposure * 100).toFixed(1)}% outlet exposure`,
    risk: 'high',
    opportunity: false
  };
  
  // Generate narrative - full story from report
  const narrative = keringData.context.narrative;
  
  // Generate title - matching report headline
  const title = `Saint Laurent UK: ${keringData.context.headline}`;
  
  // Generate urgency
  const urgency = {
    level: keringData.metadata.urgency || 'high',
    timeToAct: keringData.metadata.timeToAct || '7 days',
    reason: keringData.metadata.reason || 'Urgent strategic decision required'
  };
  
  // Generate primary action
  const primaryAction = {
    title: 'UK STRATEGIC REVIEW',
    description: keringData.decisionOptions.length > 0 
      ? `Choose between: ${keringData.decisionOptions.map(o => o.option).join(' or ')}`
      : 'Review UK market strategy and outlet footprint',
    impact: `Address ${(keringData.metrics.outletExposure * 100).toFixed(1)}% outlet exposure and ${(keringData.metrics.conversionRate * 100).toFixed(2)}% conversion rate`,
    confidence: 0.85
  };
  
  return {
    storyId: keringData.id,
    title,
    category: '.fin',
    anomalyScore: Math.round(anomalyScore * 100) / 100,
    impact,
    narrative,
    timestamp: keringData.timestamp,
    domain: keringData.domain,
    type: keringData.type,
    rawData: keringData, // Keep full Kering data
    keyInsight: narrative,
    urgency,
    primaryAction
  };
};

/**
 * Generate primary action for a story (simplified version for cards)
 */
const generatePrimaryActionForStory = (item) => {
  const actions = {
    budget_variance: {
      title: 'FREEZE MARKETING HIRING',
      description: 'Pause 3 planned Marketing hires until Q4'
    },
    cash_flow: {
      title: 'OPTIMIZE COLLECTION CYCLES',
      description: 'Implement accelerated payment terms and collection process improvements'
    },
    working_capital: {
      title: 'IMPROVE WORKING CAPITAL RATIO',
      description: 'Optimize inventory levels and extend payables terms strategically'
    },
    lead_generation: {
      title: 'OPTIMIZE CAMPAIGN PERFORMANCE',
      description: 'Reallocate budget to high-performing channels and improve conversion funnel'
    },
    vendor_anomaly: {
      title: 'REVIEW VENDOR CONTRACT',
      description: 'Audit vendor invoices and renegotiate terms to align with historical spend'
    },
    category_overspend: {
      title: 'REDUCE TRAVEL & ENTERTAINMENT SPEND',
      description: 'Implement travel policy restrictions and approval workflows for T&E'
    },
    project_delay: {
      title: 'ACCELERATE PROJECT DELIVERY',
      description: 'Reallocate resources and adjust scope to meet original timeline'
    },
    sales_opportunity: {
      title: 'SCALE SUCCESSFUL STRATEGY',
      description: `Replicate the ${item.metadata?.driver || 'successful'} strategy that drove $${((item.metrics?.contributionGenerics || item.metrics?.categoryContribution || 0) / 1000000).toFixed(1)}M growth in ${item.metadata?.region || 'Switzerland'} to markets with similar characteristics`
    }
  };
  
  return actions[item.type] || {
    title: 'ADDRESS ANOMALY',
    description: 'Review and take action on detected anomaly'
  };
};

export const generateStories = (data = null) => {
  const inputData = data || getAllNormalizedData();
  
  // Generate regular stories
  const regularStories = inputData.map(item => {
    const anomalyScore = calculateAnomalyScore(item);
    const impact = generateImpact(item);
    const narrative = generateNarrative(item);
    const category = getCategory(item.domain);
    const title = generateTitle(item);
    
    // Add fields for card display
    const keyInsight = narrative; // Use narrative as key insight
    const urgency = {
      level: item.metadata?.urgency || (impact?.risk === 'high' ? 'high' : impact?.risk === 'medium' ? 'medium' : 'low'),
      timeToAct: item.metadata?.timeToAct || (impact?.risk === 'high' ? '7 days' : impact?.risk === 'medium' ? '2 weeks' : '1 month')
    };
    const primaryAction = generatePrimaryActionForStory(item);
    
    return {
      storyId: item.id,
      title,
      category,
      anomalyScore,
      impact,
      narrative,
      timestamp: item.timestamp,
      domain: item.domain,
      type: item.type,
      rawData: item, // Keep reference to original data
      keyInsight, // Add for card display
      urgency, // Add for card display
      primaryAction // Add for card display
    };
  });
  
  // Add Kering stories (UK Risk story first for Step 1)
  const keringUKStory = generateKeringUKStory();
  const keringWEOpportunity = generateKeringWEOpportunityStory();
  
  // Return combined stories (UK Risk story first for priority in My Agent)
  return [keringUKStory, keringWEOpportunity, ...regularStories];
};

/**
 * Get stories filtered by minimum anomaly score
 * @param {number} minScore - Minimum anomaly score (0-1)
 * @returns {Array} Filtered stories
 */
export const getStoriesByAnomalyScore = (minScore = 0.5) => {
  const allStories = generateStories();
  return allStories.filter(story => story.anomalyScore >= minScore);
};

/**
 * Get stories by domain
 * @param {string} domain - Domain name (finance, marketing, rnd, spend)
 * @returns {Array} Filtered stories
 */
export const getStoriesByDomain = (domain) => {
  const allStories = generateStories();
  return allStories.filter(story => story.domain === domain);
};

/**
 * Get recent stories (last N days)
 * @param {number} days - Number of days
 * @returns {Array} Recent stories
 */
export const getRecentStories = (days = 7) => {
  const allStories = generateStories();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return allStories.filter(story => {
    const storyDate = new Date(story.timestamp);
    return storyDate >= cutoffDate;
  });
};
