/**
 * RecSys Orchestrator
 * Main orchestrator for the 3-layer recommendation system flow
 * Coordinates Content → Personalization → Decision layers
 * Can switch between mock and real services via config
 */

import { generateStories } from './mock/contentLayerService';
import { personalizeStories, filterStoriesByType } from './mock/personalizationLayerService';
import { generateDecisions } from './mock/decisionLayerService';

/**
 * Configuration for RecSys Orchestrator
 * Set useMockServices to false to use real API services
 */
const config = {
  useMockServices: true, // Toggle between mock and real services
  mockServices: {
    contentLayer: generateStories,
    personalizationLayer: personalizeStories,
    decisionLayer: generateDecisions
  },
  // Future: realServices will be added here
  realServices: {
    // contentLayer: realContentLayerService,
    // personalizationLayer: realPersonalizationLayerService,
    // decisionLayer: realDecisionLayerService
  }
};

/**
 * Get personalized decisions for a user
 * Main entry point for the recommendation system
 * 
 * @param {string} role - User role (cfo, financial-manager, etc.)
 * @param {Object} options - Options for personalization and decision generation
 * @param {string} options.filterType - Filter type ('for-you', 'upside', 'downside', 'portfolio')
 * @param {number} options.maxStories - Maximum number of stories to return
 * @param {number} options.maxDecisions - Maximum number of decisions to return (default: 3)
 * @param {number} options.minScore - Minimum score threshold (default: 0.6)
 * @returns {Promise<Object>} Object containing stories and decisions
 */
export const getPersonalizedDecisions = async (role = 'cfo', options = {}) => {
  const {
    filterType = 'for-you',
    maxStories = 20,
    maxDecisions = 3,
    minScore = 0.6
  } = options;
  
  try {
    // Layer 1: Content/Contextual Layer
    // Generate stories from normalized data
    const stories = config.useMockServices
      ? config.mockServices.contentLayer()
      : await config.realServices.contentLayer();
    
    // Layer 2: Personalization Layer
    // Score and filter stories based on role
    const personalizedStories = config.useMockServices
      ? config.mockServices.personalizationLayer(stories, role)
      : await config.mockServices.personalizationLayer(stories, role);
    
    // Apply filter type (for-you, upside, downside, portfolio)
    const filteredStories = filterStoriesByType(personalizedStories, filterType);
    
    // Limit number of stories
    const limitedStories = filteredStories.slice(0, maxStories);
    
    // Layer 3: Decision Layer
    // Generate actionable decisions from top stories
    const decisions = config.useMockServices
      ? config.mockServices.decisionLayer(limitedStories, role, {
          minScore,
          maxDecisions,
          requireAuthority: true
        })
      : await config.realServices.decisionLayer(limitedStories, role, {
          minScore,
          maxDecisions,
          requireAuthority: true
        });
    
    return {
      stories: limitedStories,
      decisions,
      metadata: {
        role,
        filterType,
        totalStories: stories.length,
        personalizedCount: personalizedStories.length,
        filteredCount: filteredStories.length,
        decisionsCount: decisions.length
      }
    };
  } catch (error) {
    console.error('Error in RecSys Orchestrator:', error);
    return {
      stories: [],
      decisions: [],
      error: error.message,
      metadata: {
        role,
        filterType
      }
    };
  }
};

/**
 * Get only stories (without decisions)
 * Useful for Drive page that shows all insights
 * 
 * @param {string} role - User role
 * @param {Object} options - Options
 * @returns {Promise<Object>} Object containing stories
 */
