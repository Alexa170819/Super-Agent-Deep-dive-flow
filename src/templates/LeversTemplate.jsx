import { useState, useEffect } from 'react';
import AgentHeader from '../components/AgentHeader';
import '../components/agent.css';
import MobileStatusHeader from '../assets/mobilestatusheader_black.svg';

export default function LeversTemplate({
  data,
  currentPage,
  totalPages,
  onAction,
  agentState,
  onStateChange,
  isModal
}) {
  // Detect format: scenarios array (inventory format) vs strategies object (original format)
  const isScenariosFormat = Array.isArray(data.scenarios);
  
  // Scenarios format (inventory style)
  const scenarios = isScenariosFormat ? (data.scenarios || []) : [];
  const currentScenarioIndex = isScenariosFormat ? (agentState?.scenarioIndex ?? 0) : 0;
  const currentScenario = scenarios[currentScenarioIndex] || scenarios[0];
  const totalPositions = scenarios.length;
  
  // Strategies format (original style)
  const selectedTimePeriod = !isScenariosFormat ? (agentState?.selectedTimePeriod || data.timeperiods?.[0] || '') : '';
  const strategies = !isScenariosFormat ? (data.strategies?.[selectedTimePeriod] || data.strategies?.[''] || []) : [];
  const balancedStrategy = strategies.find(s => s.id === 'balanced');
  const aggressiveStrategy = strategies.find(s => s.id === 'aggressive');
  const selectedStrategy = !isScenariosFormat ? agentState?.selectedStrategy : null;
  
  // Determine which position the lever should be in (0 = balanced/left, 1 = aggressive/right)
  const leverPosition = selectedStrategy?.id === 'aggressive' ? 1 : 0;

  // Set default for strategies format
  useEffect(() => {
    if (!isScenariosFormat && !selectedStrategy && aggressiveStrategy && onStateChange) {
      onStateChange({ selectedStrategy: aggressiveStrategy });
    }
    // Set default scenario index for scenarios format
    if (isScenariosFormat && agentState?.scenarioIndex === undefined && scenarios.length > 0 && onStateChange) {
      onStateChange({ scenarioIndex: 0 });
    }
  }, [selectedStrategy, aggressiveStrategy, onStateChange, isScenariosFormat, scenarios.length, agentState?.scenarioIndex]);

  const handleTimePeriodChange = (period) => {
    if (onStateChange) {
      onStateChange({ 
        selectedTimePeriod: period,
        selectedStrategy: null // Reset strategy when changing time period
      });
    }
  };

  const handleStrategyChange = (strategy) => {
    if (onStateChange) {
      onStateChange({ selectedStrategy: strategy });
    }
  };

  const handleScenarioChange = (index) => {
    if (isScenariosFormat && onStateChange) {
      onStateChange({ scenarioIndex: index });
    }
  };

  const handleLeverChange = (position) => {
    if (isScenariosFormat) {
      // For scenarios format, position maps to scenario index
      if (position < scenarios.length) {
        handleScenarioChange(position);
      }
    } else {
      // Original format: position maps to balanced/aggressive
      if (position === 0 && balancedStrategy) {
        handleStrategyChange(balancedStrategy);
      } else if (position === 1 && aggressiveStrategy) {
        handleStrategyChange(aggressiveStrategy);
      }
    }
  };

  const handleOpenScenario = () => {
    if (onAction) {
      onAction({ type: 'openModal', modalId: 'scenario' });
    }
  };

  const currentStrategy = isScenariosFormat ? currentScenario : (selectedStrategy || aggressiveStrategy);

  return (
    <div className="agent-page decision-levers-page" style={{
      position: 'relative',
      width: isModal ? '100%' : '375px',
      height: isModal ? '100%' : '812px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0px',
      justifyContent: 'flex-start',
      overflow: isModal ? 'auto' : 'hidden'
    }}>
      {/* Mobile Status Header - hidden in modal */}
      {!isModal && (
        <img
          src={MobileStatusHeader}
          alt="Mobile Status Header"
          style={{
            width: '375px',
            height: '48px',
            display: 'block',
            flexShrink: 0
          }}
        />
      )}

      {/* Agent Header - hidden in modal */}
      {!isModal && (
        <AgentHeader title={data.headerTitle || "Decision Levers"} subtitle={data.subtitle} />
      )}

      {/* Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: isModal ? '8px 24px 0' : '0px 32px',
        gap: isScenariosFormat ? '24px' : '16px',
        width: isModal ? '100%' : '375px',
        flex: 1,
        overflow: 'auto',
        boxSizing: 'border-box'
      }}>
        {/* Headline - Decision Levers */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px',
          width: '311px',
          height: '26px'
        }}>
          <div style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '110%',
            color: '#FFFFFF',
            whiteSpace: 'nowrap'
          }}>
            Decision Levers
          </div>
        </div>

        {/* Time Period Selector - Only show if timeperiods exists and has more than 1 item */}
        {!isScenariosFormat && data.timeperiods && data.timeperiods.length > 1 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            gap: '10px',
            width: '311px',
            height: '84px',
            background: 'rgba(64, 64, 64, 0.5)',
            borderRadius: '20px',
            flex: 'none',
            order: 0,
            alignSelf: 'stretch',
            flexGrow: 0
          }}>
            {/* Segmented Control */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px',
              gap: '4px',
              width: '271px',
              height: '44px',
              background: '#000000',
              boxShadow: 'inset 0px -0.5px 1px rgba(255, 255, 255, 0.3), inset 0px -0.5px 1px rgba(255, 255, 255, 0.25), inset 1px 1.5px 4px rgba(0, 0, 0, 0.08), inset 1px 1.5px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '100px',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0
            }}>
              {data.timeperiods.map((period) => (
                <button
                  key={period}
                  onClick={() => handleTimePeriodChange(period)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0px 8px',
                    gap: '3px',
                    width: '129.5px',
                    height: '36px',
                    background: selectedTimePeriod === period 
                      ? 'linear-gradient(0deg, rgba(94, 94, 94, 0.18), rgba(94, 94, 94, 0.18)), rgba(255, 255, 255, 0.06)'
                      : '#000000',
                    backgroundBlendMode: selectedTimePeriod === period ? 'color-dodge, lighten' : 'normal',
                    boxShadow: selectedTimePeriod === period ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                    borderRadius: selectedTimePeriod === period ? '20px' : '100px',
                    border: 'none',
                    cursor: 'pointer',
                    flex: 'none',
                    order: data.timeperiods.indexOf(period),
                    flexGrow: 1
                  }}
                >
                  <div style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '110%',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: selectedTimePeriod === period 
                      ? 'rgba(255, 255, 255, 0.96)'
                      : 'rgba(84, 84, 84, 0.96)',
                    flex: 'none',
                    order: 1,
                    flexGrow: 0
                  }}>
                    {period}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scenario/Strategy name label */}
        {currentStrategy && (
          <div style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontStyle: 'normal',
            fontWeight: 510,
            fontSize: '14px',
            lineHeight: '120%',
            textAlign: 'center',
            color: '#FFFFFF',
            marginBottom: isScenariosFormat ? '0' : '-24px'
          }}>
            {currentStrategy.name}
          </div>
        )}

        {/* Giant pill showing current strategy/scenario metrics */}
        {currentStrategy && (
          <div className="strategy-pill" style={{
            padding: '8px 24px',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {isScenariosFormat ? (
              // Scenarios format: OOS Value and Markdown Value
              <>
                <div className="pill-metric">
                  <div className="pill-metric-value" style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '110%',
                    textAlign: 'center',
                    color: '#FF3469'
                  }}>{currentStrategy.metrics.oosValue.value}</div>
                  <div className="pill-metric-label" style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '120%',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    textTransform: 'none'
                  }}>{currentStrategy.metrics.oosValue.label}</div>
                </div>
                <div className="pill-metric">
                  <div className="pill-metric-value" style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '110%',
                    textAlign: 'center',
                    color: '#48FF9B'
                  }}>{currentStrategy.metrics.markdownValue.value}</div>
                  <div className="pill-metric-label" style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '120%',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    textTransform: 'none'
                  }}>{currentStrategy.metrics.markdownValue.label}</div>
                </div>
              </>
            ) : (
              // Strategies format: FCF and Conversion Rate
              <>
                <div className={`pill-metric ${currentStrategy.metrics.fcf.positive ? 'positive' : 'negative'}`}>
                  <div className="pill-metric-value" style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '110%',
                    textAlign: 'center',
                    color: currentStrategy.metrics.fcf.positive ? '#48FF9B' : '#FF6B8A'
                  }}>{currentStrategy.metrics.fcf.value}</div>
                  <div className="pill-metric-label" style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '120%',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    textTransform: 'none'
                  }}>{currentStrategy.metrics.fcf.label}</div>
                </div>
                <div className={`pill-metric ${currentStrategy.metrics.conversionRate.positive ? 'positive' : 'negative'}`}>
                  <div className="pill-metric-value" style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '110%',
                    textAlign: 'center',
                    color: currentStrategy.metrics.conversionRate.positive ? '#48FF9B' : '#FF6B8A'
                  }}>{currentStrategy.metrics.conversionRate.value}</div>
                  <div className="pill-metric-label" style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '120%',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    textTransform: 'none'
                  }}>{currentStrategy.metrics.conversionRate.label}</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Scenarios format: Coverage and STR sliders */}
        {isScenariosFormat && scenarios.length > 0 && (
          <>
            {/* Coverage Slider */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              width: '100%'
            }}>
              <div style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                color: '#FFFFFF',
                textAlign: 'center'
              }}>
                Coverage (weeks)
              </div>
              
              <div style={{
                position: 'relative',
                width: '280px',
                height: '40px'
              }}>
                {/* Track */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '20px',
                  right: '20px',
                  height: '4px',
                  background: 'rgba(166, 166, 166, 0.5)',
                  borderRadius: '2px',
                  transform: 'translateY(-50%)'
                }} />
                
                {/* Active track */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '20px',
                  width: totalPositions > 1 ? `${(currentScenarioIndex / (totalPositions - 1)) * 240}px` : '0px',
                  height: '4px',
                  background: '#48FF9B',
                  borderRadius: '2px',
                  transform: 'translateY(-50%)'
                }} />
                
                {/* Dots for each position */}
                {scenarios.map((scenario, index) => (
                  <div
                    key={index}
                    onClick={() => handleScenarioChange(index)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: totalPositions > 1 ? `${20 + (index / (totalPositions - 1)) * 240}px` : '140px',
                      width: index === currentScenarioIndex ? '28px' : '12px',
                      height: index === currentScenarioIndex ? '28px' : '12px',
                      background: index <= currentScenarioIndex ? '#48FF9B' : 'rgba(166, 166, 166, 0.5)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
              
              {/* Coverage value */}
              <div style={{
                position: 'relative',
                width: '280px',
                height: '20px'
              }}>
                <div style={{
                  position: 'absolute',
                  left: totalPositions > 1 ? `${20 + (currentScenarioIndex / (totalPositions - 1)) * 240}px` : '140px',
                  transform: 'translateX(-50%)',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}>
                  {currentScenario?.coverage}
                </div>
              </div>
            </div>

            {/* Expected Weekly STR Slider */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              width: '100%'
            }}>
              <div style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                color: '#FFFFFF',
                textAlign: 'center'
              }}>
                Expected Weekly STR
              </div>
              
              <div style={{
                position: 'relative',
                width: '280px',
                height: '40px'
              }}>
                {/* Track */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '20px',
                  right: '20px',
                  height: '4px',
                  background: 'rgba(166, 166, 166, 0.5)',
                  borderRadius: '2px',
                  transform: 'translateY(-50%)'
                }} />
                
                {/* Active track */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '20px',
                  width: totalPositions > 1 ? `${(currentScenarioIndex / (totalPositions - 1)) * 240}px` : '0px',
                  height: '4px',
                  background: '#48FF9B',
                  borderRadius: '2px',
                  transform: 'translateY(-50%)'
                }} />
                
                {/* Dots for each position */}
                {scenarios.map((scenario, index) => (
                  <div
                    key={index}
                    onClick={() => handleScenarioChange(index)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: totalPositions > 1 ? `${20 + (index / (totalPositions - 1)) * 240}px` : '140px',
                      width: index === currentScenarioIndex ? '28px' : '12px',
                      height: index === currentScenarioIndex ? '28px' : '12px',
                      background: index <= currentScenarioIndex ? '#48FF9B' : 'rgba(166, 166, 166, 0.5)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
              
              {/* STR value */}
              <div style={{
                position: 'relative',
                width: '280px',
                height: '20px'
              }}>
                <div style={{
                  position: 'absolute',
                  left: totalPositions > 1 ? `${20 + (currentScenarioIndex / (totalPositions - 1)) * 240}px` : '140px',
                  transform: 'translateX(-50%)',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}>
                  {currentScenario?.str}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Strategies format: Binary lever */}
        {!isScenariosFormat && strategies.length > 0 && (
          <div className="strategy-section">
            <h3 style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: 510,
              fontSize: '18px',
              lineHeight: '120%',
              color: '#FFFFFF'
            }}>Strategy</h3>
            
            <div className="strategy-lever-container" style={{ margin: '16px 0' }}>
              <div 
                className="lever-track"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const position = clickX < rect.width / 2 ? 0 : 1;
                  handleLeverChange(position);
                }}
              >
                <div 
                  className="lever-thumb"
                  style={{
                    left: leverPosition === 0 ? '0%' : 'calc(100% - 28px)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeverChange(leverPosition === 0 ? 1 : 0);
                  }}
                />
              </div>
              
              <div className="lever-labels">
                {balancedStrategy && (
                  <button 
                    className={`lever-label ${leverPosition === 0 ? 'active' : ''}`}
                    onClick={() => handleLeverChange(0)}
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 510,
                      fontSize: '14px',
                      lineHeight: '120%',
                      color: leverPosition === 0 ? '#48FF9B' : 'rgba(166, 166, 166, 0.9)'
                    }}
                  >
                    {balancedStrategy.name}
                  </button>
                )}
                {aggressiveStrategy && (
                  <button 
                    className={`lever-label ${leverPosition === 1 ? 'active' : ''}`}
                    onClick={() => handleLeverChange(1)}
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 510,
                      fontSize: '14px',
                      lineHeight: '120%',
                      color: leverPosition === 1 ? '#48FF9B' : 'rgba(166, 166, 166, 0.9)'
                    }}
                  >
                    {aggressiveStrategy.name}
                  </button>
                )}
              </div>
            </div>

            {/* Optional description */}
            {currentStrategy && currentStrategy.description && (
              <div className="strategy-description" style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px 32px',
                gap: '8px',
                width: '375px',
                height: '28px',
                flex: 'none',
                order: 1,
                alignSelf: 'stretch',
                flexGrow: 0
              }}>
                <p className="text-secondary" style={{
                  width: '311px',
                  height: '28px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '120%',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#A6A6A6',
                  flex: 'none',
                  order: 0,
                  flexGrow: 1,
                  margin: 0
                }}>{currentStrategy.description}</p>
              </div>
            )}
          </div>
        )}

        {/* Open Scenario Button */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px',
          gap: '10px',
          width: '311px',
          height: '52px',
          minHeight: '52px',
          flexShrink: 0,
          backdropFilter: 'blur(50px)',
          borderRadius: '40px',
          position: 'relative',
          cursor: 'pointer',
          marginTop: 'auto',
          marginBottom: '12px'
        }}
        onClick={handleOpenScenario}
        >
          {/* Button Style - White background */}
          <div style={{
            position: 'absolute',
            left: '0%',
            right: '0%',
            top: '0%',
            bottom: '0%',
            background: '#FFFFFF',
            borderRadius: '40px'
          }} />
          
          {/* Button Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 0px',
            gap: '8px',
            position: 'absolute',
            width: '116px',
            height: '30px',
            left: 'calc(50% - 116px/2 + 0.5px)',
            top: 'calc(50% - 30px/2)'
          }}>
            {/* Button Text */}
            <div style={{
              width: '116px',
              height: '22px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: 860,
              fontSize: '12px',
              lineHeight: '180%',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#000000',
              flex: 'none',
              order: 1,
              flexGrow: 0,
              whiteSpace: 'nowrap'
            }}>
              {data.cta || "OPEN SCENARIO"}
            </div>
          </div>
        </div>
      </div>

      {/* Footer - hidden in modal */}
      {!isModal && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: '16px 16px 32px',
          width: '375px',
          height: '77px',
          background: '#000000',
          flex: 'none',
          order: 1,
          alignSelf: 'stretch',
          flexGrow: 0
        }}>
        </div>
      )}
    </div>
  );
}
