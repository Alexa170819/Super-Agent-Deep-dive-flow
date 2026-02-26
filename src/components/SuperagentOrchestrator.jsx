import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Modal from './Modal';
import LeversTemplate from '../templates/LeversTemplate';
import IRDecisionTemplate from '../templates/IRDecisionTemplate';
import ProgressBarTemplate from '../templates/ProgressBarTemplate';
import GetMoneyTemplate from '../templates/GetMoneyTemplate';
import ImplementationCardDetailModal from './ImplementationCardDetailModal';
import AgentHeader from './AgentHeader';
import MobileStatusHeader from '../assets/mobilestatusheader_black.svg';
import { useInsightEvaluation } from '../hooks/useInsightEvaluation';
import { useRole, getRoleDisplayName } from '../contexts/RoleContext';
import { executeDecision } from '../services/decisionTrackingService';
import './agent.css';
import './superagent.css';

// Helper function to get nested data by path
const getDataByPath = (data, path) => {
  if (!path) return data;
  return path.split('.').reduce((obj, key) => obj?.[key], data);
};

// Determine template type for an implementation page (same logic as ScenarioModal)
const getImplPageType = (impl) => {
  if (impl.items && impl.items.length > 0 && impl.items[0].label) {
    return 'getMoney';
  }
  const hasProgressBars = impl.sections?.some(
    section => section.items && section.items.some(item => item.barSize || item.barLength)
  );
  if (hasProgressBars) {
    return 'progressBar';
  }
  return 'implementation';
};

