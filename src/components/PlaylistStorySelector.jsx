/**
 * PlaylistStorySelector Component
 * Displays search results and allows story selection for plailists
 */

import InsightCard from './InsightCard';
import USStorePerformanceCard from './USStorePerformanceCard';
import './playlistStorySelector.css';

export default function PlaylistStorySelector({
  stories,
  selectedStories,
  onToggle,
  onContinue,
  onBack,
  loading,
  existingStoryIds = [], // Stories already in playlist (to filter out)
  playlistName = null, // Name of playlist being edited (for context)
  mode = 'create' // 'create' or 'add'
}) {
  const isSelected = (story) => {
    return selectedStories.some(s => s.storyId === story.storyId);
  };

  // Filter out stories that are already in the playlist
  const availableStories = existingStoryIds.length > 0
    ? stories.filter(story => !existingStoryIds.includes(story.storyId))
    : stories;

  return (
    <div className="playlist-story-selector">
      <div className="playlist-story-selector-header">
        <button className="playlist-story-selector-back" onClick={onBack}>
          ← Back
        </button>
        <h3 className="playlist-story-selector-title">
          {mode === 'add' && playlistName 
            ? `Add Stories to "${playlistName}"`
            : 'Select Stories'} ({selectedStories.length} selected)
        </h3>
      </div>

      {loading ? (
        <div className="playlist-story-selector-loading">
          Loading stories...
        </div>
      ) : availableStories.length === 0 ? (
        <div className="playlist-story-selector-empty">
          {existingStoryIds.length > 0 && stories.length > 0
            ? 'All available stories are already in this playlist.'
            : 'No stories found. Try a different search query.'}
        </div>
      ) : (
        <>
          {existingStoryIds.length > 0 && stories.length > availableStories.length && (
            <div className="playlist-story-selector-filter-notice">
              {stories.length - availableStories.length} story/stories already in playlist (hidden)
            </div>
          )}
          <div className="playlist-story-selector-grid">
            {availableStories.map(story => {
              const selected = isSelected(story);
              const isUSStoreStory = story.rawData?.metadata?.region === 'United States' || 
                                     story.rawData?.metadata?.country === 'US' ||
                                     story.title?.includes('US Stores');
              
              return (
                <div
                  key={story.storyId}
                  className={`playlist-story-selector-item ${selected ? 'selected' : ''} ${isUSStoreStory ? 'us-store-story' : ''}`}
                >
                  <div 
                    className="playlist-story-selector-card-wrapper"
                    onClick={(e) => {
                      // Don't trigger if clicking inside the card (let card handle it)
                      if (isUSStoreStory) {
                        return;
                      }
                      e.stopPropagation();
                      onToggle(story);
                    }}
                  >
                    {isUSStoreStory ? (
                      <USStorePerformanceCard 
                        story={story} 
                        onSelect={onToggle}
                        isSelected={selected}
                      />
                    ) : (
                      <>
                        <div 
                          className="playlist-story-selector-checkbox"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggle(story);
                          }}
                        >
                          {selected && '✓'}
                        </div>
                        <InsightCard insight={story} onClick={(e) => {
                          e.stopPropagation();
                          onToggle(story);
                        }} />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Always show actions button at bottom, even when loading or empty */}
      {!loading && stories.length > 0 && (
        <div className="playlist-story-selector-actions">
            <button
              className="playlist-story-selector-continue"
              onClick={onContinue}
              disabled={selectedStories.length === 0}
            >
              {mode === 'add' 
                ? `Add ${selectedStories.length} ${selectedStories.length === 1 ? 'story' : 'stories'} to Playlist`
                : `Continue with ${selectedStories.length} ${selectedStories.length === 1 ? 'story' : 'stories'}`}
            </button>
        </div>
      )}
    </div>
  );
}
