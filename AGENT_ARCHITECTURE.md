# Agent Architecture Documentation

## Overview

The agent system has been refactored into a modular architecture that separates templates, configuration, and data. This makes it easy to create new agents by simply providing configuration and data files.

## Directory Structure

```
src/
├── agents/                    # Agent-specific folders
│   └── cfo/                  # CFO Cash Optimizer Agent
│       ├── cfoAgentConfig.js # Flow configuration
│       ├── cfoAgentData.js   # Agent data
│       └── index.js          # Barrel export
├── templates/                 # Reusable UI templates
│   ├── WelcomeTemplate.jsx
│   ├── MetricsTemplate.jsx
│   ├── DecisionTemplate.jsx
│   ├── ImpactAssessmentTemplate.jsx
│   ├── ImplementationRoadTemplate.jsx
│   ├── TRTAssessmentTemplate.jsx
│   ├── InsightsModalTemplate.jsx
│   └── registry.js           # Template registry
├── components/               # Shared components
│   ├── AgentOrchestrator.jsx # Main orchestrator
│   ├── Modal.jsx
│   ├── NavigationDots.jsx
│   └── ScenarioModal.jsx
└── App.jsx                   # App entry point
```

## Core Concepts

### 1. Templates

Generic, reusable UI components that accept data as props. Templates are presentation-only and contain no agent-specific logic.

**Available Templates:**
- `WelcomeTemplate` - Welcome screen with icon, title, and description
- `MetricsTemplate` - Metrics display (formerly TriggerImpact)
- `DecisionTemplate` - Decision/strategy selection interface
- `ImpactAssessmentTemplate` - Impact visualization with charts
- `ImplementationRoadTemplate` - Implementation steps display
- `TRTAssessmentTemplate` - Assessment criteria display
- `InsightsModalTemplate` - Insights modal content

### 2. Agent Configuration

Defines the flow, navigation, and behavior of an agent.

**Example: `cfoAgentConfig.js`**

```javascript
export const cfoAgentConfig = {
  id: 'cfo-cash-optimizer',
  name: 'CFO Cash Optimizer',
  
  flow: [
    {
      id: 'welcome',
      template: 'WelcomeTemplate',
      dataPath: 'welcome',
      props: { icon: '💰' }
    },
    {
      id: 'trigger',
      template: 'MetricsTemplate',
      dataPath: 'trigger',
      modals: [
        { 
          id: 'insights', 
          template: 'InsightsModalTemplate', 
          dataPath: 'insights' 
        }
      ]
    },
    {
      id: 'decision',
      template: 'DecisionTemplate',
      dataPath: 'scenarios',
      stateful: true,
      stateKeys: ['selectedTimePeriod', 'selectedStrategy'],
      modals: [
        { 
          id: 'scenario', 
          template: 'ScenarioModal',
          stateful: true
        }
      ]
    }
  ],
  
  navigation: {
    type: 'swipe',
    allowBackwards: true,
    disableWhenModalOpen: true
  }
};
```

**Config Properties:**
- `id` - Unique agent identifier
- `name` - Human-readable agent name
- `flow` - Array of screen configurations
- `navigation` - Navigation behavior settings

**Screen Configuration Properties:**
- `id` - Screen identifier
- `template` - Template component name (from registry)
- `dataPath` - Path to data in agent data object
- `props` - Additional props to pass to template
- `stateful` - Whether screen manages state
- `stateKeys` - Keys in agent state this screen uses
- `modals` - Array of modal configurations

### 3. Agent Data

Pure data object containing all content for the agent.

**Structure:**
```javascript
export const cfoAgentData = {
  welcome: {
    title: "...",
    subtitle: "...",
    description: "..."
  },
  trigger: {
    title: "...",
    primaryMetric: { ... },
    secondaryMetric: { ... }
  },
  scenarios: {
    timeperiods: [...],
    strategies: { ... }
  },
  insights: {
    sections: [...]
  }
};
```

### 4. AgentOrchestrator

The orchestrator dynamically renders templates based on configuration:

**Responsibilities:**
- Loads templates from registry
- Injects data using `dataPath`
- Manages navigation (swipe, etc.)
- Handles modals
- Manages agent state for stateful screens
- Coordinates actions between screens