export default function SuperagentOrchestrator({ config, data, storyContext, decisionContext, onDecisionExecuted }) {
  const superagentConfig = config.superagent || {};
  const { role } = useRole();

  // Resolve data paths
  const triggerData = getDataByPath(data, 'trigger');
  let insightsData = getDataByPath(data, superagentConfig.overview?.dataPath || 'insights');
  const scenariosData = getDataByPath(data, superagentConfig.opportunity?.leversDataPath || 'scenarios');
  const followUpData = getDataByPath(data, superagentConfig.followUp?.dataPath || 'followUp');
  let headerTitle = getDataByPath(data, superagentConfig.header?.titleDataPath || 'trigger.subtitle');
  let contextTabs = superagentConfig.header?.contextTabs || [];
  
  // Debug: Log scenariosData for UK stories and whenever it changes
  useEffect(() => {
    console.log('SuperagentOrchestrator - scenariosData updated:', scenariosData);
    console.log('SuperagentOrchestrator - timeperiods:', scenariosData?.timeperiods);
    console.log('SuperagentOrchestrator - strategies:', scenariosData?.strategies);
    console.log('SuperagentOrchestrator - data object keys:', Object.keys(data || {}));
    console.log('SuperagentOrchestrator - data.scenarios:', data?.scenarios);
  }, [scenariosData, data]);
  
  // Debug: Log scenariosData for UK stories
  if (storyContext?.rawData?.country === 'UK') {
    console.log('UK Story - scenariosData:', scenariosData);
    console.log('UK Story - timeperiods:', scenariosData?.timeperiods);
    console.log('UK Story - strategies:', scenariosData?.strategies);
  }

  // Enhance with story/decision context if provided
  if (storyContext || decisionContext) {
    const context = decisionContext || storyContext;
    
    // Update header title with story/decision title (prioritize story title)
    // For UK stories, use a shorter, cleaner title
    if (storyContext?.rawData?.country === 'UK' || storyContext?.rawData?.metadata?.country === 'UK') {
      // Use the primary action title or a clean version
      headerTitle = storyContext.primaryAction?.title || 
                   storyContext.title?.replace('Saint Laurent UK: ', '') || 
                   'UK Strategic Review';
    } else if (storyContext?.title) {
      headerTitle = storyContext.title;
    } else if (context?.title) {
      headerTitle = context.title;
    }
    
    // Update context tabs based on story context
    if (storyContext?.rawData?.country === 'UK' || storyContext?.rawData?.metadata?.country === 'UK') {
      // For UK story, show relevant context
      const roleDisplayName = getRoleDisplayName(role);
      contextTabs = ['Strategic Review', `${roleDisplayName} Agent`];
    } else if (storyContext?.type === 'regional_opportunity') {
      const roleDisplayName = getRoleDisplayName(role);
      contextTabs = ['Opportunity', `${roleDisplayName} Agent`];
    }
    
    // Enhance insights with story narrative
    if (storyContext?.narrative) {
      if (!insightsData || !insightsData.sections) {
        insightsData = { sections: [] };
      }
      // Prepend story narrative to overview
      insightsData.sections = [
        {
          title: 'Context',
          content: storyContext.narrative
        },
        ...(insightsData.sections || [])
      ];
    }
  }

  // State
  const [expanded, setExpanded] = useState(false);
  const [agentState, setAgentState] = useState({});
  const [modals, setModals] = useState({
    levers: false,
    implCard: null, // index of the implementation card modal to show
  });

  // Initialize selected strategy to aggressive (first item)
  useEffect(() => {
    const defaultTimePeriod = scenariosData?.timeperiods?.[0];
    const strategies = scenariosData?.strategies?.[defaultTimePeriod] || [];
    const aggressive = strategies.find(s => s.id === 'aggressive') || strategies[0];
    if (aggressive && !agentState.selectedStrategy) {
      setAgentState(prev => ({
        ...prev,
        selectedTimePeriod: defaultTimePeriod,
        selectedStrategy: aggressive,
      }));
    }
  }, [scenariosData]);

  const selectedStrategy = agentState.selectedStrategy;
  // Support both impact (generic) and primaryMetric (UK-specific) structures
  const impactData = selectedStrategy?.impact || {
    primaryMetric: selectedStrategy?.primaryMetric,
    chart: selectedStrategy?.chart
  };
  
  // For UK stories, only show the first implementation card (the relevant one)
  // Filter out generic implementation cards that don't make sense
  let implementationSections = selectedStrategy?.implementation?.[0]?.sections || [];
  if (storyContext?.rawData?.country === 'UK' || storyContext?.rawData?.metadata?.country === 'UK') {
    // Only keep the first card for UK stories
    implementationSections = implementationSections.slice(0, 1);
  }

  // Handle state changes from LeversTemplate
  const handleStateChange = (updates) => {
    setAgentState(prev => ({ ...prev, ...updates }));
  };

  // Handle actions from LeversTemplate (intercept openModal scenario)
  const handleLeversAction = (action) => {
    if (action.type === 'openModal' && action.modalId === 'scenario') {
      // "APPLY STRATEGY" was clicked — close the levers modal
      // agentState.selectedStrategy is already updated by LeversTemplate
      setModals(prev => ({ ...prev, levers: false }));
    }
  };

  // Open levers modal
  const openLeversModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    console.log('Opening levers modal');
    console.log('scenariosData:', scenariosData);
    console.log('scenariosData?.timeperiods:', scenariosData?.timeperiods);
    console.log('scenariosData?.strategies:', scenariosData?.strategies);
    console.log('data prop:', data);
    setModals(prev => ({ ...prev, levers: true }));
  };

  // Open implementation card modal
  const openImplCardModal = (index) => {
    setModals(prev => ({ ...prev, implCard: index }));
  };

  // Close implementation card modal
  const closeImplCardModal = () => {
    setModals(prev => ({ ...prev, implCard: null }));
  };

  // Handle execute decision
  const handleExecuteDecision = () => {
    const decisionData = {
      decisionId: decisionContext?.decisionId || storyContext?.storyId || `decision-${Date.now()}`,
      storyId: storyContext?.storyId || decisionContext?.storyId || null,
      role: role,
      selectedStrategy: selectedStrategy,
      expectedOutcome: impactData || decisionContext?.expectedOutcome || {},
      agentId: config.id || 'cfo-cash-optimizer',
      category: storyContext?.category || decisionContext?.category || '.pro',
      title: headerTitle || storyContext?.title || decisionContext?.title || 'Decision Execution'
    };
    
    const executed = executeDecision(decisionData);
    console.log('Decision executed:', executed);
    
    // Show confirmation (could be a toast or modal)
    alert(`Decision executed successfully!\n\nYou will receive an impact update in 2 weeks.`);
    
    // Callback if provided
    if (onDecisionExecuted) {
      onDecisionExecuted(executed);
    }
  };

  // Build overview text with enhanced context for UK stories
  let overviewText = '';
  
  // For UK stories, build a comprehensive overview
  if (storyContext?.rawData?.country === 'UK' || storyContext?.rawData?.metadata?.country === 'UK') {
    const keringData = storyContext.rawData;
    const metrics = keringData.metrics || {};
    const revenue = metrics.revenue || 0;
    const revenue2024 = metrics.revenue2024 || 0;
    const absoluteDecline = revenue2024 - revenue;
    const yoyChange = metrics.yoyChange2024 || 0;
    
    overviewText = `${storyContext.narrative || ''}\n\n`;
    overviewText += `Financial Impact: Revenue decline ${(yoyChange * 100).toFixed(1)}% (€${(absoluteDecline / 1000000).toFixed(1)}M) vs 2024. `;
    overviewText += `UK represents ${((metrics.shareOfRegion || 0.076) * 100).toFixed(1)}% of Western Europe revenue. `;
    overviewText += `Key issues: ${(metrics.outletExposure * 100).toFixed(1)}% outlet exposure (vs regional avg ~19%), `;
    overviewText += `${(metrics.conversionRate * 100).toFixed(2)}% conversion rate (lowest in Western Europe). `;
    if (metrics.bicesterLoss) {
      overviewText += `Bicester Outlet alone lost €${(metrics.bicesterLoss / 1000000).toFixed(1)}M.`;
    }
    overviewText += `\n\n${keringData.context?.strategicContext || 'The UK cannot remain a 48% outlet market for a Maison of Saint Laurent\'s positioning.'}`;
  } else if (storyContext?.narrative) {
    overviewText = storyContext.narrative;
  } else if (triggerData?.description) {
    overviewText = triggerData.description;
  } else if (insightsData?.sections?.[0]?.content) {
    // Fallback to first insights section
    overviewText = insightsData.sections[0].content;
  }

  // Evaluate insights when displayed
  useInsightEvaluation(insightsData, config.id, true);

  // Chart config
  const chartData = impactData?.chart?.data || [];
  const chartLegend = impactData?.chart?.legend;
  const xKey = impactData?.chart?.xKey || 'quarter';

  return (
    <div
      style={{
        border: '1px solid #333333',
        width: '375px',
        height: '812px',
        marginTop: '20px',
        margin: '20px auto 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #001a12 0%, #000000 100%)',
      }}
    >
      {/* Scrollable content area */}
      <div className="superagent-container">

      {/* ===== HEADER ===== */}
      <div className="superagent-header">
        <img
          src={MobileStatusHeader}
          alt="Status"
          style={{ width: '375px', height: '48px', display: 'block', flexShrink: 0 }}
        />
        <AgentHeader title={headerTitle || 'Superagent'} />

        {/* Context Tabs */}
        {contextTabs.length > 0 && (
          <div className="superagent-context-tabs">
            {contextTabs.map((tab, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {i > 0 && <span className="superagent-context-tab-separator">/</span>}
                <span className="superagent-context-tab">
                  <span className="superagent-context-tab-text">{tab}</span>
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ===== OVERVIEW SECTION ===== */}
      <div className="superagent-section">
        <div className="superagent-section-header">
          <div className="superagent-section-icon">&#9889;</div>
          <div className="superagent-section-title">Overview</div>
        </div>
        <div className="superagent-overview">
          <div className={`superagent-overview-text ${!expanded ? 'collapsed' : ''}`}>
            {overviewText}
          </div>
          <button
            className="superagent-know-more"
            onClick={() => setExpanded(prev => !prev)}
          >
            {expanded ? 'SHOW LESS' : 'KNOW MORE'}
          </button>
        </div>
      </div>

      <div className="superagent-section-divider" />

      {/* ===== OPPORTUNITY SECTION ===== */}
      <div className="superagent-section">
        <div className="superagent-section-header">
          <div className="superagent-section-icon">&#9889;</div>
          <div className="superagent-section-title">Opportunity</div>
        </div>
        <div className="superagent-opportunity">
          {/* Recommended Strategy Tag */}
          <div className="superagent-opportunity-tag">
            <span className="superagent-opportunity-tag-text">
              Recommended Strategy
            </span>
          </div>

          {/* Primary metric */}
          <div className="superagent-opportunity-title">
            {impactData?.primaryMetric?.title}
          </div>
          <div className="superagent-opportunity-metric">
            {impactData?.primaryMetric?.value}
          </div>

          {/* Chart */}
          {chartData.length > 0 && chartLegend && (
            <div className="superagent-chart-container">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey={xKey}
                    stroke="rgba(255,255,255,0.5)"
                    style={{ fontSize: '0.7rem' }}
                  />
                  <YAxis
                    orientation="right"
                    stroke="rgba(255,255,255,0.5)"
                    style={{ fontSize: '0.7rem' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0,0,0,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.7rem' }} />
                  <Bar dataKey="baseline" fill="#FF8C00" name={chartLegend.baseline} />
                  <Bar dataKey="forecast" fill="#00ffb3" name={chartLegend.forecast} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Strategy description */}
          {selectedStrategy?.description && (
            <div className="superagent-opportunity-desc">
              {selectedStrategy.description}
            </div>
          )}

          {/* Explore Strategies Button */}
          <div 
            className="superagent-explore-btn" 
            onClick={(e) => {
              e.stopPropagation();
              openLeversModal(e);
            }}
          >
            <span className="superagent-explore-btn-text">EXPLORE STRATEGIES</span>
          </div>
        </div>
      </div>

      <div className="superagent-section-divider" />

      {/* ===== IMPLEMENTATION ROAD SECTION ===== */}
      <div className="superagent-section">
        <div className="superagent-section-header">
          <div className="superagent-section-icon">&#9889;</div>
          <div className="superagent-section-title">Implementation Road</div>
        </div>
        {implementationSections.map((section, i) => (
          <div
            key={i}
            className="superagent-card"
            onClick={() => openImplCardModal(i)}
          >
            <div className="superagent-card-content">
              <div className="superagent-card-category">{section.category}</div>
              <div className="superagent-card-title">{section.title}</div>
              <div className="superagent-card-metric">{section.value}</div>
            </div>
            <div className="superagent-card-chevron">&#8250;</div>
          </div>
        ))}
      </div>

      <div className="superagent-section-divider" />

      {/* ===== IMPLEMENT OPPORTUNITY CTA ===== */}
      <div style={{ padding: '16px' }}>
        <div 
          className="superagent-cta"
          onClick={handleExecuteDecision}
          style={{ cursor: 'pointer' }}
        >
          <div className="superagent-cta-bg" />
          <span className="superagent-cta-text">EXECUTE DECISION</span>
        </div>
      </div>

      <div className="superagent-section-divider" />

      {/* ===== FOLLOW UP SECTION ===== */}
      {followUpData && followUpData.length > 0 && (
        <>
          <div className="superagent-section">
            <div className="superagent-section-header">
              <div className="superagent-section-icon">&#9889;</div>
              <div className="superagent-section-title">Follow Up</div>
            </div>
            {followUpData.map((item, i) => (
              <div key={i} className="superagent-followup-item">
                <div className="superagent-followup-text">{item.question}</div>
                <div className="superagent-followup-chevron">&#8250;</div>
              </div>
            ))}
          </div>
          <div className="superagent-section-divider" />
        </>
      )}

      {/* ===== FEEDBACK SECTION ===== */}
      <div className="superagent-section">
        <div className="superagent-section-header">
          <div className="superagent-section-icon">&#9889;</div>
          <div className="superagent-section-title">Feedback</div>
        </div>
        <div className="superagent-feedback">
          <div className="superagent-feedback-question">Was this useful?</div>
          <div className="superagent-feedback-buttons">
            <div className="superagent-feedback-btn">
              <span className="superagent-feedback-btn-text">Yes</span>
            </div>
            <div className="superagent-feedback-btn">
              <span className="superagent-feedback-btn-text">No</span>
            </div>
          </div>
          <textarea
            className="superagent-feedback-input"
            placeholder="Tell us more..."
            rows={2}
          />
        </div>
      </div>

      <div className="superagent-bottom-spacer" />

      </div>{/* End scrollable content area */}

      {/* ===== MODALS (rendered outside scroll container, inside fixed frame) ===== */}

      {/* Levers Modal - Render in portal to avoid z-index conflicts */}
      {modals.levers && createPortal(
        (() => {
          // Check if we have valid scenarios data
          const hasValidData = scenariosData && scenariosData.timeperiods && scenariosData.strategies;
          
          if (hasValidData) {
            return (
              <Modal
                isOpen={modals.levers}
                onClose={() => {
                  console.log('Closing levers modal');
                  setModals(prev => ({ ...prev, levers: false }));
                }}
                height={752}
                showHandle={true}
              >
                <LeversTemplate
                  data={{ ...scenariosData, cta: 'APPLY STRATEGY' }}
                  onAction={handleLeversAction}
                  agentState={agentState}
                  onStateChange={handleStateChange}
                  isModal={true}
                />
              </Modal>
            );
          } else {
            // Show debug modal if data is missing
            return (
              <Modal
                isOpen={true}
                onClose={() => {
                  console.log('Closing debug modal');
                  setModals(prev => ({ ...prev, levers: false }));
                }}
                height={752}
                showHandle={true}
              >
                <div style={{ padding: '24px', color: '#fff' }}>
                  <h2 style={{ marginBottom: '16px' }}>No Strategies Available</h2>
                  <div style={{ marginBottom: '12px' }}>
                    <p><strong>Scenarios data:</strong> {scenariosData ? 'exists' : 'missing'}</p>
                    <p><strong>Timeperiods:</strong> {scenariosData?.timeperiods ? 'exists' : 'missing'}</p>
                    <p><strong>Strategies:</strong> {scenariosData?.strategies ? 'exists' : 'missing'}</p>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <p><strong>Full data object:</strong></p>
                    <pre style={{ fontSize: '11px', overflow: 'auto', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', maxHeight: '400px' }}>
                      {JSON.stringify({ scenariosData, dataKeys: Object.keys(data || {}) }, null, 2)}
                    </pre>
                  </div>
                </div>
              </Modal>
            );
          }
        })(),
        document.body
      )}

      {/* Implementation Card Modals */}
      {modals.implCard !== null && (() => {
        // For UK stories with enhanced data, use the detailed modal
        const isUKStory = storyContext?.rawData?.country === 'UK' || storyContext?.rawData?.metadata?.country === 'UK';
        if (isUKStory && implementationSections[modals.implCard]) {
          const section = implementationSections[modals.implCard];
          // Check if section has enhanced data (description, correlatedTasks, etc.)
          if (section.description || section.correlatedTasks) {
            return createPortal(
              <Modal
                isOpen={true}
                onClose={closeImplCardModal}
                height={752}
                showHandle={true}
              >
                <ImplementationCardDetailModal 
                  section={section} 
                  onClose={closeImplCardModal}
                />
              </Modal>,
              document.body
            );
          }
        }

        // For other stories, use existing templates
        if (selectedStrategy?.implementation) {
          const implPages = selectedStrategy.implementation;
          const pageIndex = modals.implCard < implPages.length ? modals.implCard : 0;
          const implPage = implPages[pageIndex];
          if (!implPage) return null;

          const pageType = getImplPageType(implPage);

          return (
            <Modal
              isOpen={true}
              onClose={closeImplCardModal}
              height={752}
            >
              {pageType === 'getMoney' && (
                <GetMoneyTemplate data={implPage} />
              )}
              {pageType === 'progressBar' && (
                <ProgressBarTemplate data={implPage} />
              )}
              {pageType === 'implementation' && (
                <IRDecisionTemplate data={implPage} />
              )}
            </Modal>
          );
        }

        return null;
      })()}
    </div>
  );
}
