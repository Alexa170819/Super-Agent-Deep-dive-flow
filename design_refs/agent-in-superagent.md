# Agent-in-Superagent Specification

## Goal

Implement an alternative display mode for agents: instead of a horizontal carousel of screens, render all content as a single vertically scrollable page with tappable sections that open detail screens in full-screen modals.

Both display modes (carousel and superagent) should work from the same underlying data, controlled by a `displayMode` config setting per agent.

Reference mockup: `design_refs/agent-in-superagent.png`

---

## Page Structure

The superagent page is a single scrollable view composed of these sections, top to bottom:

### 1. Header

- **Close button** (X) top-left, plus action icons top-right
- **Title**: sourced from DecisionTemplate data (`trigger.title`)
- **Navigation context tabs**: shows breadcrumb-like context (e.g. "Opportunity", "CEO Agent") — not switchable, purely informational

### 2. Overview Section

- Section header: "Overview" with lightning bolt icon
- **Content**: sourced from RecommendationsBaseModal data (the same data used behind the "Insights" button on DecisionTemplate)
- Displays a summary paragraph (truncated)
- **"KNOW MORE" button**: expands the section inline to show the full content (no modal)

### 3. Opportunity Section

- Section header: "Opportunity" with lightning bolt icon
- **Title + primary metric**: sourced from TrialScenarioTemplate data of the currently recommended or user-selected scenario
- **"Recommended Strategy" tag**: shown when displaying the default recommendation
- **Chart**: line chart from TrialScenarioTemplate (opportunity vs current scenario)
- **Description text**: scenario summary with highlighted metrics
- **"EXPLORE STRATEGIES" button**: opens LeversTemplate in a full-screen modal
  - Within the modal, the "Open Scenario" label is relabeled to **"Apply Strategy"**
  - Applying a strategy updates the superagent page reactively: the Opportunity section chart/metrics AND the Implementation Road cards all update to reflect the selected strategy

### 4. Implementation Road Section

- Section header: "Implementation Road" with lightning bolt icon
- **Reduced cards**: one per implementation item, each showing:
  - Agent/department name (e.g. `.r&d`, `.fin`, `.cfo`)
  - Brief description
  - Highlighted metric value (e.g. `+€158M rNPV`)
  - Chevron (>) indicating tappability
- **On tap**: each card opens a single template screen in a full-screen modal, as defined in the config

### 5. Implement Opportunity Button

- Full-width CTA button: **"IMPLEMENT OPPORTUNITY"**
- Same action as the current "Let's do it" button in ScenarioModal

### 6. Follow Up Section (Future Scope)

- Section header: "Follow up" with lightning bolt icon
- List of tappable questions with chevrons (e.g. "What are the key risks and assumptions going forward?")
- **Layout only** — no interactive logic for now. Structure the UI and data model to support future implementation.

### 7. Feedback Section (Future Scope)

- "Was this useful?" with Yes/No buttons
- "Ask a follow-up question..." input field
- **Layout only** — no interactive logic for now.

---

## Mapping from Current Templates

| Superagent Section | Current Source | Notes |
|---|---|---|
| Header title | `DecisionTemplate` (`trigger.title`) | Green-styled title text |
| Overview content | `RecommendationsBaseModal` data (from `insights` dataPath) | Inline expandable, no modal |
| Opportunity chart + metrics | `TrialScenarioTemplate` data | Shows recommended/selected scenario |
| Explore Strategies modal | `LeversTemplate` | "Open Scenario" → "Apply Strategy" |
| Implementation Road cards | Config-defined templates | Each card opens a single-screen modal |
| Implement Opportunity CTA | ScenarioModal "Let's do it" | Same action handler |
| IntroTemplate | **Removed** | Not used in superagent mode |

---

## Config Changes

### New config property: `displayMode`

