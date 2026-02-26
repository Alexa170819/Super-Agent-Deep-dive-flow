import { useState, useRef } from 'react';
import ModalHeader from '../components/ModalHeader';
import '../components/agent.css';

export default function LeaderboardModal({ data, onClose }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const containerRef = useRef(null);
  
  const items = data.items || [];
  const currentRank = data.currentRank || '#8';
  const currentPercentage = data.currentPercentage || '52%';
  const currentStore = data.currentStore || 'Avenue Paris Montaigne';

  const handleFilterClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleOptionSelect = (filterIndex, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterIndex]: option
    }));
    setOpenDropdown(null);
  };

  // Drag handlers
  const handleDragStart = (clientY) => {
    setIsDragging(true);
    dragStartY.current = clientY;
  };

  const handleDragMove = (clientY) => {
    if (!isDragging) return;
    const diff = clientY - dragStartY.current;
    // Only allow dragging down
    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // If dragged more than 150px, close the modal
    if (dragY > 150 && onClose) {
      onClose();
    } else {
      // Snap back
      setDragY(0);
    }
  };

  // Mouse events
  const handleMouseDown = (e) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
        transform: `translateY(${dragY}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        opacity: 1 - (dragY / 400)
      }}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={isDragging ? handleMouseUp : undefined}
      onMouseLeave={isDragging ? handleMouseUp : undefined}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Green Glow Effect - Top Right */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(72, 255, 155, 0.35) 0%, rgba(72, 255, 155, 0.15) 35%, rgba(72, 255, 155, 0.05) 55%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />

      {/* Fixed Handle - Draggable Area */}
      <div 
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 0 8px',
          flexShrink: 0,
          cursor: 'grab',
          touchAction: 'none'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div style={{
          width: '36px',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px'
        }} />
      </div>

      {/* Fixed Header Section */}
      <div style={{
        flexShrink: 0,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <ModalHeader 
          title={data.title || "Store Leaderboard"} 
          subtitle={data.subtitle}
        />

        {/* Filter Pills */}
        {data.filters && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            padding: '12px 24px 16px',
            position: 'relative'
          }}>
            {data.filters.map((filter, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div 
                  onClick={() => handleFilterClick(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#31D4B6'
                  }}>
                    {selectedFilters[index] || filter.label}
                  </span>
                  <svg 
                    width="10" 
                    height="6" 
                    viewBox="0 0 10 6" 
                    fill="none"
                    style={{
                      transform: openDropdown === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {openDropdown === index && filter.options && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    marginTop: '8px',
                    background: '#2a2a2a',
                    borderRadius: '12px',
                    padding: '8px 0',
                    minWidth: '150px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                    zIndex: 100,
                    animation: 'fadeIn 0.15s ease-out'
                  }}>
                    {filter.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        onClick={() => handleOptionSelect(index, option)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        {/* Radio circle */}
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: `2px solid ${(selectedFilters[index] || filter.label) === option ? '#31D4B6' : '#666'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {(selectedFilters[index] || filter.label) === option && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: '#31D4B6'
                            }} />
                          )}
                        </div>
                        <span style={{
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 400,
                          fontSize: '14px',
                          color: '#FFFFFF'
                        }}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Current Store Highlight */}
        <div style={{
          padding: '0 24px 16px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
            marginBottom: '4px'
          }}>
            <span style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: '36px',
              color: '#FFFFFF'
            }}>
              {currentRank}
            </span>
            <span style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: '36px',
              color: '#FFFFFF'
            }}>
              {currentPercentage}
            </span>
          </div>
          <div style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            color: '#A6A6A6'
          }}>
            {currentStore}
          </div>
        </div>
      </div>

      {/* Scrollable Table */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1
      }}>
        {items.map((item, index) => {
          // Determine color based on percentage
          const percentValue = parseInt(item.percentage);
          let percentColor = '#48FF9B'; // green for >= 70
          if (percentValue < 50) {
            percentColor = '#FF4D4D'; // red for < 50
          } else if (percentValue < 70) {
            percentColor = '#FF8C00'; // orange for 50-69
          }

          return (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 0',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                gap: '16px'
              }}
            >
              {/* Rank */}
              <div style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                color: '#A6A6A6',
                width: '36px',
                flexShrink: 0
              }}>
                #{item.rank}
              </div>

              {/* Store Name */}
              <div style={{
                flex: 1,
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                color: '#FFFFFF',
                lineHeight: '140%'
              }}>
                {item.name}
              </div>

              {/* Percentage */}
              <div style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                color: percentColor,
                flexShrink: 0
              }}>
                {item.percentage}%
              </div>
            </div>
          );
        })}

        {/* Bottom padding for scroll */}
        <div style={{ height: '24px' }} />
      </div>
    </div>
  );
}
