// Shopfloor Agent Configuration

export const config = {
  id: "shopfloor-optimizer",
  name: "Shopfloor Optimizer",

  // Define the screen flow
  flow: [
    {
      id: "welcome",
      template: "IntroTemplate",
      dataPath: "welcome",
      props: {
        icon: "🏭",
      },
    },
    {
      id: "salesGauge",
      template: "DecisionGaugeTemplate",
      dataPath: "salesGauge",
      modals: [
        {
          id: "leaderboard",
          template: "LeaderboardModal",
          dataPath: "leaderboard",
        },
      ],
    },
    {
      id: "optimizedScenario",
      template: "TrialScenarioTemplate",
      dataPath: "optimizedScenario",
    },
    {
      id: "coreDrivers",
      template: "IRInteractiveDecisionTemplate",
      dataPath: "coreDrivers",
      modals: [
        {
          id: "procurementInsight-0",
          template: "RecommendationsBaseModal",
          dataPath: "driverInsights.footfall",
        },
        {
          id: "procurementInsight-1",
          template: "RecommendationsBaseModal",
          dataPath: "driverInsights.basket",
        },
        {
          id: "procurementInsight-2",
          template: "RecommendationsBaseModal",
          dataPath: "driverInsights.crm",
        },
        {
          id: "procurementInsight-3",
          template: "RecommendationsBaseModal",
          dataPath: "driverInsights.replenishment",
        },
      ],
    },
    {
      id: "riskAssessment",
      template: "TRTAssessmentTemplate",
      dataPath: "riskAssessment",
    },
  ],

  // Navigation behavior
  navigation: {
    type: "swipe",
    allowBackwards: true,
    disableWhenModalOpen: true,
  },
};
