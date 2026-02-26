// Inbox Service
// Manages inbox state and operations with localStorage persistence

/**
 * Inbox Service - manages inbox messages
 * For prototype: uses localStorage for persistence
 * In production: would integrate with backend API
 */

const STORAGE_KEY = 'aily_inbox_messages';
const COUNTER_KEY = 'aily_inbox_counter';

/**
 * Load messages from localStorage
 * @returns {Array} Array of messages
 */
const loadMessages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading messages from localStorage:', error);
    return [];
  }
};

/**
 * Save messages to localStorage
 * @param {Array} messages - Array of messages to save
 */
const saveMessages = (messages) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
};

/**
 * Get next message ID
 * @returns {number} Next message ID
 */
const getNextMessageId = () => {
  try {
    const counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
    const next = counter + 1;
    localStorage.setItem(COUNTER_KEY, next.toString());
    return next;
  } catch (error) {
    console.error('Error getting next message ID:', error);
    return Date.now(); // Fallback to timestamp
  }
};

let inboxMessages = loadMessages();

/**
 * Converts an insight to an inbox message
 * @param {Object} insight - The insight object
 * @param {string} agentId - Source agent identifier
 * @returns {Object} - Inbox message object
 */
const insightToMessage = (insight, agentId = null) => {
  const messageId = getNextMessageId();
  const now = new Date().toISOString();
  
  return {
    id: `msg-${messageId}`,
    title: insight.title || insight.name || 'New Insight',
    category: insight.category || '.pro',
    type: insight.type || 'Chat',
    status: insight.status || insight.metadata?.status || 'new-insight',
    icon: insight.icon || insight.category || '.pro',
    date: insight.date || insight.metadata?.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    countdownDays: insight.countdownDays || (insight.metadata?.countdown ? parseInt(insight.metadata.countdown.replace('Day ', '')) : undefined),
    author: insight.author || insight.metadata?.author,
    tags: insight.tags || (insight.metadata?.expired ? ['Expired'] : []),
    read: false,
    insightData: insight,
    agentId: agentId || insight.agentId || insight.sourceId || 'unknown',
    createdAt: now,
  };
};

/**
 * Adds a message to the inbox
 * @param {Object} messageOrInsight - Message object or insight object
 * @param {string} agentId - Optional agent ID
 * @returns {Object} - The created inbox message
 */
export const addMessage = (messageOrInsight, agentId = null) => {
  // If it's already a message object, use it directly
  let message;
  if (messageOrInsight.id && messageOrInsight.createdAt) {
    message = messageOrInsight;
  } else {
    // Convert insight to message
    message = insightToMessage(messageOrInsight, agentId);
  }

  // Check if this insight is already in the inbox (by title and agentId)
  const existing = inboxMessages.find(
    (msg) => msg.title === message.title && msg.agentId === message.agentId
  );
  
  if (existing) {
    // Update existing message instead of creating duplicate
    return existing;
  }

  inboxMessages.unshift(message); // Add to beginning
  saveMessages(inboxMessages);
  
  return message;
};

/**
 * Adds an insight to the inbox (backward compatibility)
 * @param {Object} insight - The insight object
 * @returns {Object} - The created inbox message
 */
export const addToInbox = (insight) => {
  return addMessage(insight);
};

/**
 * Retrieves all inbox messages
 * @param {Object} options - Filter options
 * @returns {Array} - Array of inbox messages
 */
export const getMessages = (options = {}) => {
  // Reload from localStorage to get latest
  inboxMessages = loadMessages();
  let messages = [...inboxMessages];

  if (options.unreadOnly) {
    messages = messages.filter((msg) => !msg.read);
  }

  if (options.category) {
    messages = messages.filter((msg) => msg.category === options.category);
  }

  if (options.agentId) {
    messages = messages.filter((msg) => msg.agentId === options.agentId);
  }

  // Sort by createdAt (newest first)
  messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return messages;
};

/**
 * Retrieves all inbox messages (backward compatibility)
 * @param {Object} options - Filter options
 * @returns {Array} - Array of inbox messages
 */
export const getInboxMessages = (options = {}) => {
  return getMessages(options);
};

/**
 * Marks a message as read
 * @param {string} messageId - The message ID
 * @returns {Object|null} - The updated message or null if not found
 */
export const markAsRead = (messageId) => {
  inboxMessages = loadMessages();
  const message = inboxMessages.find((msg) => msg.id === messageId);
  if (message) {
    message.read = true;
    saveMessages(inboxMessages);
    return message;
  }
  return null;
};

/**
 * Marks all messages as read
 */
export const markAllAsRead = () => {
  inboxMessages = loadMessages();
  inboxMessages.forEach((msg) => {
    msg.read = true;
  });
  saveMessages(inboxMessages);
};

/**
 * Gets the count of unread messages
 * @returns {number} - Count of unread messages
 */
export const getUnreadCount = () => {
  inboxMessages = loadMessages();
  return inboxMessages.filter((msg) => !msg.read).length;
};

/**
 * Removes a message from the inbox
 * @param {string} messageId - The message ID
 * @returns {boolean} - True if message was removed
 */
export const deleteMessage = (messageId) => {
  inboxMessages = loadMessages();
  const index = inboxMessages.findIndex((msg) => msg.id === messageId);
  if (index !== -1) {
    inboxMessages.splice(index, 1);
    saveMessages(inboxMessages);
    return true;
  }
  return false;
};

/**
 * Removes a message from the inbox (backward compatibility)
 * @param {string} messageId - The message ID
 * @returns {boolean} - True if message was removed
 */
export const removeMessage = deleteMessage;

/**
 * Clears all messages from inbox
 */
export const clearInbox = () => {
  inboxMessages = [];
  saveMessages([]);
  try {
    localStorage.setItem(COUNTER_KEY, '0');
  } catch (error) {
    console.error('Error clearing counter:', error);
  }
};

/**
 * Gets a message by ID
 * @param {string} messageId - The message ID
 * @returns {Object|null} - The message or null if not found
 */
export const getMessage = (messageId) => {
  inboxMessages = loadMessages();
  return inboxMessages.find((msg) => msg.id === messageId) || null;
};
