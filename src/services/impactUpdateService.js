/**
 * Impact Update Service
 * Generates impact updates after time period (2 weeks)
 * Compares actual vs expected outcomes
 */

import { getExecutedDecisions } from './decisionTrackingService';
import { getDaysElapsed, hasEnoughTimeElapsed, formatTimeElapsed } from './timeSimulationService';

const STORAGE_KEY = 'aily_impact_updates';
const COUNTER_KEY = 'aily_impact_update_counter';

/**
 * Load impact updates from localStorage
 * @returns {Array} Array of impact updates
 */
const loadImpactUpdates = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading impact updates from localStorage:', error);
    return [];
  }
};

/**
 * Save impact updates to localStorage
 * @param {Array} updates - Array of impact updates to save
 */
const saveImpactUpdates = (updates) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updates));
  } catch (error) {
    console.error('Error saving impact updates to localStorage:', error);
  }
};

/**
 * Get next impact update ID
 * @returns {number} Next impact update ID
 */
const getNextUpdateId = () => {
  try {
    const counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
    const next = counter + 1;
    localStorage.setItem(COUNTER_KEY, next.toString());
    return next;
  } catch (error) {
    console.error('Error getting next impact update ID:', error);
    return Date.now();
  }
};

let impactUpdates = loadImpactUpdates();

/**
 * Simulate actual outcome based on expected outcome
 * Adds some variance to make it realistic
 * @param {Object} expectedOutcome - Expected outcome data
 * @returns {Object} Simulated actual outcome
 */
const simulateActualOutcome = (expectedOutcome) => {
  // Extract numeric values from expected outcome
  let expectedImpact = 0;
  const impactStr = expectedOutcome.impact || '';
  const match = impactStr.match(/[\d.]+/);
  if (match) {
    expectedImpact = parseFloat(match[0]);
  }
  
  // Add variance: -10% to +15% of expected
  const variance = (Math.random() * 0.25 - 0.10); // -0.10 to 0.15
  const actualImpact = expectedImpact * (1 + variance);
  
  // Determine status based on variance
  let status = 'met';
  if (variance > 0.10) {
    status = 'exceeded';
  } else if (variance < -0.05) {
    status = 'below';
  }
  
  // Adjust confidence based on actual results
  const baseConfidence = expectedOutcome.confidence || 0.70;
  const confidenceAdjustment = variance > 0 ? 0.05 : (variance < -0.05 ? -0.05 : 0);
  const actualConfidence = Math.min(1.0, Math.max(0.5, baseConfidence + confidenceAdjustment));
  
  return {
    impact: `$${Math.round(actualImpact / 1000)}K ${impactStr.includes('savings') ? 'savings' : 'impact'}`,
    confidence: Math.round(actualConfidence * 100) / 100,
    metrics: {
      ...expectedOutcome.metrics,
      actualValue: actualImpact,
      expectedValue: expectedImpact,
      variance: Math.round(variance * 100)
    },
    status: status
  };
};

/**
 * Generate impact update for a decision
 * @param {string} executionId - Execution ID
 * @param {Object} executedDecision - Executed decision data
 * @returns {Object} Impact update object
 */
export const generateImpactUpdate = (executionId, executedDecision) => {
  const daysElapsed = getDaysElapsed(executedDecision.executedAt);
  
  if (daysElapsed < 14) {
    return null; // Not enough time has passed
  }
  
  // Check if update already exists
  const existing = impactUpdates.find(u => u.executedDecisionId === executionId);
  if (existing) {
    return existing;
  }
  
  const updateId = getNextUpdateId();
  const now = getSimulatedDate().toISOString();
  
  const expectedOutcome = executedDecision.expectedOutcome || {};
  const actualOutcome = simulateActualOutcome(expectedOutcome);
  
  // Calculate impact delta
  const expectedImpact = expectedOutcome.impact || '';
  const actualImpact = actualOutcome.impact || '';
  const expectedMatch = expectedImpact.match(/[\d.]+/);
  const actualMatch = actualImpact.match(/[\d.]+/);
  const expectedValue = expectedMatch ? parseFloat(expectedMatch[0]) * 1000 : 0;
  const actualValue = actualMatch ? parseFloat(actualMatch[0]) * 1000 : 0;
  const impactDelta = actualValue - expectedValue;
  
  const impactUpdate = {
    id: `update-${updateId}`,
    decisionId: executedDecision.decisionId,
    executedDecisionId: executionId,
    generatedAt: now,
    daysElapsed: daysElapsed,
    actualOutcome: actualOutcome,
    expectedOutcome: expectedOutcome,
    comparison: {
      impactDelta: impactDelta,
      status: actualOutcome.status, // met, exceeded, below
      percentageDelta: expectedValue > 0 ? Math.round((impactDelta / expectedValue) * 100) : 0
    },
    read: false,
    userId: executedDecision.userId,
    role: executedDecision.role,
    category: executedDecision.category,
    title: executedDecision.title
  };
  
  impactUpdates.unshift(impactUpdate);
  saveImpactUpdates(impactUpdates);
  
  return impactUpdate;
};

/**
 * Get all impact updates for a user
 * @param {string} userId - User identifier (optional)
 * @param {string} role - User role (optional, for filtering)
 * @returns {Array} Array of impact updates
 */
export const getImpactUpdates = (userId = 'user-1', role = null) => {
  impactUpdates = loadImpactUpdates();
  let updates = [...impactUpdates];
  
  if (userId) {
    updates = updates.filter(u => u.userId === userId);
  }
  
  if (role) {
    updates = updates.filter(u => u.role === role);
  }
  
  // Sort by generatedAt (newest first)
  updates.sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
  
  return updates;
};

/**
 * Get unread impact updates count
 * @param {string} userId - User identifier
 * @param {string} role - User role (optional)
 * @returns {number} Count of unread updates
 */
export const getUnreadImpactUpdatesCount = (userId = 'user-1', role = null) => {
  const updates = getImpactUpdates(userId, role);
  return updates.filter(u => !u.read).length;
};

/**
 * Mark impact update as read
 * @param {string} updateId - Impact update ID
 * @returns {Object|null} The updated impact update or null if not found
 */
export const markUpdateAsRead = (updateId) => {
  impactUpdates = loadImpactUpdates();
  const update = impactUpdates.find(u => u.id === updateId);
  
  if (update) {
    update.read = true;
    saveImpactUpdates(impactUpdates);
    return update;
  }
  
  return null;
};

/**
 * Check for decisions that need impact updates and generate them
 * @param {string} userId - User identifier
 * @param {string} role - User role
 * @returns {Array} Array of newly generated impact updates
 */
export const checkAndGenerateImpactUpdates = (userId = 'user-1', role = null) => {
  const executedDecisions = getExecutedDecisions(userId, role);
  const newlyGenerated = [];
  
  executedDecisions.forEach(executed => {
    if (hasEnoughTimeElapsed(executed.executedAt, 14)) {
      const update = generateImpactUpdate(executed.id, executed);
      if (update) {
        newlyGenerated.push(update);
      }
    }
  });
  
  return newlyGenerated;
};

/**
 * Clear all impact updates (for testing/reset)
 */
export const clearImpactUpdates = () => {
  impactUpdates = [];
  saveImpactUpdates([]);
  try {
    localStorage.setItem(COUNTER_KEY, '0');
  } catch (error) {
    console.error('Error clearing counter:', error);
  }
};
