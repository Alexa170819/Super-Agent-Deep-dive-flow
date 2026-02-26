/**
 * Time Simulation Service
 * For prototype: simulates time passage to test impact updates
 * Allows setting "current time" for testing purposes
 */

const SIMULATED_DATE_KEY = 'aily_simulated_date';

/**
 * Set simulated current date
 * @param {Date|string} date - Date to set as current simulated date
 */
export const setSimulatedDate = (date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  try {
    localStorage.setItem(SIMULATED_DATE_KEY, dateObj.toISOString());
  } catch (error) {
    console.error('Error setting simulated date:', error);
  }
};

/**
 * Get simulated current date
 * @returns {Date} Current simulated date or real current date if not set
 */
export const getSimulatedDate = () => {
  try {
    const stored = localStorage.getItem(SIMULATED_DATE_KEY);
    if (stored) {
      return new Date(stored);
    }
  } catch (error) {
    console.error('Error getting simulated date:', error);
  }
  // Return real current date if no simulation is set
  return new Date();
};

/**
 * Get days elapsed since a timestamp
 * @param {string|Date} timestamp - Timestamp to calculate from
 * @returns {number} Number of days elapsed
 */
export const getDaysElapsed = (timestamp) => {
  const timestampDate = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const currentDate = getSimulatedDate();
  const diffTime = currentDate - timestampDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays); // Return 0 if negative (future date)
};

/**
 * Check if enough time has passed for impact update (2 weeks = 14 days)
 * @param {string|Date} timestamp - Execution timestamp
 * @param {number} daysRequired - Days required (default: 14)
 * @returns {boolean} True if enough time has passed
 */
export const hasEnoughTimeElapsed = (timestamp, daysRequired = 14) => {
  return getDaysElapsed(timestamp) >= daysRequired;
};

/**
 * Reset simulated date (use real current date)
 */
export const resetSimulatedDate = () => {
  try {
    localStorage.removeItem(SIMULATED_DATE_KEY);
  } catch (error) {
    console.error('Error resetting simulated date:', error);
  }
};

/**
 * Format time elapsed as human-readable string
 * @param {number} days - Number of days
 * @returns {string} Formatted string (e.g., "2 weeks ago", "3 days ago")
 */
export const formatTimeElapsed = (days) => {
  if (days < 1) {
    return 'Today';
  } else if (days === 1) {
    return '1 day ago';
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (days < 14) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
};
