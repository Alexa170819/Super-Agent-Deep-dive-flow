// Template Registry
import IntroTemplate from "./IntroTemplate";
import DecisionTemplate from "./DecisionTemplate";
import LeversTemplate from "./LeversTemplate";
import IRDecisionTemplate from "./IRDecisionTemplate";
import ProgressBarTemplate from "./ProgressBarTemplate";
import TRTAssessmentModal from "./TRTAssessmentModal";
import TRTAssessmentTemplate from "./TRTAssessmentTemplate";
import RecommendationsBaseModal from "./RecommendationsBaseModal";
import GetMoneyTemplate from "./GetMoneyTemplate";
import IRInteractiveDecisionTemplate from "./IRInteractiveDecisionTemplate";
import TrialScenarioTemplate from "./TrialScenarioTemplate";
import DecisionGaugeTemplate from "./DecisionGaugeTemplate";
import LeaderboardModal from "./LeaderboardModal";
import FeedbackFormModal from "./FeedbackFormModal";
import ProgressTrackingModal from "./ProgressTrackingModal";
import RecommendationsInsightsModal from "./RecommendationsInsightsModal";
import LeaderboardTopTemplate from "./LeaderboardTopTemplate";
import InboxTemplate from "./InboxTemplate";

export const templateRegistry = {
  IntroTemplate,
  DecisionTemplate,
  LeversTemplate,
  IRDecisionTemplate,
  ProgressBarTemplate,
  TRTAssessmentModal,
  TRTAssessmentTemplate,
  RecommendationsBaseModal,
  GetMoneyTemplate,
  IRInteractiveDecisionTemplate,
  TrialScenarioTemplate,
  DecisionGaugeTemplate,
  LeaderboardModal,
  FeedbackFormModal,
  ProgressTrackingModal,
  RecommendationsInsightsModal,
  LeaderboardTopTemplate,
  InboxTemplate,
};

/**
 * TEMPLATE DOCUMENTATION FOR AI
 * ==============================
 * Describes WHEN to use each template. Everything else (data structure, features, etc.) 
 * should be inferred by reading the actual template JSX files.
 */

export const templateDocs = {
  RecommendationsBaseModal: "Share multiple text-based insights or findings.",
  
  TRTAssessmentModal: "Show a summary or assessment of the impact on the team of the decision. Display positive/negative/lightning bolt icons (modal version.)",
  
  TRTAssessmentTemplate: "Show a summary or assessment of the impact on the team of the decision. Display positive/negative/lightning bolt icons.",
  
  IRDecisionTemplate: "Display multiple recommendations with title, subtitle and action or value.",
  
  ProgressBarTemplate: "Show investment and divestment recommendations within categories with visual magnitude bars (multiple items per category)",
  
  GetMoneyTemplate: "Display a list of recommended actions with values and color-coded status",
  
  IntroTemplate: "Introduce the agent or start an onboarding flow",
  
  DecisionTemplate: "Display 1-2 prominent KPI metrics with optional insights button. Must include a risk/opportunity and impact value. Additional content via a CTA is optional.",
  
  LeversTemplate: "Create interactive strategy selection with levers or toggles. Must include different scenarios of KPI impact and trade-offs.",
  
  IRInteractiveDecisionTemplate: "Display multiple tappable recommendation cards with title, subtitle and action or value.",
  
  TrialScenarioTemplate: "Display scenario visualization with bar or line charts. Must display the impact KPI value at the top and trade-off KPI at the bottom. 3 additional optional KPIs can be displayed at the bottom.",
  
  DecisionGaugeTemplate: "Used to display the current status vs target. Display a circular gauge with percentage, status text, and opportunity value with optional CTA button",
  
  LeaderboardModal: "Display a scrollable leaderboard with ranked items, optional filters, and optional highlighted current position.",
  
  ProgressTrackingModal: "Show progress tracking with items, forecast percentages, and target indicators in a modal format",
  
  RecommendationsInsightsModal: "Display recommendations with titles, descriptions, and lists.",
  
  FeedbackFormModal: "Collect user feedback with multiple choice options and optional detailed text input",
  
  LeaderboardTopTemplate: "Display a top leaderboard view with title/subtitle header, title section with AI icon, ranked items with rank, title, additional info, value with color coding, and trend indicators.",
  
};

// Helper functions
export const registerTemplate = (name, component) => {
  templateRegistry[name] = component;
};

export const hasTemplate = (name) => {
  return name in templateRegistry;
};