```js
export const config = {
  id: "cfo-cash-optimizer",
  name: "CFO Cash Optimizer",

  // NEW: controls which rendering mode to use
  // "carousel" = current horizontal swipe flow (default)
  // "superagent" = single scrollable page with modal drill-downs
  displayMode: "superagent",

  // Existing flow array remains unchanged for carousel mode.
  // Superagent mode uses the same flow + data but renders differently.
  flow: [ ... ],

  // NEW: superagent-specific configuration
  superagent: {
    // Header
    header: {
      titleDataPath: "trigger.title",       // path to title text
      contextTabs: ["Opportunity", "CEO Agent"],  // breadcrumb labels
    },

    // Overview section
    overview: {
      dataPath: "insights",                 // same data as RecommendationsBaseModal
      summaryField: "sections[0].content",  // which field to show as summary
    },

    // Opportunity section
    opportunity: {
      scenarioDataPath: "trialScenario",    // TrialScenarioTemplate data
      leversDataPath: "scenarios",          // LeversTemplate data for modal
      strategyLabel: "Apply Strategy",      // relabeled button text
    },

    // Implementation Road
    implementationRoad: [
      {
        id: "rd",
        label: ".r&d",
        dataPath: "implementation.rd",
        summaryField: "description",        // shown on card
        metricField: "primaryMetric",       // highlighted value on card
        modal: {
          template: "TrialScenarioTemplate",
          dataPath: "implementation.rd.detail",
        },
      },
      {
        id: "fin",
        label: ".fin",
        dataPath: "implementation.fin",
        summaryField: "description",
        metricField: "primaryMetric",
        modal: {
          template: "TrialScenarioTemplate",
          dataPath: "implementation.fin.detail",
        },
      },
      // ... more cards
    ],

    // Follow Up (future scope - layout only)
    followUp: {
      dataPath: "followUp",                // array of { question: string }
    },

    // Feedback (future scope - layout only)
    feedback: {
      question: "Was this useful?",
    },
  },

  navigation: {
    type: "swipe",                          // still used for carousel mode
    allowBackwards: true,
    disableWhenModalOpen: true,
  },
};
```

### New data fields needed

The agent's `data.js` will need these additional fields (beyond what carousel mode uses):

```js
// New fields in data.js
{
  // Existing fields used by both modes
  welcome: { ... },
  trigger: { title: "What's driving the FY25-26 outlook for Dupixent?", ... },
  insights: { ... },
  scenarios: { ... },
  trialScenario: { ... },

  // New fields for superagent mode
  implementation: {
    rd: {
      description: "Allocate €250M of the budget surplus to accelerate 5 projects...",
      primaryMetric: { value: "+€158M", label: "rNPV" },
      detail: { /* TrialScenarioTemplate-shaped data */ },
    },
    fin: {
      description: "Allocate €250M of the budget surplus to scale top ROI opportunities...",
      primaryMetric: { value: "+€780M", label: "net sales" },
      detail: { /* TrialScenarioTemplate-shaped data */ },
    },
    cfo: {
      description: "Allocate €235M of the budget surplus to unlock cash headroom...",
      primaryMetric: { value: "+€1.1B", label: "FCF" },
      detail: { /* TrialScenarioTemplate-shaped data */ },
    },
  },
  followUp: [
    { question: "What are the key risks and assumptions going forward?" },
    { question: "Will teams adopt and execute this smoothly?" },
    { question: "How do we track progress and impact?" },
  ],
}
```

---

## State Management

### Reactive strategy updates

When the user opens "Explore Strategies" and applies a different strategy:

1. The LeversTemplate modal fires an `applyStrategy` action (new action type) instead of `openScenario`
2. The SuperagentOrchestrator updates `agentState.selectedStrategy`
3. The Opportunity section re-renders with the selected scenario's data (chart, metrics, description)
4. The Implementation Road cards re-render with updated metrics for the selected strategy
5. The "Recommended Strategy" tag updates or is removed if the user chose a non-default strategy

### State flow

```
User taps "Explore Strategies"
  → LeversTemplate opens in Modal
  → User selects strategy, taps "Apply Strategy"
  → Action: { type: 'applyStrategy', strategyId: '...' }
  → Modal closes
  → agentState.selectedStrategy updated
  → Opportunity section re-renders
  → Implementation Road cards re-render
```

---

## New Components Needed

### `SuperagentOrchestrator.jsx`

Top-level component for superagent display mode. Analogous to `AgentOrchestrator.jsx` but renders a scrollable page instead of a carousel.

Responsibilities:
- Render all sections vertically in a scrollable container
- Manage agent state (selected strategy)
- Handle modal open/close for Explore Strategies and Implementation Road cards
- Resolve data paths and pass data to sections
- Handle the "Implement Opportunity" CTA action

### `SuperagentOverview.jsx`

Renders the Overview section with expandable "Know More" functionality.

### `SuperagentOpportunity.jsx`

Renders the Opportunity section with chart, metrics, and "Explore Strategies" button.

### `SuperagentImplementationRoad.jsx`

Renders the list of implementation cards. Each card is tappable.

### `SuperagentFollowUp.jsx`

Renders the follow-up questions list (layout only for now).

### `SuperagentFeedback.jsx`

Renders the feedback UI (layout only for now).

---

## Implementation Notes

- The `App.jsx` entry point should check `config.displayMode` and render either `AgentOrchestrator` or `SuperagentOrchestrator`
- Existing templates (TrialScenarioTemplate, LeversTemplate, RecommendationsBaseModal) are reused inside modals — no changes needed to template components themselves
- The existing `Modal.jsx` component is reused for all drill-down modals
- Navigation dots are not rendered in superagent mode (no carousel)
- The superagent page should have a dark background consistent with the existing agent styling
- Section headers use the lightning bolt icon and follow the existing typography
