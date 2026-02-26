/**
 * PlaylistCreator Component
 * Interface for creating new plailists with prompt input
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import { searchStoriesForPlaylist } from '../services/playlistService';
import PlaylistStorySelector from './PlaylistStorySelector';
import './playlistCreator.css';

const EXAMPLE_QUERIES = [
  'Finance monthly review for US stores',
  'Sales performance highlights',
  'Risk indicators this quarter',
  'Growth opportunities by region'
];

export default function PlaylistCreator({ onClose, onComplete }) {
  const navigate = useNavigate();
  const { role } = useRole();
  // Default prompt for CEO role
  const defaultPrompt = role === 'cfo' ? 'Finance monthly review for US stores' : '';
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStories, setSelectedStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('input'); // 'input' or 'select'

  const handleSearch = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const stories = await searchStoriesForPlaylist(prompt, role, {
        maxStories: 50
      });
      // Ensure stories is an array
      const validStories = Array.isArray(stories) ? stories : [];
      setSearchResults(validStories);
      setStep('select');
    } catch (error) {
      console.error('Error searching stories:', error);
      setSearchResults([]);
      alert('Error searching stories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStoryToggle = (story) => {
    setSelectedStories(prev => {
      const exists = prev.find(s => s.storyId === story.storyId);
      if (exists) {
        return prev.filter(s => s.storyId !== story.storyId);
      } else {
        return [...prev, story];
      }
    });
  };

  const handleContinue = () => {
    if (selectedStories.length === 0) {
      alert('Please select at least one story');
      return;
    }

    // Navigate to editor with selected stories
    const storyIds = selectedStories.map(s => s.storyId);
    navigate('/playlists/create/edit', {
      state: {
        prompt,
        selectedStories,
        storyIds
      }
    });
  };

  const handleExampleClick = async (example) => {
    setPrompt(example);
    // Automatically trigger search when clicking an example
    if (example.trim()) {
      setLoading(true);
      try {
        const stories = await searchStoriesForPlaylist(example, role, {
          maxStories: 50
        });
        // Ensure stories is an array
        const validStories = Array.isArray(stories) ? stories : [];
        setSearchResults(validStories);
        setStep('select');
        setLoading(false);
      } catch (error) {
        console.error('Error searching stories:', error);
        setSearchResults([]);
        setLoading(false);
        alert('Error searching stories. Please try again.');
      }
    }
  };

  if (step === 'select') {
    // Ensure we have valid stories array
    const validStories = Array.isArray(searchResults) ? searchResults : [];
    return (
      <PlaylistStorySelector
        stories={validStories}
        selectedStories={selectedStories}
        onToggle={handleStoryToggle}
        onContinue={handleContinue}
        onBack={() => setStep('input')}
        loading={loading}
      />
    );
  }

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/playlists');
    }
  };

  return (
    <div className="playlist-creator">
      <div className="playlist-creator-header">
        <button className="playlist-creator-back" onClick={handleBack}>
          ← Back
        </button>
        <h2 className="playlist-creator-title">Create New Plailist</h2>
      </div>

      <div className="playlist-creator-content">
        <div className="playlist-creator-prompt-section">
          <label className="playlist-creator-label">
            What would you like in your plailist today?
          </label>
          <textarea
            className="playlist-creator-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Finance monthly review for US stores, Sales performance highlights..."
            rows={4}
          />
        </div>

        <div className="playlist-creator-examples">
          <div className="playlist-creator-examples-label">Example queries:</div>
          <div className="playlist-creator-examples-list">
            {EXAMPLE_QUERIES.map((example, index) => (
              <button
                key={index}
                className="playlist-creator-example"
                onClick={() => handleExampleClick(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="playlist-creator-actions">
          <button
            className="playlist-creator-search-btn"
            onClick={handleSearch}
            disabled={!prompt.trim() || loading}
          >
            {loading ? 'Searching...' : 'Search Stories'}
          </button>
        </div>
      </div>
    </div>
  );
}
