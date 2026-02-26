# Aily Agent Prototyper - Claude Code Instructions

## Project Overview
This is a mobile web app for building interactive agent prototypes in Aily's decision intelligence platform. Agents autonomously identify risks/opportunities, provide context, create scenarios, make recommendations, and track implementation.

## Tech Stack
- React 19.1
- Vite 7.1
- Recharts (bar charts)
- react-swipeable (touch gestures)
- Mobile-first web application

## Design Philosophy
- Use standard components with light styling
- Favor functionality over pixel perfection
- Keep it simple and maintainable
- Mobile-first (optimized for iPhone size)
- Dark theme with teal/green accents
- Touch-friendly interactions

## Agent Flow Architecture

### Core Linear Flow
Agents follow a mostly linear swipe-through structure with optional deep dives:

1. **Welcome Page**
   - Brief introduction to agent capabilities
   - Sets context for the user

2. **Trigger/Impact Page**
   - Shows primary KPI risk/opportunity
   - Optional: 1-2 additional KPIs
   - Communicates why agent triggered and decision value
   - Contains button to open context modal (side quest)

3. **Scenarios Selection (Decision Levers)**
   - User selects between different scenarios
   - Shows impact on primary KPI
   - Displays trade-offs (e.g., sales vs investment)
   - Default scenario matches Impact page primary KPI value
   - "Open Scenario" button launches multi-screen modal flow

4. **Scenario Page** (opened in modal)
   - Primary KPI chart
   - Up to 4 secondary KPIs
   - "Let's do it" button to commit to decision

5. **Implementation Road** (continues in modal)
   - One or more pages explaining implementation
   - Details like resource allocation

### Optional Elements
- **Summary Screen**: May appear before scenario selection
- **Additional Context Screens**: Rare, may appear after trigger screen
- **Context Modal**: Accessible from trigger/impact page via button

## Navigation Patterns

### Primary Flow
```
Welcome → Trigger/Impact → [Optional Summary] → Scenarios Selection
                ↓ (select scenario)
            Scenario Page → Implementation Road → End
```

### Modal Navigation
- Scenario selection opens modal containing:
  - Scenario Page
  - Implementation Road (swipe through)
- Context button on Impact page opens separate modal

### Interaction Model
- **Main flow**: Swipe/scroll through
- **Scenario exploration**: Tap to open modal, swipe through modal content
- **Context deep-dive**: Tap button to open modal

## Implementation Guidelines

### Component Structure
Build reusable components for:
- Page layouts (welcome, impact, scenario, implementation)
- KPI displays (primary vs secondary)
- Scenario cards
- Modal containers
- Navigation controls

### State Management
- Track current position in flow
- Manage selected scenario
- Handle modal open/close states
- Store user decisions/commitments

### Mobile Considerations
- Swipe gestures for navigation
- Touch-friendly hit targets
- Responsive layouts
- Consider safe areas for bottom navigation

### Data Structure
Each agent should define:
- Welcome content
- Trigger/impact data (primary + optional secondary KPIs)
- Available scenarios with impacts and trade-offs
- Scenario details (charts, secondary KPIs)
- Implementation steps
- Optional context/summary content

## Code Style
- Keep components focused and single-purpose
- Use consistent naming conventions
- Comment complex logic
- Prioritize readability over cleverness

## Project Structure

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
