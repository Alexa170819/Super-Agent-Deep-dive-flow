/**
 * Playlist Export Service
 * Handles exporting playlists to various formats
 */

import { getPlaylist, getPlaylistStories } from './playlistService';

/**
 * Export playlist to shareable link
 * @param {string} playlistId - Playlist ID
 * @returns {string} Shareable URL
 */
export const exportToShareableLink = (playlistId) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/playlists/${playlistId}`;
};

/**
 * Copy shareable link to clipboard
 * @param {string} playlistId - Playlist ID
 * @returns {Promise<boolean>}
 */
export const copyShareableLink = async (playlistId) => {
  try {
    const link = exportToShareableLink(playlistId);
    await navigator.clipboard.writeText(link);
    return true;
  } catch (error) {
    console.error('Error copying link:', error);
    return false;
  }
};

/**
 * Export playlist to PDF (using browser print)
 * @param {string} playlistId - Playlist ID
 * @param {string} role - User role
 * @returns {Promise<void>}
 */
export const exportToPDF = async (playlistId, role = 'cfo') => {
  try {
    const playlist = getPlaylist(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    const stories = await getPlaylistStories(playlistId, role);
    
    // Create a printable HTML document
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Popup blocked. Please allow popups to export PDF.');
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${playlist.name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #000;
              background: #fff;
            }
            h1 {
              color: #000;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 30px;
            }
            .playlist-info {
              margin-bottom: 30px;
              color: #666;
            }
            .story {
              margin-bottom: 30px;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .story-title {
              font-weight: bold;
              font-size: 1.2em;
              margin-bottom: 10px;
              color: #000;
            }
            .story-content {
              color: #333;
              line-height: 1.6;
            }
            .story-impact {
              margin-top: 10px;
              padding: 10px;
              background: #f5f5f5;
              border-radius: 4px;
            }
            @media print {
              body { padding: 20px; }
              .story { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <h1>${playlist.name}</h1>
          <div class="playlist-info">
            <p><strong>Category:</strong> ${playlist.category}</p>
            ${playlist.description ? `<p><strong>Description:</strong> ${playlist.description}</p>` : ''}
            <p><strong>Created:</strong> ${new Date(playlist.createdAt).toLocaleDateString()}</p>
            <p><strong>Stories:</strong> ${stories.length}</p>
          </div>
          ${stories.map((story, index) => `
            <div class="story">
              <div class="story-title">${index + 1}. ${story.title || 'Untitled Story'}</div>
              <div class="story-content">
                ${story.keyInsight || story.narrative || story.title || 'No content available'}
              </div>
              ${story.impact ? `
                <div class="story-impact">
                  <strong>Impact:</strong> ${story.impact.financial || story.impact.kpi || 'N/A'}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
    }, 250);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

/**
 * Export playlist data as JSON
 * @param {string} playlistId - Playlist ID
 * @param {string} role - User role
 * @returns {Promise<string>} JSON string
 */
export const exportToJSON = async (playlistId, role = 'cfo') => {
  try {
    const playlist = getPlaylist(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    const stories = await getPlaylistStories(playlistId, role);
    
    const exportData = {
      playlist: {
        id: playlist.id,
        name: playlist.name,
        category: playlist.category,
        description: playlist.description,
        createdAt: playlist.createdAt,
        updatedAt: playlist.updatedAt
      },
      stories: stories.map(story => ({
        storyId: story.storyId,
        title: story.title,
        category: story.category,
        narrative: story.narrative,
        keyInsight: story.keyInsight,
        impact: story.impact,
        timestamp: story.timestamp
      }))
    };

    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting to JSON:', error);
    throw error;
  }
};

/**
 * Download playlist as JSON file
 * @param {string} playlistId - Playlist ID
 * @param {string} role - User role
 */
export const downloadJSON = async (playlistId, role = 'cfo') => {
  try {
    const json = await exportToJSON(playlistId, role);
    const playlist = getPlaylist(playlistId);
    const filename = `${playlist.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading JSON:', error);
    throw error;
  }
};
