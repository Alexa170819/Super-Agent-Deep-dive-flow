// CFO Cash Optimizer Agent Configuration

export const config = {
  id: "cfo-cash-optimizer",
  name: "CFO Cash Optimizer",
  displayMode: "superagent",

  superagent: {
    header: {
      titleDataPath: "trigger.subtitle",
      contextTabs: ["Opportunity", "CEO Agent"],
    },
    overview: {
      dataPath: "insights",
    },
    opportunity: {
      leversDataPath: "scenarios",
    },
    followUp: {
      dataPath: "followUp",
    },
  },

  // Define the screen flow
  flow: [
    {
      id: "welcome",
      template: "IntroTemplate",
      dataPath: "welcome",
      props: {
        icon: "💰",
      },
    },
    {
      id: "trigger",
      template: "DecisionTemplate",
      dataPath: "trigger",
      modals: [
        {
          id: "insights",
          template: "RecommendationsBaseModal",
          dataPath: "insights",
        },
      ],
    },
    {
      id: "decision",
      template: "LeversTemplate",
      dataPath: "scenarios",
      stateful: true,
      stateKeys: ["selectedTimePeriod", "selectedStrategy"],
      modals: [
        {
          id: "scenario",
          template: "ScenarioModal",
          // Scenario modal uses selectedStrategy from agent state
          stateful: true,
        },
      ],
    },
    {
      id: "procurementLaunches",
      template: "IRInteractiveDecisionTemplate",
      dataPath: "procurementLaunches",
      modals: [
        {
          id: "procurementInsight-0",
          template: "RecommendationsBaseModal",
          dataPath: "procurementInsights.study1",
        },
        {
          id: "procurementInsight-1",
          template: "RecommendationsBaseModal",
          dataPath: "procurementInsights.study2",
        },
        {
          id: "procurementInsight-2",
          template: "RecommendationsBaseModal",
          dataPath: "procurementInsights.study3",
        },
      ],
    },
    {
      id: "trialScenario",
      template: "TrialScenarioTemplate",
      dataPath: "trialScenario",
    },
  ],

  // Navigation behavior
  navigation: {
    type: "swipe",
    allowBackwards: true,
    disableWhenModalOpen: true,
  },
};
