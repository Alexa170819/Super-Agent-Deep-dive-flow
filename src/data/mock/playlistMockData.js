/**
 * Mock Playlist Data
 * Sample playlists matching the screenshot design
 */

import { createPlaylistObject } from '../playlistData';

// Color themes for different entities
const entityColors = {
  'Total Company': { primary: '#48FF9B', secondary: 'rgba(72, 255, 155, 0.15)' },
  'Saint Laurent': { primary: '#FF8C42', secondary: 'rgba(255, 140, 66, 0.15)' },
  'Gucci': { primary: '#2DD4BF', secondary: 'rgba(45, 212, 191, 0.15)' },
  'Bottega Veneta': { primary: '#3B82F6', secondary: 'rgba(59, 130, 246, 0.15)' },
  'McQueen': { primary: '#A855F7', secondary: 'rgba(168, 85, 247, 0.15)' },
  'Finance': { primary: '#48FF9B', secondary: 'rgba(72, 255, 155, 0.15)' },
  'Customer': { primary: '#2DD4BF', secondary: 'rgba(45, 212, 191, 0.15)' },
  'Store': { primary: '#2DD4BF', secondary: 'rgba(45, 212, 191, 0.15)' }
};

/**
 * Generate mock playlists for a category
 * @param {string} category - Category name
 * @param {Array<string>} entities - Array of entity names
 * @returns {Array<Playlist>}
 */
const generateCategoryPlaylists = (category, entities) => {
  return entities.map(entity => {
    return createPlaylistObject({
      name: entity,
      category,
      description: `${category} - ${entity} level insights`,
      storyIds: [], // Will be populated with actual story IDs when stories are available
      theme: entityColors[entity] || entityColors['Total Company'],
      metadata: {
        entity,
        type: 'review',
        isSystemPlaylist: true // Mark as system/default playlist
      }
    });
  });
};

/**
 * Get all mock playlists
 * @returns {Array<Playlist>}
 */
export const getMockPlaylists = () => {
  const categories = [
    {
      name: 'Finance - QTD Review',
      entities: ['Total Company', 'Saint Laurent', 'Gucci', 'Bottega Veneta', 'McQueen']
    },
    {
      name: 'Finance - QTR1 landing',
      entities: ['Total Company', 'Saint Laurent', 'Gucci', 'Bottega Veneta', 'McQueen']
    },
    {
      name: 'Finance - YTD Review',
      entities: ['Total Company', 'Saint Laurent', 'Gucci', 'Bottega Veneta', 'McQueen']
    },
    {
      name: 'Finance - Business Review Gucci',
      entities: ['Finance', 'Customer', 'Store']
    }
  ];

  const playlists = [];
  categories.forEach(category => {
    const categoryPlaylists = generateCategoryPlaylists(category.name, category.entities);
    playlists.push(...categoryPlaylists);
  });

  return playlists;
};

/**
 * Initialize mock playlists in localStorage
 * Only adds system playlists if they don't already exist
 */
export const initializeMockPlaylists = () => {
  const existing = localStorage.getItem('aily_playlists');
  let existingPlaylists = [];
  
  if (existing) {
    try {
      existingPlaylists = JSON.parse(existing);
    } catch (e) {
      // Invalid data, proceed to initialize
    }
  }

  // Check if system playlists already exist
  const hasSystemPlaylists = existingPlaylists.some(p => p.metadata?.isSystemPlaylist === true);
  
  if (!hasSystemPlaylists) {
    // Add system playlists
    const mockPlaylists = getMockPlaylists();
    const allPlaylists = [...existingPlaylists, ...mockPlaylists];
    localStorage.setItem('aily_playlists', JSON.stringify(allPlaylists));
  }
};
