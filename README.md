# Aily Agent Prototyper

A mobile-first web app for building interactive agent prototypes in Aily's decision intelligence platform.

## CFO Cash Optimizer Agent

The CFO Cash Optimizer Agent helps optimize cash flow by improving FCF conversion rates through strategic management of DSO, DPO, and DIO.

### Features

#### Navigation Flow
1. **Welcome Screen** - Introduction to agent capabilities
2. **Trigger/Impact Screen** - Shows primary KPI opportunity with insights modal
3. **Decision Levers** - Choose time period (1 year / 3 years) and strategy (Aggressive / Balanced)
4. **Scenario Modal** - Multi-page flow showing:
   - Impact Assessment with chart
   - Implementation Road (2 pages)
   - TRT Assessment

#### Interactions
- **Swipe gestures** - Navigate through main flow by swiping left/right
- **Time period toggle** - Changes metrics and scenarios (1 year vs 3 years)
- **Strategy selection** - Choose between Aggressive or Balanced approach
- **Modals** - Open insights and scenario details, swipe down to dismiss
- **Commit decision** - "LET'S DO IT!" button to proceed to implementation

### Tech Stack
- React 19.1
- Vite 7.1
- Recharts - For bar charts
- react-swipeable - For touch gestures
- CSS with custom properties - Mobile-first responsive design

### Project Structure

```
src/
├── components/
│   ├── AgentContainer.jsx      # Main container with swipe navigation
│   ├── Welcome.jsx              # Welcome screen
│   ├── TriggerImpact.jsx        # Impact/trigger screen
│   ├── DecisionLevers.jsx       # Scenario selection
│   ├── Modal.jsx                # Reusable modal container
│   ├── InsightsModal.jsx        # Context insights
│   ├── ScenarioModal.jsx        # Scenario flow container
│   ├── ImpactAssessment.jsx     # Scenario details with chart
│   ├── ImplementationRoad.jsx   # Implementation pages
│   ├── TRTAssessment.jsx        # Team assessment
│   ├── NavigationDots.jsx       # Page indicator
│   └── agent.css                # Agent-specific styles
├── data/
│   └── cfoAgent.js              # Agent data configuration
├── App.jsx                      # Main app entry
├── App.css                      # Global app styles
└── index.css                    # Base CSS variables & resets
```

### Data Structure

The agent data is configured in `src/data/cfoAgent.js` with the following structure:

- **welcome** - Welcome page content
- **trigger** - Impact/trigger page content
- **insights** - Context modal content
- **scenarios** - Time periods and strategies
  - Each strategy contains:
    - Metrics (FCF, conversion rate)
    - Impact assessment data
    - Chart data
    - Implementation road pages
    - TRT assessment

### Running the App

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Design Philosophy

- Mobile-first (optimized for iPhone size)
- Dark theme with teal/green accents
- Glassmorphism effects
- Touch-friendly interactions
- Simple, functional components
- Data-driven pages

### Key Interactions

1. **Main Flow Navigation**: Swipe left/right to move between Welcome → Trigger → Decision Levers
2. **Insights Modal**: Tap the 💡 icon on the Trigger screen to view competitor insights
3. **Time Period Toggle**: Switch between 1 year and 3 years to see different projections
4. **Strategy Selection**: Tap a strategy card to select it, then tap "OPEN SCENARIO"
5. **Scenario Modal**: Swipe through Impact → Implementation → Assessment, swipe down to close
6. **Commit Decision**: Tap "LET'S DO IT!" to proceed to implementation details

### Customization

To create new agents or modify existing ones:

1. Update data in `src/data/cfoAgent.js`
2. Adjust styles in `src/components/agent.css`
3. Add new page components if needed
4. Wire them into `AgentContainer.jsx`

### Browser Support

Optimized for mobile browsers with touch support. Best viewed on:
- iOS Safari
- Chrome Mobile
- Modern mobile browsers with swipe gesture support
