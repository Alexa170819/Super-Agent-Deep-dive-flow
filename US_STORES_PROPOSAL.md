# US Stores Performance Stories - Design Proposal

## Current Issues
1. Only seeing 2 stories, one is Western Europe (not US-focused)
2. Need more US-specific stories
3. Current card design doesn't show year-over-year performance clearly
4. No comparison options (vs PY, vs Forecast, etc.)
5. No overall performance indicator

## Proposed Solution

### 1. Enhanced Story Generation for US Stores
- Generate 8-12 US-focused stories covering:
  - Sales performance by month/quarter
  - Year-over-year comparisons
  - Channel performance (Store, Online)
  - Category performance
  - Regional breakdowns within US
  - Forecast vs Actual comparisons

### 2. New Performance Card Design

#### Card Structure:
```
┌─────────────────────────────────────────┐
│ US Stores                    [AI Badge] │
├─────────────────────────────────────────┤
│ 📊 PERFORMANCE OVERVIEW                  │
│                                          │
│ Overall: 🟢 Performing Better (+12.3%) │
│                                          │
│ ┌──────────┬──────────┬──────────┐     │
│ │  2024    │  2025    │  Change  │     │
│ │  $2.1B   │  $2.4B   │  +14.3%  │     │
│ └──────────┴──────────┴──────────┘     │
│                                          │
│ Compare to: [vs PY ▼] [vs Forecast ▼] │
│                                          │
│ 📈 Key Metrics:                         │
│ • Revenue: $2.4B (+14.3% vs PY)        │
│ • Store Sales: $1.8B (+18.2% vs PY)    │
│ • Online Sales: $600M (+5.1% vs PY)      │
│                                          │
│ [Select Story]                          │
└─────────────────────────────────────────┘
```

#### Key Features:
1. **Overall Performance Indicator**
   - Large, prominent badge showing "Performing Better/Worse"
   - Color-coded (green for better, red for worse)
   - Percentage change displayed

2. **Year Comparison Table**
   - Side-by-side comparison of years
   - Clear change indicators
   - Visual formatting for easy scanning

3. **Comparison Selector**
   - Dropdown to select comparison type:
     - vs Previous Year (PY)
     - vs Forecast
     - vs Budget
     - vs Last Quarter
   - Dynamic updates based on selection

4. **Key Metrics Breakdown**
   - Revenue, Store Sales, Online Sales
   - Each with comparison indicator
   - Color-coded trends

5. **Visual Indicators**
   - Trend arrows (↑↓)
   - Color coding (green/red)
   - Percentage changes

### 3. Story Categories for US Stores

1. **Overall Performance**
   - "US Stores - Overall Performance"
   - Shows aggregate metrics with overall indicator

2. **Monthly Breakdowns**
   - "US Stores - January 2025"
   - "US Stores - February 2025"
   - etc.

3. **Channel Performance**
   - "US Stores - Store Channel"
   - "US Stores - Online Channel"

4. **Category Performance**
   - "US Stores - Handbags"
   - "US Stores - Ready-to-Wear"
   - etc.

5. **Regional Performance**
   - "US Stores - East Coast"
   - "US Stores - West Coast"
   - etc.

6. **Forecast Comparisons**
   - "US Stores - vs Forecast Q1"
   - "US Stores - vs Budget 2025"

### 4. Implementation Plan

1. **Update Mock Story Generator**
   - Create `generateUSStoreStories()` function
   - Generate 10-12 diverse US-focused stories
   - Include proper metadata (region: "US", country: "United States")

2. **Create New Performance Card Component**
   - `USStorePerformanceCard.jsx`
   - Reusable for different story types
   - Supports comparison selection
   - Shows overall performance indicator

3. **Update Search Function**
   - Better filtering for US stores queries
   - Return all US-focused stories
   - Prioritize sales/performance stories

4. **Update Story Selector**
   - Use new performance cards
   - Better layout for comparison view
   - Enhanced filtering options

## Benefits

1. **More Relevant Stories**: 10-12 US-focused stories instead of 2
2. **Better Performance Visibility**: Clear year-over-year comparisons
3. **Flexible Comparisons**: Users can choose what to compare against
4. **Overall Context**: Quick understanding of performance direction
5. **Better Decision Making**: More data points for informed decisions
