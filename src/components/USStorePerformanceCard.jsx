/**
 * USStorePerformanceCard Component
 * Enhanced card showing year-over-year performance with comparison options
 */

import { useState } from 'react';
import './usStorePerformanceCard.css';

export default function USStorePerformanceCard({ story, onSelect, isSelected = false }) {
  const [comparisonType, setComparisonType] = useState('PY'); // PY, Forecast, Budget, Last Quarter

  if (!story) return null;

  const metrics = story.rawData?.metrics || {};
  const revenue2024 = metrics.revenue2024 || metrics.forecast || 0;
  const revenue2025 = metrics.revenue2025 || metrics.actual || 0;
  const changePercent = metrics.changePercent || 0;
  
  // Determine overall performance
  const isPerformingBetter = changePercent > 0;
  const performanceText = isPerformingBetter ? 'Performing Better' : 'Performing Worse';
  const performanceColor = isPerformingBetter ? '#48FF9B' : '#ff4d4d';
  
  // Format currency
  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(0)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  // Get comparison label
  const getComparisonLabel = () => {
    switch (comparisonType) {
      case 'PY': return 'Previous Year';
      case 'Forecast': return 'Forecast';
      case 'Budget': return 'Budget';
      case 'Last Quarter': return 'Last Quarter';
      default: return 'Previous Year';
    }
  };

  // Get comparison value based on selected type
  const getComparisonValue = () => {
    switch (comparisonType) {
      case 'PY':
        return revenue2024;
      case 'Forecast':
        return metrics.forecast || revenue2024 * 1.1; // Default to 10% higher than 2024
      case 'Budget':
        return metrics.budget || revenue2024 * 1.05; // Default to 5% higher than 2024
      case 'Last Quarter':
        return metrics.lastQuarter || revenue2024 * 0.95; // Default to 5% lower than 2024
      default:
        return revenue2024;
    }
  };

  // Calculate change based on comparison type
  const getComparisonChange = () => {
    const compValue = getComparisonValue();
    if (compValue === 0) return 0;
    return ((revenue2025 - compValue) / compValue) * 100;
  };

  const comparisonValue = getComparisonValue();
  const comparisonChange = getComparisonChange();
  const isComparisonBetter = comparisonChange > 0;
  const comparisonColor = isComparisonBetter ? '#48FF9B' : '#ff4d4d';

  // Get additional metrics if available
  const storeSales2024 = metrics.storeSales2024;
  const storeSales2025 = metrics.storeSales2025;
  const onlineSales2024 = metrics.onlineSales2024;
  const onlineSales2025 = metrics.onlineSales2025;

  // Format story text to match screenshot format
  // Example: "Saint Laurent Store TMALL - China high daily momentum (+54.2% in net sales)"
  const formatStoryText = () => {
    const entity = story.rawData?.metadata?.entity || 'US Stores';
    const region = story.rawData?.metadata?.region || '';
    const category = story.rawData?.metadata?.category || '';
    const channel = story.rawData?.metadata?.channel || '';
    
    // Build store/location name
    let storeName = '';
    if (channel && region) {
      storeName = `${channel} - ${region}`;
    } else if (channel && category) {
      storeName = `${channel} - ${category}`;
    } else if (channel) {
      storeName = channel;
    } else if (region) {
      storeName = region;
    } else if (category) {
      storeName = category;
    }
    
    // Determine momentum direction
    const isPositive = changePercent > 0;
    const momentum = isPositive ? 'high' : 'weak';
    const momentumType = story.title?.includes('Monthly') ? 'monthly' : 
                        story.title?.includes('Channel') ? 'channel' : 'daily';
    
    // Format the text matching screenshot
    if (storeName) {
      return `${entity} ${storeName} ${momentum} ${momentumType} momentum (${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}% in net sales)`;
    }
    return `${entity} ${momentum} ${momentumType} momentum (${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}% in net sales)`;
  };

  const handleCardClick = (e) => {
    // Don't trigger if clicking on select dropdown, checkbox, or any interactive element
    if (e.target.tagName === 'SELECT' || 
        e.target.closest('select') || 
        e.target.closest('.us-store-card-checkbox') ||
        e.target.closest('.us-store-comparison-selector') ||
        e.target.closest('option')) {
      return;
    }
    if (onSelect) {
      onSelect(story);
    }
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(story);
    }
  };

  return (
    <div 
      className={`us-store-performance-card ${isSelected ? 'selected' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Checkbox */}
      <div 
        className="us-store-card-checkbox"
        onClick={handleCheckboxClick}
      >
        {isSelected && '✓'}
      </div>

      {/* Header */}
      <div className="us-store-card-header">
        <div className="us-store-card-title">{story.title}</div>
      </div>

      {/* Story Text - Matching Screenshot Format */}
      <div className="us-store-story-text">
        {formatStoryText()}
      </div>

      {/* Key Insight Section - Enhanced Design */}
      <div className="us-store-key-insight">
        <div className="us-store-key-insight-label">KEY INSIGHT</div>
        <div className="us-store-key-insight-content">
          <div className="us-store-key-insight-metric">
            <div className="us-store-key-insight-value" style={{ color: comparisonColor }}>
              {formatCurrency(revenue2025)}
            </div>
            <div className="us-store-key-insight-change" style={{ color: comparisonColor }}>
              {comparisonChange > 0 ? '+' : ''}{comparisonChange.toFixed(1)}% vs {getComparisonLabel()}
            </div>
          </div>
          <div className="us-store-key-insight-indicator">
            <span className="us-store-key-insight-icon" style={{ color: comparisonColor }}>
              {isComparisonBetter ? '↑' : '↓'}
            </span>
            <span className="us-store-key-insight-text" style={{ color: comparisonColor }}>
              {isComparisonBetter ? 'Performing Better' : 'Performing Worse'}
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Table - Dynamic based on selection */}
      <div className="us-store-comparison-table">
        <div className="us-store-table-header">
          <div className="us-store-table-cell">{getComparisonLabel()}</div>
          <div className="us-store-table-cell">2025</div>
          <div className="us-store-table-cell">Change</div>
        </div>
        <div className="us-store-table-row">
          <div className="us-store-table-cell">{formatCurrency(comparisonValue)}</div>
          <div className="us-store-table-cell">{formatCurrency(revenue2025)}</div>
          <div 
            className="us-store-table-cell"
            style={{ color: comparisonColor }}
          >
            {comparisonChange > 0 ? '+' : ''}{comparisonChange.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Comparison Selector */}
      <div className="us-store-comparison-selector" onClick={(e) => e.stopPropagation()}>
        <label>Compare to:</label>
        <select 
          value={comparisonType}
          onChange={(e) => {
            e.stopPropagation();
            setComparisonType(e.target.value);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <option value="PY">vs Previous Year</option>
          <option value="Forecast">vs Forecast</option>
          <option value="Budget">vs Budget</option>
          <option value="Last Quarter">vs Last Quarter</option>
        </select>
      </div>

      {/* Key Metrics */}
      {(storeSales2024 || onlineSales2024) && (
        <div className="us-store-key-metrics">
          <div className="us-store-metrics-label">📈 Key Metrics:</div>
          {storeSales2024 && storeSales2025 && (
            <div className="us-store-metric-item">
              <span className="us-store-metric-label">Store Sales:</span>
              <span className="us-store-metric-value">
                {formatCurrency(storeSales2025)} 
                <span style={{ color: storeSales2025 > storeSales2024 ? '#48FF9B' : '#ff4d4d' }}>
                  ({((storeSales2025 - storeSales2024) / storeSales2024 * 100).toFixed(1)}% vs PY)
                </span>
              </span>
            </div>
          )}
          {onlineSales2024 && onlineSales2025 && (
            <div className="us-store-metric-item">
              <span className="us-store-metric-label">Online Sales:</span>
              <span className="us-store-metric-value">
                {formatCurrency(onlineSales2025)}
                <span style={{ color: onlineSales2025 > onlineSales2024 ? '#48FF9B' : '#ff4d4d' }}>
                  ({((onlineSales2025 - onlineSales2024) / onlineSales2024 * 100).toFixed(1)}% vs PY)
                </span>
              </span>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
