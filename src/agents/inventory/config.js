// Inventory Agent Configuration

export const config = {
  id: "inventory-optimizer",
  name: "Inventory Optimizer",

  // Define the screen flow
  flow: [
    {
      id: "welcome",
      template: "IntroTemplate",
      dataPath: "welcome",
      props: {
        icon: "📦",
      },
    },
    {
      id: "trigger",
      template: "DecisionTemplate",
      dataPath: "trigger",
    },
    {
      id: "decisionLevers",
      template: "LeversTemplate",
      dataPath: "decisionLevers",
      stateful: true,
      modals: [
        {
          id: "scenario",
          height: 750,
          pages: [
            {
              template: "TrialScenarioTemplate",
              dataPath: "scenarioModal",
            },
            {
              template: "ProgressTrackingModal",
              dataPath: "progressTracking",
            },
            {
              template: "RecommendationsInsightsModal",
              dataPath: "recommendationsInsights",
            },
            {
              template: "IRDecisionTemplate",
              dataPath: "adjustMinimumQuantity",
            },
            {
              template: "TRTAssessmentModal",
              dataPath: "nextActions",
            },
          ],
        },
      ],
    },
  ],

  // Navigation behavior
  navigation: {
    type: "swipe",
    allowBackwards: true,
    disableWhenModalOpen: true,
  },
};
