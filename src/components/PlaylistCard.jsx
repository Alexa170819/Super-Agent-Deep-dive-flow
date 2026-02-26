/**
 * PlaylistCard Component
 * Individual playlist card matching screenshot design
 */

import { useNavigate } from 'react-router-dom';
import './playlistCard.css';

export default function PlaylistCard({ playlist, onClick }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick(playlist);
    } else {
      navigate(`/playlists/${playlist.id}`);
    }
  };

  const theme = playlist.theme || {};
  const primaryColor = theme.primary || '#48FF9B';
  const secondaryColor = theme.secondary || 'rgba(72, 255, 155, 0.15)';

  return (
    <div
      className="playlist-card"
      onClick={handleClick}
      style={{
        background: `linear-gradient(135deg, ${secondaryColor} 0%, rgba(0, 0, 0, 0.8) 100%)`,
        borderColor: primaryColor
      }}
    >
      <div className="playlist-card-content">
        <div className="playlist-card-name">{playlist.name}</div>
        {playlist.description && (
          <div className="playlist-card-description">{playlist.description}</div>
        )}
      </div>
    </div>
  );
}
