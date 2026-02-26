/**
 * ImpactCard Component
 * Business value focused design for story card step 2
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './impactCard.css';

export default function ImpactCard({ story, onDeepDive }) {
  if (!story) return null;
  
  const brand = story.rawData?.metadata?.brand || story.rawData?.brand || story.brand || 'Saint Laurent';
  const region = story.rawData?.metadata?.region || story.rawData?.region || story.region || 'Western Europe';
  const country = story.rawData?.metadata?.country || story.rawData?.country || story.country;
  const location = country || region;
  
  const impact = story.impact || {};
  const metrics = story.rawData?.metrics || {};
  const isOpportunity = story.impact?.opportunity || story.type === 'regional_opportunity' || story.rawData?.type === 'regional_opportunity';
  const isRisk = !isOpportunity && (impact.risk === 'high' || story.urgency?.level === 'high');
  const riskColor = isOpportunity ? '#48FF9B' : (isRisk ? '#ff4d4d' : '#ffb800');
  
  // Get headline with revenue decline for UK or opportunity for WE
  const getHeadline = () => {
    // For UK risk: Include revenue decline with both % and absolute terms
    if (story.rawData?.country === 'UK' || story.rawData?.metadata?.country === 'UK') {
      const revenue = metrics.revenue || 0;
      const revenue2024 = metrics.revenue2024 || 0;
      const yoyChange = metrics.yoyChange2024 || 0;
      const absoluteDecline = revenue2024 - revenue;
      
      if (revenue2024 > 0 && absoluteDecline > 0) {
        return `Revenue decline ${(yoyChange * 100).toFixed(1)}% (€${(absoluteDecline / 1000000).toFixed(1)}M) vs 2024`;
      }
    }
    // For Western Europe opportunity: Show the momentum shift
    if (story.rawData?.type === 'regional_opportunity' && (story.rawData?.region === 'Western Europe' || story.rawData?.metadata?.region === 'Western Europe')) {
      const janGrowth = metrics.jan2026Growth || 0;
      const h2Growth = metrics.h2Growth || 0;
      if (janGrowth > 0) {
        return `Just turned the corner: January 2026 +${(janGrowth * 100).toFixed(1)}% (strongest start in region's history)`;
      }
    }
    return null;
  };
  
  const headlineSuffix = getHeadline();
  
  // Calculate financial impact on overall business for UK
  const getFinancialImpact = () => {
    if (story.rawData?.country === 'UK' || story.rawData?.metadata?.country === 'UK') {
      const revenue = metrics.revenue || 0;
      const revenue2024 = metrics.revenue2024 || 0;
      const absoluteDecline = revenue2024 - revenue;
      const bicesterLoss = metrics.bicesterLoss || 0;
      
      // Western Europe metrics (from context or calculate)
      // UK represents 7.6% of Western Europe, so WE revenue ≈ UK revenue / 0.076
      const weRevenue2025 = revenue / (metrics.shareOfRegion || 0.076); // ~€405M
      const weRevenue2024 = revenue2024 / (metrics.shareOfRegion || 0.076); // ~€413M
      const weDecline = weRevenue2024 - weRevenue2025; // ~€8M
      
      // Calculate projected impact if UK continues declining at same rate
      const yoyChange = metrics.yoyChange2024 || 0;
      // If UK continues at -17.1% decline, next year revenue would be: current * (1 + decline rate)
      const projectedUK2026 = revenue * (1 + yoyChange); // revenue * (1 - 0.171) = revenue * 0.829
      const projectedUKDecline2026 = revenue - projectedUK2026; // This is the additional decline
      
      // For full-year impact, show what the decline would be if trend continues
      // This represents the additional impact on regional targets
      const projectedFullYearUKDecline = Math.abs(projectedUKDecline2026);
      
      return {
        ukDecline: absoluteDecline,
        ukDeclineFormatted: `€${(absoluteDecline / 1000000).toFixed(1)}M`,
        weDecline: weDecline,
        weDeclineFormatted: `€${(weDecline / 1000000).toFixed(0)}M`,
        ukShareOfWEDecline: weDecline > 0 ? (absoluteDecline / weDecline) * 100 : 0,
        bicesterLoss: bicesterLoss,
        bicesterLossFormatted: `€${(bicesterLoss / 1000000).toFixed(1)}M`,
        bicesterShareOfUKDecline: absoluteDecline > 0 ? (bicesterLoss / absoluteDecline) * 100 : 0,
        projectedFullYearImpact: projectedFullYearUKDecline,
        projectedFullYearImpactFormatted: `€${(projectedFullYearUKDecline / 1000000).toFixed(1)}M`
      };
    }
    return null;
  };
  
  const financialImpact = getFinancialImpact();
  
  // Create chart data for Western Europe opportunity
  const getOpportunityChartData = () => {
    if (story.rawData?.type === 'regional_opportunity' && (story.rawData?.region === 'Western Europe' || story.rawData?.metadata?.region === 'Western Europe')) {
      const h1Growth = (metrics.h1Decline || 0) * 100; // -8.2%
      const h2Growth = (metrics.h2Growth || 0) * 100; // +3.6%
      const janGrowth = (metrics.jan2026Growth || 0) * 100; // +16.4%
      
      return [
        { period: 'H1 2025', growth: h1Growth },
        { period: 'H2 2025', growth: h2Growth },
        { period: 'Jan 2026', growth: janGrowth }
      ];
    }
    return null;
  };
  
  const opportunityChartData = getOpportunityChartData();
  
  return (
    <div className="impact-card">
      {/* Header with Icon and Badge */}
      <div className="impact-header">
        <div 
          className="impact-icon"
          style={{ 
            borderColor: riskColor,
            backgroundColor: `${riskColor}20`
          }}
        >
          {isOpportunity ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 14L12 9L17 14H7Z" fill={riskColor} />
            </svg>
          ) : isRisk ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10H7Z" fill={riskColor} />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8V16M8 12H16" stroke={riskColor} strokeWidth="2" />
            </svg>
          )}
        </div>
        <span 
          className="impact-badge"
          style={{ backgroundColor: riskColor }}
        >
          {isOpportunity ? 'OPPORTUNITY' : (isRisk ? 'HIGH RISK' : 'MEDIUM RISK')}
        </span>
      </div>
      
      {/* Headline with revenue decline */}
      <h2 className="impact-headline">
        {brand} {location}{headlineSuffix ? `: ${headlineSuffix}` : ''}
      </h2>
      
      {/* Financial Impact on Overall Business */}
      {financialImpact && (
        <div className="impact-financial-impact">
          <div className="impact-section-label">FINANCIAL IMPACT ON OVERALL BUSINESS</div>
          <div className="impact-financial-items">
            <div className="impact-financial-item">
              <div className="impact-financial-text">
                UK's <strong>{financialImpact.ukDeclineFormatted}</strong> decline directly reduces Western Europe revenue
              </div>
            </div>
            <div className="impact-financial-item">
              <div className="impact-financial-text">
                If UK continues declining, projected impact on full-year regional targets: <strong>{financialImpact.projectedFullYearImpactFormatted}</strong>
              </div>
            </div>
            <div className="impact-financial-item">
              <div className="impact-financial-text">
                Bicester Outlet alone (<strong>{financialImpact.bicesterLossFormatted}</strong>) represents {financialImpact.bicesterShareOfUKDecline.toFixed(0)}% of the entire UK decline
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Chart - For Western Europe opportunity */}
      {opportunityChartData && (
        <div className="impact-chart-container">
          <div className="impact-section-label">RECOVERY TRAJECTORY</div>
          <div className="impact-chart-wrapper">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={opportunityChartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="period" 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '0.75rem' }}
                  label={{ value: 'Growth %', angle: -90, position: 'insideLeft', style: { fill: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' } }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(72, 255, 155, 0.3)',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                  formatter={(value) => [`${value > 0 ? '+' : ''}${value.toFixed(1)}%`, 'Growth']}
                />
                <Line 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="#48FF9B" 
                  strokeWidth={3}
                  dot={{ fill: '#48FF9B', r: 5 }}
                  activeDot={{ r: 7, fill: '#48FF9B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="impact-chart-note">
            Momentum shift: From H1 decline to H2 recovery and January explosion
          </div>
        </div>
      )}
      
      {/* Key Metrics Grid - For Western Europe opportunity (fallback if no chart) */}
      {!opportunityChartData && ((metrics.h2Growth || metrics.jan2026Growth) && (story.rawData?.region === 'Western Europe' || story.rawData?.metadata?.region === 'Western Europe')) && (
        <div className="impact-metrics">
          {metrics.h2Growth && (
            <div className="impact-metric-item">
              <div className="impact-metric-label">H2 Growth</div>
              <div className="impact-metric-value" style={{ color: '#48FF9B' }}>+{ (metrics.h2Growth * 100).toFixed(1) }%</div>
            </div>
          )}
          
          {metrics.jan2026Growth && (
            <div className="impact-metric-item">
              <div className="impact-metric-label">January 2026</div>
              <div className="impact-metric-value" style={{ color: '#48FF9B' }}>+{ (metrics.jan2026Growth * 100).toFixed(1) }%</div>
            </div>
          )}
        </div>
      )}
      
      {/* Deep Dive CTA */}
      <button 
        className="impact-cta"
        onClick={onDeepDive}
      >
        Deep dive
      </button>
    </div>
  );
}
