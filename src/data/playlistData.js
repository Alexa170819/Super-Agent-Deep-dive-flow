/**
 * Playlist Data Structure and Types
 * Defines the schema for playlists
 */

/**
 * Playlist schema
 * @typedef {Object} Playlist
 * @property {string} id - Unique playlist identifier
 * @property {string} name - Playlist name
 * @property {string} category - Category (e.g., "Finance - Monthly Review")
 * @property {string} description - Optional description
 * @property {Array<string>} storyIds - Array of story IDs in order
 * @property {number} createdAt - Timestamp of creation
 * @property {number} updatedAt - Timestamp of last update
 * @property {Object} theme - Theme/styling configuration
 * @property {Object} metadata - Additional metadata
 */

/**
 * Create a new playlist object
 * @param {Object} params - Playlist parameters
 * @returns {Playlist}
 */
export const createPlaylistObject = ({
  id,
  name,
  category,
  description = '',
  storyIds = [],
  theme = {},
  metadata = {}
}) => {
  const now = Date.now();
  return {
    id: id || `playlist-${now}`,
    name,
    category,
    description,
    storyIds,
    createdAt: now,
    updatedAt: now,
    theme,
    metadata
  };
};

/**
 * Validate playlist object
 * @param {Object} playlist - Playlist to validate
 * @returns {boolean}
 */
export const isValidPlaylist = (playlist) => {
  return (
    playlist &&
    typeof playlist.id === 'string' &&
    typeof playlist.name === 'string' &&
    typeof playlist.category === 'string' &&
    Array.isArray(playlist.storyIds)
  );
};
