import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ModalHeader from '../components/ModalHeader';
import '../components/agent.css';

export default function TrialScenarioTemplate({ data, currentPage, totalPages, onCommit }) {
  // Determine chart type: bar chart (has legend) or line chart (has lines)
  const isBarChart = data.chart?.legend !== undefined;
  const isLineChart = data.chart?.lines !== undefined;
  const xKey = data.chart?.xKey || 'quarter';
  
  return (
    <div className="scenario-page impact-page" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '100%',
      padding: '0px',
      paddingBottom: '60px',
      overflowY: 'auto',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Modal Header */}
      <ModalHeader title={data.title || data.headerTitle} subtitle={data.subtitle} />
      
      {/* Content with padding */}
      <div style={{
        padding: '24px',
        paddingTop: '16px'
      }}>

      <div className="scenario-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--text-primary)',
        minHeight: 0,
        overflowY: 'auto'
      }}>
        <div className="impact-metric" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          width: '100%',
          marginBottom: '12px',
          flexShrink: 0
        }}>
          <h3 style={{
            fontSize: '0.875rem',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            marginBottom: '4px',
            letterSpacing: '0.05em',
            textAlign: 'left'
          }}>{data.primaryMetric?.title}</h3>
          <div className="primary-value" style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '36px',
            lineHeight: '120%',
            color: '#48FF9B',
            width: '100%',
            height: '43px',
            maxHeight: '43px',
            textAlign: 'left'
          }}>{data.primaryMetric?.value}</div>
        </div>

        {/* Chart Container - supports both bar and line charts */}
        <div className="chart-container" style={{
          margin: '0',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '0',
          borderRadius: 'var(--radius-lg)',
          flexShrink: 0
        }}>
          <ResponsiveContainer width="100%" height={160}>
            {isBarChart ? (
              <BarChart data={data.chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey={xKey} 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  orientation="right"
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '0.75rem' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0,0,0,0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '0.75rem' }}
                />
                <Bar dataKey="baseline" fill="#FF8C00" name={data.chart.legend.baseline} />
                <Bar dataKey="forecast" fill="#00ffb3" name={data.chart.legend.forecast} />
              </BarChart>
            ) : isLineChart ? (
              <LineChart data={data.chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey={xKey} 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  orientation="right"
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '0.75rem' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0,0,0,0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '0.75rem' }}
                />
                {data.chart.lines.map((line, index) => (
                  <Line 
                    key={index}
                    type="monotone" 
                    dataKey={line.key} 
                    stroke={line.color} 
                    name={line.name}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            ) : null}
          </ResponsiveContainer>
        </div>

        {/* CTA Button */}
        {onCommit && (
          <div style={{
            width: '311px',
            height: '52px',
            flex: 'none',
            alignSelf: 'flex-start',
            flexGrow: 0,
            marginTop: '12px',
            flexShrink: 0,
            position: 'relative',
            cursor: 'pointer',
            backdropFilter: 'blur(50px)',
            borderRadius: '40px'
          }}
          onClick={onCommit}
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
                width: '88px',
                height: '30px',
                left: 'calc(50% - 88px/2 + 0.5px)',
                top: 'calc(50% - 30px/2)'
              }}>
                {/* Button Text */}
                <div style={{
                  width: '88px',
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
                  LET'S DO IT!
                </div>
              </div>
          </div>
        )}

        {/* Secondary Metrics - supports both KPIs grid and single secondaryMetric */}
        {data.kpis ? (
          // KPIs Grid Layout (2x2)
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '16px',
            width: '100%'
          }}>
            {data.kpis.map((kpi, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '4px'
              }}>
                <div style={{
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '700',
                  lineHeight: '16.80px'
                }}>{kpi.label}</div>
                <div style={{
                  color: kpi.positive ? '#48FF9B' : 'var(--color-danger)',
                  fontSize: '24px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '400',
                  lineHeight: '26.40px'
                }}>{kpi.value}</div>
                <div style={{
                  color: kpi.positive ? '#48FF9B' : 'var(--color-danger)',
                  fontSize: '14px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: '510',
                  lineHeight: '15.40px'
                }}>{kpi.change}</div>
              </div>
            ))}
          </div>
        ) : data.secondaryMetric ? (
          // Single Secondary Metric (ImpactAssessmentTemplate style)
          <div className="secondary-metrics" style={{
            alignSelf: 'stretch',
            padding: '0',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '16px',
            display: 'inline-flex',
            flexShrink: 0,
            marginTop: '8px',
            background: 'transparent',
            borderRadius: '0'
          }}>
            <div style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '16px',
              display: 'inline-flex'
            }}>
              <div style={{
                width: '140px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '20px',
                display: 'flex'
              }}>
                <div style={{
                  flex: '1 1 0',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  display: 'inline-flex'
                }}>
                  <div style={{
                    alignSelf: 'stretch',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: '700',
                    lineHeight: '16.80px',
                    wordWrap: 'break-word'
                  }}>{data.secondaryMetric.label}</div>
                  <div data-sentiment={data.secondaryMetric.positive ? "Positive" : "Negative"} style={{
                    width: '140px',
                    height: '40px',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '140px',
                      left: 0,
                      top: 0,
                      position: 'absolute',
                      color: data.secondaryMetric.positive ? '#48FF9B' : 'var(--color-danger)',
                      fontSize: '36px',
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: '400',
                      lineHeight: '39.60px',
                      wordWrap: 'break-word'
                    }}>{data.secondaryMetric.value}</div>
                  </div>
                  <div data-sentiment={data.secondaryMetric.positive ? "Positive" : "Negative"} style={{
                    width: '140px',
                    height: '22px',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '140px',
                      left: 0,
                      top: 0,
                      position: 'absolute',
                      color: data.secondaryMetric.positive ? '#48FF9B' : 'var(--color-danger)',
                      fontSize: '20px',
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: '510',
                      lineHeight: '22px',
                      wordWrap: 'break-word'
                    }}>{data.secondaryMetric.change}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      </div>
    </div>
  );
}
