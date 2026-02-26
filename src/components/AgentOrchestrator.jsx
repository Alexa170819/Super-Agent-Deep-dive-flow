import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Modal from './Modal';
import MultiPageModal from './MultiPageModal';
import ScenarioModal from './ScenarioModal';
import NavigationDots from './NavigationDots';
import { templateRegistry } from '../templates/registry';
import { useInsightEvaluation } from '../hooks/useInsightEvaluation';
import './agent.css';

// Helper function to get nested data by path (e.g., 'welcome' or 'scenarios')
const getDataByPath = (data, path) => {
  if (!path) return data;
  return path.split('.').reduce((obj, key) => obj?.[key], data);
};

// Helper to get initial page from URL query param
const getInitialPage = (totalPages) => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page'), 10);
  if (!isNaN(page) && page >= 0 && page < totalPages) {
    return page;
  }
  return 0;
};

export default function AgentOrchestrator({ config, data }) {
  const totalPages = config.flow.length;
  const [currentPage, setCurrentPage] = useState(() => getInitialPage(totalPages));
  const [modals, setModals] = useState({});
  const [agentState, setAgentState] = useState({});

  // Evaluate insights from current screen and modals
  const currentScreen = config.flow[currentPage];
  const currentScreenData = currentScreen ? getDataByPath(data, currentScreen.dataPath) : null;
  
  // Get insights data from current screen
  const insightsData = currentScreenData?.insights || currentScreenData;
  
  // Evaluate insights when they're displayed
  useInsightEvaluation(insightsData, config.id, true);

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

  // Check if any modal is currently open
  const isAnyModalOpen = Object.values(modals).some(isOpen => isOpen);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Only swipe if no modals are open
      if (!isAnyModalOpen) {
        goToNextPage();
      }
    },
    onSwipedRight: () => {
      // Only swipe if no modals are open and backwards navigation is allowed
      if (!isAnyModalOpen && config.navigation?.allowBackwards !== false) {
        goToPrevPage();
      }
    },
    trackMouse: true,
    trackTouch: true,
    delta: 30,
    preventScrollOnSwipe: true,
    swipeDuration: 1500,
    touchEventOptions: { passive: false }
  });

  // Handle actions from templates (like opening modals)
  const handleAction = (screenConfig, action) => {
    if (action.type === 'openModal') {
      setModals(prev => ({ ...prev, [action.modalId]: true }));
    }
  };

  // Handle modal close
  const handleCloseModal = (modalId) => {
    setModals(prev => ({ ...prev, [modalId]: false }));
  };

  // Handle state changes from stateful templates
  const handleStateChange = (updates) => {
    setAgentState(prev => ({ ...prev, ...updates }));
  };

  // Render a screen based on its configuration
  const renderScreen = (screenConfig, index) => {
    const Template = templateRegistry[screenConfig.template];
    
    if (!Template) {
      console.error(`Template "${screenConfig.template}" not found in registry`);
      return <div>Template not found: {screenConfig.template}</div>;
    }

    const screenData = getDataByPath(data, screenConfig.dataPath);
    
    return (
      <Template
        data={screenData}
        currentPage={index}
        totalPages={totalPages}
        onAction={(action) => handleAction(screenConfig, action)}
        agentState={agentState}
        onStateChange={screenConfig.stateful ? handleStateChange : undefined}
        {...screenConfig.props}
      />
    );
  };

  // Render modals for a screen
  const renderModals = (screenConfig) => {
    if (!screenConfig.modals) return null;

    return screenConfig.modals.map(modalConfig => {
      const isOpen = modals[modalConfig.id] || false;
      
      // Special handling for ScenarioModal (uses existing component with complex flow)
      if (modalConfig.template === 'ScenarioModal') {
        return (
          <ScenarioModal
            key={modalConfig.id}
            isOpen={isOpen}
            onClose={() => handleCloseModal(modalConfig.id)}
            strategy={agentState.selectedStrategy}
          />
        );
      }

      const closeHandler = () => handleCloseModal(modalConfig.id);

      // Multi-page modal handling (when pages array is defined)
      if (modalConfig.pages && modalConfig.pages.length > 0) {
        return (
          <MultiPageModal
            key={modalConfig.id}
            isOpen={isOpen}
            onClose={closeHandler}
            pages={modalConfig.pages}
            data={data}
            height={modalConfig.height || 750}
          />
        );
      }

      // Generic single-page modal handling
      const ModalTemplate = templateRegistry[modalConfig.template];
      
      if (!ModalTemplate) {
        console.error(`Modal template "${modalConfig.template}" not found in registry`);
        return null;
      }

      const modalData = getDataByPath(data, modalConfig.dataPath);

      // Pass agentId to modal for insight evaluation
      const modalProps = {
        ...(modalConfig.template === 'RecommendationsBaseModal' && { agentId: config.id }),
      };

      // Set height for specific templates
      let modalHeight;
      if (modalConfig.template === 'RecommendationsBaseModal') {
        modalHeight = 752;
      } else if (modalConfig.template === 'TrialScenarioTemplate') {
        modalHeight = 750;
      }
      
      // Hide header for templates that use their own handle
      const hideHeader = modalConfig.template === 'LeaderboardModal' || modalConfig.template === 'TrialScenarioTemplate';
      
      // Show drag handle for certain templates
      const showHandle = modalConfig.template === 'TrialScenarioTemplate';

      return (
        <Modal 
          key={modalConfig.id}
          isOpen={isOpen} 
          onClose={closeHandler}
          height={modalHeight}
          hideHeader={hideHeader}
          showHandle={showHandle}
        >
          <ModalTemplate data={modalData} onClose={closeHandler} isModal={true} {...modalProps} />
        </Modal>
      );
    });
  };

  return (
    <div 
      className="agent-container" 
      {...handlers}
      style={{ 
        pointerEvents: isAnyModalOpen ? 'none' : 'auto',
        border: '1px solid #333333',
        width: '375px',
        height: '812px',
        overflow: 'hidden',
        marginTop: '20px',
        position: 'relative'
      }}
    >
      <div className="agent-pages">
        <div 
          className="pages-wrapper"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {config.flow.map((screenConfig, index) => (
            <div key={screenConfig.id} className="page-slide">
              {renderScreen(screenConfig, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots - Fixed at bottom for all main screens */}
      <NavigationDots total={totalPages} current={currentPage} />

      {/* Render modals for current screen */}
      {config.flow[currentPage] && renderModals(config.flow[currentPage])}
    </div>
  );
}