export const getPersonalizedStories = async (role = 'cfo', options = {}) => {
  const {
    filterType = 'for-you',
    maxStories = 20
  } = options;
  
  try {
    // Layer 1: Content Layer
    const stories = config.useMockServices
      ? config.mockServices.contentLayer()
      : await config.realServices.contentLayer();
    
    // Layer 2: Personalization Layer
    const personalizedStories = config.useMockServices
      ? config.mockServices.personalizationLayer(stories, role)
      : await config.mockServices.personalizationLayer(stories, role);
    
    // Apply filter type
    const filteredStories = filterStoriesByType(personalizedStories, filterType);
    
    // Limit number of stories
    const limitedStories = filteredStories.slice(0, maxStories);
    
    return {
      stories: limitedStories,
      metadata: {
        role,
        filterType,
        totalStories: stories.length,
        personalizedCount: personalizedStories.length,
        filteredCount: filteredStories.length
      }
    };
  } catch (error) {
    console.error('Error getting personalized stories:', error);
    return {
      stories: [],
      error: error.message,
      metadata: {
        role,
        filterType
      }
    };
  }
};

/**
 * Get only top decisions (without all stories)
 * Useful for My Agent section that shows top 3 decisions
 * 
 * @param {string} role - User role
 * @param {Object} options - Options
 * @returns {Promise<Object>} Object containing decisions
 */
export const getTopDecisions = async (role = 'cfo', options = {}) => {
  const {
    maxDecisions = 3,
    minScore = 0.6
  } = options;
  
  try {
    // Get personalized decisions (this internally calls all 3 layers)
    const result = await getPersonalizedDecisions(role, {
      filterType: 'for-you',
      maxStories: 10, // Only need top stories for decisions
      maxDecisions,
      minScore
    });
    
    return {
      decisions: result.decisions,
      metadata: {
        role,
        decisionsCount: result.decisions.length
      }
    };
  } catch (error) {
    console.error('Error getting top decisions:', error);
    return {
      decisions: [],
      error: error.message,
      metadata: {
        role
      }
    };
  }
};

/**
 * Get a single decision by ID
 * 
 * @param {string} decisionId - Decision ID
 * @param {string} role - User role
 * @returns {Promise<Object|null>} Decision object or null
 */
export const getDecisionById = async (decisionId, role = 'cfo') => {
  try {
    const result = await getPersonalizedDecisions(role, {
      maxDecisions: 10 // Get more to find the specific one
    });
    
    const decision = result.decisions.find(d => d.decisionId === decisionId);
    return decision || null;
  } catch (error) {
    console.error('Error getting decision by ID:', error);
    return null;
  }
};

/**
 * Get a single story by ID
 * 
 * @param {string} storyId - Story ID
 * @param {string} role - User role
 * @returns {Promise<Object|null>} Story object or null
 */
export const getStoryById = async (storyId, role = 'cfo') => {
  try {
    const result = await getPersonalizedStories(role, {
      maxStories: 50 // Get more to find the specific one
    });
    
    const story = result.stories.find(s => s.storyId === storyId);
    return story || null;
  } catch (error) {
    console.error('Error getting story by ID:', error);
    return null;
  }
};

/**
 * Update configuration (for switching between mock and real services)
 * 
 * @param {Object} newConfig - New configuration
 */
export const updateConfig = (newConfig) => {
  Object.assign(config, newConfig);
};

/**
 * Get current configuration
 * 
 * @returns {Object} Current configuration
 */
export const getConfig = () => {
  return { ...config };
};

/**
 * Transform story context into Superagent data structure
 * Creates agent data that incorporates the story's insights and context
 * 
 * @param {Object} story - Story object from Content/Personalization layers
 * @param {Object} baseAgentData - Base agent data to enhance
 * @returns {Object} Enhanced agent data with story context
 */
