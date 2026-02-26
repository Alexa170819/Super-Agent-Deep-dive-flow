/**
 * Kering Data - Saint Laurent Western Europe Opportunity
 * Based on Western Europe Regional Director Report
 * Focus: Western Europe turned the corner - H2 recovery and January 2026 explosion
 */

export const keringWEOpportunityData = {
  id: 'kering-saint-laurent-we-opportunity-001',
  domain: 'finance',
  timestamp: '2026-01-20T10:00:00Z',
  type: 'regional_opportunity',
  brand: 'Saint Laurent',
  region: 'Western Europe',
  country: null, // Regional level, not country-specific
  
  metrics: {
    revenue2025: 405000000, // €405M
    revenue2024: 413000000, // €413M (estimated)
    fullYearDecline: -0.02, // -2.0%
    h2Growth: 0.036, // +3.6%
    jan2026Growth: 0.164, // +16.4% (strongest start in region's history)
    h1Decline: -0.082 // -8.2% (H1 was negative)
  },
  
  metadata: {
    brand: 'Saint Laurent',
    region: 'Western Europe',
    country: null,
    urgency: 'medium',
    timeToAct: '2 weeks',
    reason: 'Momentum shift - capitalize on H2 recovery and January explosion',
    priority: 'opportunity'
  },
  
  context: {
    headline: 'Western Europe just turned the corner',
    narrative: 'Western Europe just turned the corner. After a 2.0% full-year decline, H2 2025 was 3.6% — and January 2026 exploded at 16.4%, the strongest start to a year in the region\'s history.',
    teaser: 'H2 recovery +16.4% January explosion',
    strategicContext: 'Momentum shift - capitalize on recovery trajectory'
  }
};

/**
 * Kering Data - Saint Laurent UK Strategic Review
 * Based on Western Europe Regional Director Report
 * Focus: UK Strategic Review insight
 */

export const keringUKData = {
  id: 'kering-saint-laurent-uk-001',
  domain: 'finance',
  timestamp: '2026-01-20T10:00:00Z',
  type: 'country_performance',
  brand: 'Saint Laurent',
  region: 'Western Europe',
  country: 'UK',
  
  metrics: {
    revenue: 30800000,
    revenue2024: 37100000, // Estimated based on -17.1% decline
    revenue2023: 37000000, // Estimated
    yoyChange2024: -0.171,
    yoyChange2023: -0.167,
    shareOfRegion: 0.076, // 7.6%
    outletExposure: 0.476, // 47.6%
    conversionRate: 0.0453, // 4.53%
    stores: 3,
    bicesterLoss: 6200000 // -6.2M
  },
  
  metadata: {
    brand: 'Saint Laurent',
    region: 'Western Europe',
    country: 'UK',
    urgency: 'high',
    timeToAct: '7 days',
    reason: 'UK cannot remain a 48% outlet market for a Maison',
    priority: 'strategic_review'
  },
  
  keyIssues: [
    { 
      issue: 'Outlet overexposure', 
      value: '47.6%', 
      context: 'vs regional avg ~19%',
      impact: 'high',
      description: 'UK has nearly 2.5x the regional average outlet exposure'
    },
    { 
      issue: 'Low conversion', 
      value: '4.53%', 
      context: 'lowest in Western Europe',
      impact: 'high',
      description: 'Conversion rate is the lowest across all Western Europe markets'
    },
    { 
      issue: 'Bicester Outlet', 
      value: '-6.2M', 
      context: 'single location loss',
      impact: 'critical',
      description: 'Bicester Outlet alone accounts for significant revenue decline'
    }
  ],
  
  decisionOptions: [
    {
      id: 'invest-full-price',
      option: 'Invest in full-price clienteling',
      description: 'Rebuild full-price sales at Bond Street/Sloane Street through enhanced clienteling',
      impact: 'Rebuild brand positioning and full-price revenue',
      impactRevenue: 4500000, // €4.5M expected revenue increase
      impactType: 'revenue', // 'revenue' or 'market_share'
      timeline: '3-6 months',
      confidence: 0.75,
      correlatedTasks: [
        'Assess current clienteling capabilities at Bond Street and Sloane Street',
        'Develop comprehensive training program for sales associates',
        'Implement client relationship management (CRM) system',
        'Set up KPIs and tracking mechanisms for full-price sales',
        'Review and optimize store layouts for clienteling',
        'Establish VIP client engagement programs'
      ]
    },
    {
      id: 'rationalize-outlet',
      option: 'Rationalize outlet footprint',
      description: 'Reduce outlet exposure to align with Maison positioning',
      impact: 'Improve brand positioning, may reduce short-term revenue',
      impactRevenue: -2000000, // -€2M short-term revenue impact (but improves positioning)
      impactMarketShare: 1.2, // +1.2% market share improvement in premium segment
      impactType: 'market_share', // Primary metric is market share, revenue is secondary
      timeline: '6-12 months',
      confidence: 0.80,
      correlatedTasks: [
        'Conduct comprehensive outlet performance analysis',
        'Evaluate lease agreements and exit strategies',
        'Develop transition plan for affected locations',
        'Reallocate resources to full-price channels',
        'Implement brand positioning guidelines',
        'Monitor impact on regional revenue targets'
      ]
    }
  ],
  
  context: {
    headline: 'UK at -17.1% is an urgent problem',
    narrative: 'UK at -17.1% is an urgent problem. With 47.6% outlet exposure and 4.53% conversion (lowest in region), the UK cannot remain a 48% outlet market for a Maison of Saint Laurent\'s positioning. Bicester Outlet alone lost 6.2M.',
    teaser: '47.6% outlet exposure, 4.53% conversion (lowest in region), Bicester -6.2M',
    strategicContext: 'The UK is becoming an outlet market. UK cannot remain a 48% outlet market for a Maison of Saint Laurent\'s positioning.',
    stores: [
      { name: 'Bond Street', type: 'flagship', performance: 'stable' },
      { name: 'Sloane Street', type: 'flagship', performance: 'stable' },
      { name: 'Bicester Outlet', type: 'outlet', performance: 'declining', loss: 6200000 }
    ]
  }
};

/**
 * Get Kering Western Europe Opportunity data (for Step 1)
 */
export const getKeringWEOpportunityData = () => {
  return keringWEOpportunityData;
};

/**
 * Get Kering UK data
 */
export const getKeringUKData = () => {
  return keringUKData;
};

/**
 * Get all Kering data
 */
export const getAllKeringData = () => {
  return [keringWEOpportunityData, keringUKData];
};
