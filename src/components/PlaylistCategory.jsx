/**
 * PlaylistCategory Component
 * Displays horizontal row of playlist cards for a category
 */

import { useNavigate } from 'react-router-dom';
import PlaylistCard from './PlaylistCard';
import './playlistCategory.css';

export default function PlaylistCategory({ category, playlists, onSeeAll }) {
  const navigate = useNavigate();
  
  const handleSeeAll = () => {
    if (onSeeAll) {
      onSeeAll(category);
    } else {
      // Navigate to filtered view or show all playlists in category
      navigate(`/playlists?category=${encodeURIComponent(category)}`);
    }
  };

  if (!playlists || playlists.length === 0) {
    return null;
  }

  return (
    <div className="playlist-category">
      <div className="playlist-category-header">
        <h3 className="playlist-category-title">{category}</h3>
        <button className="playlist-category-see-all" onClick={handleSeeAll}>
          See all
        </button>
      </div>
      <div className="playlist-category-cards">
        {playlists.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
