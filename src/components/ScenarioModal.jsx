import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import TrialScenarioTemplate from '../templates/TrialScenarioTemplate';
import IRDecisionTemplate from '../templates/IRDecisionTemplate';
import ProgressBarTemplate from '../templates/ProgressBarTemplate';
import TRTAssessmentTemplate from '../templates/TRTAssessmentTemplate';
import GetMoneyTemplate from '../templates/GetMoneyTemplate';
import NavigationDots from './NavigationDots';
import './agent.css';

export default function ScenarioModal({ isOpen, onClose, strategy }) {
  const [currentPage, setCurrentPage] = useState(0);

  // Build the pages array (do this before conditional return)
  const pages = strategy ? [
    { type: 'impact', data: strategy.impact },
    ...strategy.implementation.map(impl => {
      // Check if it's a GetMoney template (has items array with label/description)
      if (impl.items && impl.items.length > 0 && impl.items[0].label) {
        return { type: 'getMoney', data: impl };
      }
      // Check if any section has items with progress bars
      const hasProgressBars = impl.sections?.some(section => section.items && section.items.some(item => item.barSize || item.barLength));
      
      if (hasProgressBars) {
        return { type: 'progressBar', data: impl };
      } else {
        return { type: 'implementation', data: impl };
      }
    }),
    { type: 'assessment', data: strategy.assessment }
  ] : [];

  const totalPages = pages.length;

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

  const handleCommit = () => {
    // Move to implementation when "LET'S DO IT!" is clicked
    goToNextPage();
  };

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  // IMPORTANT: Call hooks BEFORE any conditional returns
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

  // NOW we can do conditional returns
  if (!isOpen || !strategy) {
    return null;
  }

  const currentPageData = pages[currentPage];

  return (
    <div className="modal-overlay scenario-modal-overlay" onClick={handleClose}>
      <div 
        className="modal-container scenario-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          height: '757px',
          maxHeight: '757px'
        }}
      >
        <div className="modal-header">
          <button className="modal-close" onClick={handleClose}>
            ✕
          </button>
        </div>
        <div className="modal-content scenario-modal-content" {...handlers}>
          <div className="modal-pages-wrapper">
            <div 
              className="modal-slides"
              style={{
                display: 'flex',
                width: `${totalPages * 100}%`,
                transform: `translateX(-${(currentPage / totalPages) * 100}%)`,
                transition: 'transform 0.3s ease-out',
                pointerEvents: 'auto'
              }}
            >
              {pages.map((page, index) => (
                <div 
                  key={index} 
                  className="modal-slide"
                  style={{
                    width: `${100 / totalPages}%`,
                    flexShrink: 0
                  }}
                >
                  {page.type === 'impact' && (
                    <TrialScenarioTemplate
                      data={page.data}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onCommit={handleCommit}
                    />
                  )}
                  {page.type === 'implementation' && (
                    <IRDecisionTemplate
                      data={page.data}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  )}
                  {page.type === 'progressBar' && (
                    <ProgressBarTemplate
                      data={page.data}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  )}
                  {page.type === 'getMoney' && (
                    <GetMoneyTemplate
                      data={page.data}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  )}
                  {page.type === 'assessment' && (
                    <TRTAssessmentTemplate
                      data={page.data}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Dots - Shared across all modal pages */}
        <NavigationDots total={totalPages} current={currentPage} style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          flexShrink: 0,
          zIndex: 10
        }} />
      </div>
    </div>
  );
}

