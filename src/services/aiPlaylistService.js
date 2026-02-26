/**
 * AI Playlist Service
 * Generates playlists automatically based on user profile and upcoming meetings
 */

import { getPersonalizedStories } from './recSysOrchestrator';
import { createPlaylist } from './playlistService';

/**
 * Generate AI playlists based on user profile and context
 * @param {string} role - User role
 * @param {Object} context - User context (meetings, preferences, etc.)
 * @returns {Promise<Array>} Array of generated playlists
 */
export const generateAIPlaylists = async (role = 'cfo', context = {}) => {
  try {
    // Get personalized stories for the user
    const storiesResult = await getPersonalizedStories(role, {
      filterType: 'for-you',
      maxStories: 100
    });

    const allStories = storiesResult.stories || [];

    // Generate playlists based on common patterns and user context
    const aiPlaylists = [];

    // 1. Monthly Review Playlist (if it's near month-end)
    const now = new Date();
    const isNearMonthEnd = now.getDate() >= 25;
    
    if (isNearMonthEnd) {
      const monthlyStories = allStories
        .filter(s => s.category === '.fin' || s.domain === 'finance')
        .slice(0, 11);
      
      if (monthlyStories.length > 0) {
        const monthlyPlaylist = createPlaylist(
          'Monthly Review - AI Generated',
          'Finance - Monthly Review',
          monthlyStories.map(s => s.storyId),
          {
            description: 'AI-generated playlist for your monthly review based on your role and recent activity',
            metadata: {
              aiGenerated: true,
              generatedAt: Date.now(),
              reason: 'Monthly review cycle',
              source: 'ai'
            }
          }
        );
        aiPlaylists.push(monthlyPlaylist);
      }
    }

    // 2. Top Opportunities Playlist
    const opportunityStories = allStories
      .filter(s => s.impact?.opportunity || s.type === 'sales_opportunity')
      .slice(0, 8);
    
    if (opportunityStories.length > 0) {
      const opportunityPlaylist = createPlaylist(
        'Top Opportunities - AI Generated',
        'Finance - Monthly Review',
        opportunityStories.map(s => s.storyId),
        {
          description: 'AI-curated list of top opportunities based on your role and priorities',
          metadata: {
            aiGenerated: true,
            generatedAt: Date.now(),
            reason: 'Opportunity focus',
            source: 'ai'
          }
        }
      );
      aiPlaylists.push(opportunityPlaylist);
    }

    // 3. High Priority Risks Playlist
    const riskStories = allStories
      .filter(s => s.impact?.risk === 'high' && !s.impact?.opportunity)
      .slice(0, 10);
    
    if (riskStories.length > 0) {
      const riskPlaylist = createPlaylist(
        'High Priority Risks - AI Generated',
        'Finance - Monthly Review',
        riskStories.map(s => s.storyId),
        {
          description: 'AI-identified high-priority risks requiring immediate attention',
          metadata: {
            aiGenerated: true,
            generatedAt: Date.now(),
            reason: 'Risk management',
            source: 'ai'
          }
        }
      );
      aiPlaylists.push(riskPlaylist);
    }

    // 4. Meeting-specific playlists (if context has meetings)
    if (context.upcomingMeetings && context.upcomingMeetings.length > 0) {
      context.upcomingMeetings.forEach(meeting => {
        const meetingStories = allStories
          .filter(s => {
            // Match stories to meeting topics/keywords
            const meetingText = `${meeting.title} ${meeting.description || ''}`.toLowerCase();
            const storyText = `${s.title} ${s.narrative || ''}`.toLowerCase();
            return meetingText.split(' ').some(keyword => storyText.includes(keyword));
          })
          .slice(0, 7);
        
        if (meetingStories.length > 0) {
          const meetingPlaylist = createPlaylist(
            `${meeting.title} - AI Generated`,
            meeting.category || 'Finance - Monthly Review',
            meetingStories.map(s => s.storyId),
            {
              description: `AI-generated playlist for your meeting: ${meeting.title}`,
              metadata: {
                aiGenerated: true,
                generatedAt: Date.now(),
                reason: 'Upcoming meeting',
                meetingId: meeting.id,
                meetingDate: meeting.date,
                source: 'ai'
              }
            }
          );
          aiPlaylists.push(meetingPlaylist);
        }
      });
    }

    return aiPlaylists;
  } catch (error) {
    console.error('Error generating AI playlists:', error);
    return [];
  }
};

/**
 * Get existing AI-generated playlists
 * @returns {Array} Array of AI-generated playlists
 */
export const getAIGeneratedPlaylists = () => {
  try {
    const stored = localStorage.getItem('aily_playlists');
    if (!stored) return [];
    
    const playlists = JSON.parse(stored);
    return playlists.filter(p => p.metadata?.aiGenerated === true);
  } catch (error) {
    console.error('Error loading AI playlists:', error);
    return [];
  }
};

/**
 * Initialize AI playlists for a user
 * @param {string} role - User role
 * @param {Object} context - User context
 * @returns {Promise<Array>} Generated playlists
 */
export const initializeAIPlaylists = async (role = 'cfo', context = {}) => {
  // Check if AI playlists already exist
  const existing = getAIGeneratedPlaylists();
  if (existing.length > 0) {
    // Check if they're recent (less than 24 hours old)
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const recent = existing.filter(p => p.metadata?.generatedAt > oneDayAgo);
    
    if (recent.length > 0) {
      return recent;
    }
  }

  // Generate new AI playlists
  return await generateAIPlaylists(role, context);
};
