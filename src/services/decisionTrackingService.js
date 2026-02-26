/**
 * Decision Tracking Service
 * Tracks executed decisions with timestamps, strategies, and expected outcomes
 * For prototype: uses localStorage for persistence
 * In production: would integrate with backend API
 */

const STORAGE_KEY = 'aily_executed_decisions';
const COUNTER_KEY = 'aily_execution_counter';

/**
 * Load executed decisions from localStorage
 * @returns {Array} Array of executed decisions
 */
const loadExecutedDecisions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading executed decisions from localStorage:', error);
    return [];
  }
};

/**
 * Save executed decisions to localStorage
 * @param {Array} decisions - Array of executed decisions to save
 */
const saveExecutedDecisions = (decisions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
  } catch (error) {
    console.error('Error saving executed decisions to localStorage:', error);
  }
};

/**
 * Get next execution ID
 * @returns {number} Next execution ID
 */
const getNextExecutionId = () => {
  try {
    const counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
    const next = counter + 1;
    localStorage.setItem(COUNTER_KEY, next.toString());
    return next;
  } catch (error) {
    console.error('Error getting next execution ID:', error);
    return Date.now(); // Fallback to timestamp
  }
};

let executedDecisions = loadExecutedDecisions();

/**
 * Execute a decision
 * Saves the decision execution with timestamp and context
 * 
 * @param {Object} decisionData - Decision execution data
 * @param {string} decisionData.decisionId - Decision identifier
 * @param {string} decisionData.storyId - Story identifier (optional)
 * @param {string} decisionData.userId - User identifier (optional, defaults to 'user-1')
 * @param {string} decisionData.role - User role
 * @param {Object} decisionData.selectedStrategy - Selected strategy object
 * @param {Object} decisionData.expectedOutcome - Expected outcome data
 * @param {string} decisionData.agentId - Agent identifier
 * @returns {Object} The created executed decision
 */
export const executeDecision = (decisionData) => {
  const executionId = getNextExecutionId();
  const now = new Date().toISOString();
  
  const executedDecision = {
    id: `exec-${executionId}`,
    decisionId: decisionData.decisionId || `decision-${executionId}`,
    storyId: decisionData.storyId || null,
    userId: decisionData.userId || 'user-1',
    role: decisionData.role || 'cfo',
    executedAt: now,
    selectedStrategy: decisionData.selectedStrategy || null,
    expectedOutcome: decisionData.expectedOutcome || {},
    agentId: decisionData.agentId || 'cfo-cash-optimizer',
    status: 'executed', // executed, in-progress, completed
    category: decisionData.category || '.pro',
    title: decisionData.title || 'Executed Decision'
  };
  
  executedDecisions.unshift(executedDecision); // Add to beginning
  saveExecutedDecisions(executedDecisions);
  
  return executedDecision;
};

/**
 * Get all executed decisions for a user
 * @param {string} userId - User identifier (optional)
 * @param {string} role - User role (optional, for filtering)
 * @returns {Array} Array of executed decisions
 */
export const getExecutedDecisions = (userId = 'user-1', role = null) => {
  executedDecisions = loadExecutedDecisions();
  let decisions = [...executedDecisions];
  
  if (userId) {
    decisions = decisions.filter(d => d.userId === userId);
  }
  
  if (role) {
    decisions = decisions.filter(d => d.role === role);
  }
  
  // Sort by executedAt (newest first)
  decisions.sort((a, b) => new Date(b.executedAt) - new Date(a.executedAt));
  
  return decisions;
};

/**
 * Get decision status by ID
 * @param {string} decisionId - Decision identifier
 * @returns {Object|null} The executed decision or null if not found
 */
export const getDecisionStatus = (decisionId) => {
  executedDecisions = loadExecutedDecisions();
  return executedDecisions.find(d => d.decisionId === decisionId || d.id === decisionId) || null;
};

/**
 * Update decision status
 * @param {string} executionId - Execution identifier
 * @param {string} status - New status (executed, in-progress, completed)
 * @returns {Object|null} The updated decision or null if not found
 */
export const updateDecisionStatus = (executionId, status) => {
  executedDecisions = loadExecutedDecisions();
  const decision = executedDecisions.find(d => d.id === executionId);
  
  if (decision) {
    decision.status = status;
    saveExecutedDecisions(executedDecisions);
    return decision;
  }
  
  return null;
};

/**
 * Clear all executed decisions (for testing/reset)
 */
export const clearExecutedDecisions = () => {
  executedDecisions = [];
  saveExecutedDecisions([]);
  try {
    localStorage.setItem(COUNTER_KEY, '0');
  } catch (error) {
    console.error('Error clearing counter:', error);
  }
};
