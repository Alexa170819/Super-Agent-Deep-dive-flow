import { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import NavigationDots from './NavigationDots';
import { templateRegistry } from '../templates/registry';
import './agent.css';

// Helper function to get nested data by path
const getDataByPath = (data, path) => {
  if (!path) return data;
  return path.split('.').reduce((obj, key) => obj?.[key], data);
};

export default function MultiPageModal({ 
  isOpen, 
  onClose, 
  pages, // Array of { template: string, dataPath: string }
  data,  // Full data object to get data from
  height = 750 
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef(0);
  const startScrollYRef = useRef(0);
  const containerRef = useRef(null);

  const totalPages = pages?.length || 0;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNextPage,
    onSwipedRight: goToPrevPage,
    trackMouse: true,
    trackTouch: true,
    delta: 30,
    preventScrollOnSwipe: false,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  });

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  const handleDragStart = (e) => {
    const target = e.currentTarget;
    const scrollableElement = target.closest('[style*="overflow"]') || target;
    startScrollYRef.current = scrollableElement.scrollTop || 0;
    setIsDragging(true);
    startYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const target = e.currentTarget;
    const scrollableElement = target.closest('[style*="overflow"]') || target;
    const currentScrollY = scrollableElement.scrollTop || 0;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const diff = currentY - startYRef.current;
    
    // Only allow drag-to-close if:
    // 1. Dragging down (diff > 0)
    // 2. Content is at the top (scrollTop is 0 or very close to 0)
    if (diff > 0 && startScrollYRef.current <= 5) {
      e.preventDefault();
      setDragY(diff);
    } else if (diff < 0 || currentScrollY > startScrollYRef.current) {
      // User is scrolling up or content is scrolling, cancel drag-to-close
      setIsDragging(false);
      setDragY(0);
    }
  };

  const handleDragEnd = () => {
    if (dragY > 100) {
      handleClose();
    }
    setDragY(0);
    setIsDragging(false);
  };

  if (!isOpen || !pages || pages.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        ref={containerRef}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        style={{
          height: `${height}px`,
          maxHeight: `${height}px`,
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          touchAction: 'pan-y'
        }}
      >
        {/* Drag Handle */}
        <div 
          className="modal-drag-handle"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 0 8px',
            cursor: 'grab',
            touchAction: 'none',
            flexShrink: 0
          }}
        >
          <div style={{
            width: '36px',
            height: '5px',
            borderRadius: '3px',
            background: 'rgba(255, 255, 255, 0.3)'
          }} />
        </div>

        {/* Swipeable Content Area */}
        <div 
          {...handlers}
          style={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div 
            style={{
              display: 'flex',
              width: `${totalPages * 100}%`,
              height: '100%',
              transform: `translateX(-${(currentPage / totalPages) * 100}%)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {pages.map((pageConfig, index) => {
              const Template = templateRegistry[pageConfig.template];
              const pageData = getDataByPath(data, pageConfig.dataPath);

              if (!Template) {
                console.error(`Template "${pageConfig.template}" not found`);
                return null;
              }

              return (
                <div 
                  key={index}
                  style={{
                    width: `${100 / totalPages}%`,
                    height: '100%',
                    flexShrink: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }}
                >
                  <Template data={pageData} isModal={true} onClose={handleClose} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0',
            flexShrink: 0
          }}>
            <NavigationDots total={totalPages} current={currentPage} />
          </div>
        )}
      </div>
    </div>
  );
}
