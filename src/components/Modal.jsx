import { useState, useRef } from 'react';
import './agent.css';

export default function Modal({ isOpen, onClose, children, height, hideHeader, showHandle }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef(0);
  const startScrollYRef = useRef(0);
  const containerRef = useRef(null);

  if (!isOpen) return null;

  const handleDragStart = (e) => {
    const target = e.currentTarget;
    const scrollableElement = target.querySelector('.modal-content') || target;
    startScrollYRef.current = scrollableElement.scrollTop || 0;
    setIsDragging(true);
    startYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const target = e.currentTarget;
    const scrollableElement = target.querySelector('.modal-content') || target;
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
      onClose();
    }
    setDragY(0);
    setIsDragging(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
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
          ...(height ? { height: `${height}px`, maxHeight: `${height}px` } : {}),
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          touchAction: 'pan-y'
        }}
      >
        {/* Drag Handle - always shown when showHandle is true */}
        {(showHandle || hideHeader) && (
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
              touchAction: 'none'
            }}
          >
            <div style={{
              width: '36px',
              height: '5px',
              borderRadius: '3px',
              background: 'rgba(255, 255, 255, 0.3)'
            }} />
          </div>
        )}
        
        {!hideHeader && (
          <div className="modal-header">
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          </div>
        )}
        <div className="modal-content" style={hideHeader ? { padding: 0 } : {}}>
          {children}
        </div>
      </div>
    </div>
  );
}