**Usage in App.jsx:**
```javascript
import AgentOrchestrator from './components/AgentOrchestrator';
import { cfoAgentConfig, cfoAgentData } from './agents/cfo';

function App() {
  return <AgentOrchestrator config={cfoAgentConfig} data={cfoAgentData} />;
}
```

## Creating a New Agent

To create a new agent, follow these steps:

### Step 1: Create Agent Folder

```bash
mkdir -p src/agents/my-agent
```

### Step 2: Create Data File

Create `src/agents/my-agent/myAgentData.js`:

```javascript
export const myAgentData = {
  welcome: {
    title: "My Agent",
    subtitle: "Agent subtitle",
    description: "What this agent does...",
    cta: "Let's go!"
  },
  // ... other data sections
};
```

### Step 3: Create Config File

Create `src/agents/my-agent/myAgentConfig.js`:

```javascript
export const myAgentConfig = {
  id: 'my-agent',
  name: 'My Agent',
  
  flow: [
    {
      id: 'welcome',
      template: 'WelcomeTemplate',
      dataPath: 'welcome',
      props: { icon: '🚀' }
    },
    // ... other screens
  ],
  
  navigation: {
    type: 'swipe',
    allowBackwards: true,
    disableWhenModalOpen: true
  }
};
```

### Step 4: Create Barrel Export

Create `src/agents/my-agent/index.js`:

```javascript
export { myAgentConfig } from './myAgentConfig';
export { myAgentData } from './myAgentData';
```

### Step 5: Update App.jsx

```javascript
import { myAgentConfig, myAgentData } from './agents/my-agent';

function App() {
  return <AgentOrchestrator config={myAgentConfig} data={myAgentData} />;
}
```

## Template Props

### Common Props (all templates)
- `data` - Screen data from agent data object
- `currentPage` - Current page index
- `totalPages` - Total number of pages
- `onAction` - Callback for template actions

### Stateful Templates
- `agentState` - Current agent state object
- `onStateChange` - Callback to update agent state

### Example: Using onAction

Templates trigger actions like opening modals:

```javascript
// In template
const handleClick = () => {
  onAction({ type: 'openModal', modalId: 'insights' });
};
```

### Example: Managing State

Stateful templates can update agent state:

```javascript
// In template
const handleChange = (newValue) => {
  onStateChange({ selectedOption: newValue });
};
```

## Adding Custom Templates

### Step 1: Create Template Component

Create `src/templates/MyCustomTemplate.jsx`:

```javascript
import NavigationDots from '../components/NavigationDots';
import '../components/agent.css';

export default function MyCustomTemplate({ data, currentPage, totalPages }) {
  return (
    <div className="agent-page">
      <div className="page-content">
        {/* Your custom UI */}
      </div>
      <NavigationDots total={totalPages} current={currentPage} />
    </div>
  );
}
```

### Step 2: Register Template

Add to `src/templates/registry.js`:

```javascript
import MyCustomTemplate from './MyCustomTemplate';

export const templateRegistry = {
  // ... existing templates
  MyCustomTemplate,
};
```

### Step 3: Use in Agent Config

```javascript
{
  id: 'custom-screen',
  template: 'MyCustomTemplate',
  dataPath: 'customData'
}
```

## Benefits

1. **Rapid Development** - Create new agents with just config + data
2. **Reusable Components** - Templates used across multiple agents
3. **Clear Separation** - Templates (UI), Config (flow), Data (content)
4. **Easy Testing** - Templates can be tested with mock data
5. **Maintainability** - Changes to templates affect all agents
6. **Flexibility** - Easy to add new templates or customize per agent

## Migration from Old Architecture

The old architecture had hardcoded components:
- `AgentContainer.jsx` → `AgentOrchestrator.jsx`
- `Welcome.jsx` → `WelcomeTemplate.jsx`
- `TriggerImpact.jsx` → `MetricsTemplate.jsx`
- `DecisionLevers.jsx` → `DecisionTemplate.jsx`
- Component-specific data → Separated into `agents/` folder

All agent data is now in `agents/cfo/` and components are generic templates.