export const transformStoryToAgentData = (story, baseAgentData = {}) => {
  if (!story) {
    return baseAgentData;
  }
  
  // Check if this is a Kering story
  const isKeringStory = story.rawData?.brand === 'Saint Laurent' || story.storyId?.includes('kering');
  
  // Create enhanced insights section from story
  const storyInsights = {
    sections: [
      {
        title: 'Context',
        content: story.narrative || story.title || 'No description available.'
      },
      ...(story.impact ? [{
        title: 'Impact',
        content: `Financial Impact: ${story.impact.financial || 'N/A'}\nKPI Impact: ${story.impact.kpi || 'N/A'}\nRisk Level: ${story.impact.risk || 'medium'}`
      }] : [])
    ]
  };
  
  // Add Kering-specific insights
  if (isKeringStory && story.rawData) {
    const keringData = story.rawData;
    
    // Add key issues section
    if (keringData.keyIssues && keringData.keyIssues.length > 0) {
      storyInsights.sections.push({
        title: 'Key Issues',
        content: keringData.keyIssues.map(issue => 
          `${issue.issue}: ${issue.value} (${issue.context}) - ${issue.description || ''}`
        ).join('\n\n')
      });
    }
    
    // Add decision options section
    if (keringData.decisionOptions && keringData.decisionOptions.length > 0) {
      storyInsights.sections.push({
        title: 'Decision Options',
        content: keringData.decisionOptions.map(option => 
          `${option.option}:\n${option.description}\nImpact: ${option.impact}\nTimeline: ${option.timeline}\nConfidence: ${(option.confidence * 100).toFixed(0)}%`
        ).join('\n\n---\n\n')
      });
    }
    
    // Add strategic context
    if (keringData.context?.strategicContext) {
      storyInsights.sections.push({
        title: 'Strategic Context',
        content: keringData.context.strategicContext
      });
    }
  }
  
  // Enhance trigger data with story title
  let enhancedTrigger = {
    ...baseAgentData.trigger,
    subtitle: story.title || baseAgentData.trigger?.subtitle || 'Opportunity',
    description: story.narrative || baseAgentData.trigger?.description
  };
  
  // Enhance trigger with Kering data if available
  if (isKeringStory && story.rawData) {
    const keringData = story.rawData;
    enhancedTrigger = {
      ...enhancedTrigger,
      title: `${keringData.brand} ${keringData.country}: ${story.title}`,
      subtitle: keringData.context?.headline || story.title,
      description: keringData.context?.narrative || story.narrative,
      metrics: [
        { 
          label: 'Revenue', 
          value: `€${(keringData.metrics.revenue / 1000000).toFixed(1)}M`,
          color: '#ff4d4d'
        },
        { 
          label: 'YoY Change', 
          value: `${(keringData.metrics.yoyChange2024 * 100).toFixed(1)}%`,
          color: '#ff4d4d'
        },
        { 
          label: 'Outlet Exposure', 
          value: `${(keringData.metrics.outletExposure * 100).toFixed(1)}%`,
          color: '#ffb800'
        },
        { 
          label: 'Conversion', 
          value: `${(keringData.metrics.conversionRate * 100).toFixed(2)}%`,
          color: '#ff4d4d'
        }
      ]
    };
  }
  
  // Merge story insights with existing insights
  const existingInsights = baseAgentData.insights || {};
  const enhancedInsights = {
    ...existingInsights,
    sections: [
      ...(storyInsights.sections || []),
      ...(existingInsights.sections || [])
    ]
  };
  
  // Create UK-specific scenarios/strategies if this is a UK Kering story
  let enhancedScenarios = baseAgentData.scenarios;
  if (isKeringStory && story.rawData?.country === 'UK') {
    const keringData = story.rawData;
    const decisionOptions = keringData.decisionOptions || [];
    
    // Create UK-specific strategies based on decision options
    enhancedScenarios = {
      title: "UK Strategic Review - Strategy Options",
      timeperiods: ["6 months", "12 months"],
      strategies: {
        "6 months": decisionOptions.map((option, index) => ({
          id: option.id || `strategy-${index}`,
          title: option.option,
          description: option.description,
          impact: option.impact,
          confidence: option.confidence || 0.75,
          primaryMetric: {
            title: "Expected Impact",
            value: option.impact
          },
          chart: {
            data: [
              { quarter: "Q1", baseline: 30.8, forecast: 30.8 },
              { quarter: "Q2", baseline: 30.8, forecast: 32.0 },
              { quarter: "Q3", baseline: 30.8, forecast: 33.5 },
              { quarter: "Q4", baseline: 30.8, forecast: 35.0 }
            ],
            legend: {
              baseline: "Current Trajectory",
              forecast: "With Strategy"
            },
            xKey: "quarter"
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: option.option,
              description: option.description,
              duration: option.timeline,
              confidence: option.confidence || 0.75,
              forecastedImpact: option.impact,
              correlatedTasks: option.correlatedTasks || [
                'Assess current clienteling capabilities',
                'Develop training program for sales team',
                'Set up KPIs and tracking mechanisms',
                'Review and optimize store layouts'
              ],
              sections: [
                {
                  category: ".fin",
                  title: option.option,
                  value: option.timeline,
                  positive: true,
                  // Enhanced data for detailed modal
                  description: option.description,
                  duration: option.timeline,
                  confidence: option.confidence || 0.75,
                  forecastedImpact: option.impact,
                  impactRevenue: option.impactRevenue,
                  impactMarketShare: option.impactMarketShare,
                  impactType: option.impactType || 'revenue',
                  correlatedTasks: option.correlatedTasks || [
                    'Assess current clienteling capabilities',
                    'Develop training program for sales team',
                    'Set up KPIs and tracking mechanisms',
                    'Review and optimize store layouts'
                  ]
                }
              ]
            }
          ]
        })),
        "12 months": decisionOptions.map((option, index) => ({
          id: option.id || `strategy-${index}`,
          title: option.option,
          description: option.description,
          impact: option.impact,
          confidence: option.confidence || 0.75,
          primaryMetric: {
            title: "Expected Impact",
            value: option.impact
          },
          chart: {
            data: [
              { quarter: "Q1", baseline: 30.8, forecast: 30.8 },
              { quarter: "Q2", baseline: 30.8, forecast: 32.5 },
              { quarter: "Q3", baseline: 30.8, forecast: 34.5 },
              { quarter: "Q4", baseline: 30.8, forecast: 37.0 }
            ],
            legend: {
              baseline: "Current Trajectory",
              forecast: "With Strategy"
            },
            xKey: "quarter"
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: option.option,
              description: option.description,
              duration: option.timeline,
              confidence: option.confidence || 0.75,
              forecastedImpact: option.impact,
              correlatedTasks: option.correlatedTasks || [
                'Assess current clienteling capabilities',
                'Develop training program for sales team',
                'Set up KPIs and tracking mechanisms',
                'Review and optimize store layouts'
              ],
              sections: [
                {
                  category: ".fin",
                  title: option.option,
                  value: option.timeline,
                  positive: true,
                  // Enhanced data for detailed modal
                  description: option.description,
                  duration: option.timeline,
                  confidence: option.confidence || 0.75,
                  forecastedImpact: option.impact,
                  impactRevenue: option.impactRevenue,
                  impactMarketShare: option.impactMarketShare,
                  impactType: option.impactType || 'revenue',
                  correlatedTasks: option.correlatedTasks || [
                    'Assess current clienteling capabilities',
                    'Develop training program for sales team',
                    'Set up KPIs and tracking mechanisms',
                    'Review and optimize store layouts'
                  ]
                }
              ]
            }
          ]
        }))
      }
    };
  }
  
  return {
    ...baseAgentData,
    trigger: enhancedTrigger,
    insights: enhancedInsights,
    scenarios: enhancedScenarios || baseAgentData.scenarios,
    // Add story metadata for reference
    _storyContext: {
      storyId: story.storyId,
      category: story.category,
      scores: story.scores,
      finalScore: story.finalScore,
      isKeringStory: isKeringStory,
      keringData: isKeringStory ? story.rawData : null
    }
  };
};
