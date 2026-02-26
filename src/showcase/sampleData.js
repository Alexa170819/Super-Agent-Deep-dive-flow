// Sample data for template showcase
// Each key corresponds to a template name in the registry

export const templateSampleData = {
  IntroTemplate: {
    title: "Sample Agent",
    subtitle: "Hello, I am a demonstration agent.",
    description: "This template provides a welcoming introduction to users when they first interact with an agent. It sets expectations and invites engagement.",
    cta: "Get Started!"
  },

  DecisionTemplate: {
    title: "Sample Metrics",
    subtitle: "Key performance indicators",
    primaryMetric: {
      value: "+€2.5M",
      label: "Revenue Growth"
    },
    secondaryMetric: {
      value: "+12.5%",
      label: "Year over Year"
    },
    description: "Key metrics showing business performance",
    hasInsights: true
  },

  LeversTemplate: {
    title: "Strategic Decisions",
    subtitle: "Select your strategy",
    timeperiods: ['1 year', '2 years'],
    strategies: {
      '1 year': [
        {
          id: 'balanced',
          name: 'Balanced Growth',
          metrics: {
            fcf: {
              value: '+€250M',
              label: 'FCF',
              positive: true
            },
            conversionRate: {
              value: '+0.8pp',
              label: 'Conversion Rate',
              positive: true
            }
          },
          description: 'Moderate approach balancing growth and risk with sustainable returns.',
          impact: {
            title: 'Impact Assessment',
            subtitle: 'Balanced Strategy',
            primaryMetric: {
              title: 'Revenue Impact 2025',
              value: '+€250M'
            },
            chart: {
              data: [
                { quarter: 'Q1-25', baseline: 1.0, forecast: 1.2 },
                { quarter: 'Q2-25', baseline: 0.9, forecast: 1.1 },
                { quarter: 'Q3-25', baseline: 1.1, forecast: 1.3 },
                { quarter: 'Q4-25', baseline: 1.2, forecast: 1.4 }
              ],
              legend: {
                baseline: 'Baseline',
                forecast: 'Forecasted Growth'
              }
            }
          }
        },
        {
          id: 'aggressive',
          name: 'Aggressive Growth',
          metrics: {
            fcf: {
              value: '+€450M',
              label: 'FCF',
              positive: true
            },
            conversionRate: {
              value: '+1.5pp',
              label: 'Conversion Rate',
              positive: true
            }
          },
          description: 'High-impact strategy maximizing growth potential with higher investment.',
          impact: {
            title: 'Impact Assessment',
            subtitle: 'Aggressive Strategy',
            primaryMetric: {
              title: 'Revenue Impact 2025',
              value: '+€450M'
            },
            chart: {
              data: [
                { quarter: 'Q1-25', baseline: 1.0, forecast: 1.4 },
                { quarter: 'Q2-25', baseline: 0.9, forecast: 1.3 },
                { quarter: 'Q3-25', baseline: 1.1, forecast: 1.6 },
                { quarter: 'Q4-25', baseline: 1.2, forecast: 1.8 }
              ],
              legend: {
                baseline: 'Baseline',
                forecast: 'Forecasted Growth'
              }
            }
          }
        }
      ],
      '2 years': [
        {
          id: 'balanced',
          name: 'Balanced Growth',
          metrics: {
            fcf: {
              value: '+€550M',
              label: 'FCF',
              positive: true
            },
            conversionRate: {
              value: '+1.8pp',
              label: 'Conversion Rate',
              positive: true
            }
          },
          description: 'Sustained moderate growth over extended period with managed risk.',
          impact: {
            title: 'Impact Assessment',
            subtitle: 'Balanced Strategy',
            primaryMetric: {
              title: 'Revenue Impact 2025-2026',
              value: '+€550M'
            },
            chart: {
              data: [
                { quarter: 'Q1-25', baseline: 1.0, forecast: 1.3 },
                { quarter: 'Q2-25', baseline: 0.9, forecast: 1.2 },
                { quarter: 'Q3-25', baseline: 1.1, forecast: 1.4 },
                { quarter: 'Q4-25', baseline: 1.2, forecast: 1.5 },
                { quarter: 'Q1-26', baseline: 1.0, forecast: 1.4 }
              ],
              legend: {
                baseline: 'Baseline',
                forecast: 'Forecasted Growth'
              }
            }
          }
        },
        {
          id: 'aggressive',
          name: 'Aggressive Growth',
          metrics: {
            fcf: {
              value: '+€950M',
              label: 'FCF',
              positive: true
            },
            conversionRate: {
              value: '+3.2pp',
              label: 'Conversion Rate',
              positive: true
            }
          },
          description: 'Maximum investment strategy for market dominance over two years.',
          impact: {
            title: 'Impact Assessment',
            subtitle: 'Aggressive Strategy',
            primaryMetric: {
              title: 'Revenue Impact 2025-2026',
              value: '+€950M'
            },
            chart: {
              data: [
                { quarter: 'Q1-25', baseline: 1.0, forecast: 1.5 },
                { quarter: 'Q2-25', baseline: 0.9, forecast: 1.4 },
                { quarter: 'Q3-25', baseline: 1.1, forecast: 1.7 },
                { quarter: 'Q4-25', baseline: 1.2, forecast: 1.9 },
                { quarter: 'Q1-26', baseline: 1.0, forecast: 1.6 }
              ],
              legend: {
                baseline: 'Baseline',
                forecast: 'Forecasted Growth'
              }
            }
          }
        }
      ]
    }
  },

  ImpactAssessmentTemplate: {
    title: "Impact Assessment",
    subtitle: "Forecasted Outcomes",
    primaryMetric: {
      title: "Revenue Impact 2025",
      value: "+€1.2M"
    },
    chart: {
      data: [
        { quarter: 'Q1-25', baseline: 1.0, forecast: 1.1 },
        { quarter: 'Q2-25', baseline: 0.9, forecast: 1.2 },
        { quarter: 'Q3-25', baseline: 1.1, forecast: 1.4 },
        { quarter: 'Q4-25', baseline: 1.2, forecast: 1.6 }
      ],
      legend: {
        baseline: "Baseline",
        forecast: "AI Forecast"
      }
    },
    secondaryMetric: {
      label: "Customer Retention Rate",
      value: "+25%",
      change: "+€450K",
      positive: true
    }
  },

  IRDecisionTemplate: {
    title: "Implementation Overview",
    subtitle: "Key Action Areas",
    sections: [
      {
        category: ".revenue",
        title: "Revenue Growth Initiative",
        value: "+€850K",
        positive: true
      },
      {
        category: ".ops",
        title: "Operational Efficiency Program",
        value: "+18%",
        positive: true
      },
      {
        category: ".cost",
        title: "Cost Reduction Strategy",
        value: "-€320K",
        positive: true
      },
      {
        category: ".quality",
        title: "Quality Improvement Plan",
        value: "+95%",
        positive: true
      }
    ]
  },

  ProgressBarTemplate: {
    title: "Detailed Action Plan",
    subtitle: "Priority Initiatives by Category",
    topMetrics: [
      {
        topLabel: "Total Impact",
        value: "+€2.5M",
        bottomLabel: "Projected annual value",
        positive: true
      }
    ],
    sections: [
      {
        category: ".sales",
        items: [
          { 
            value: "+€850K", 
            barSize: 150, 
            barLength: 85, 
            description: "Enterprise customer acquisition program",
            positive: true
          },
          { 
            value: "+€650K", 
            barSize: 150, 
            barLength: 65, 
            description: "Partner channel expansion initiative",
            positive: true
          },
          { 
            value: "+€450K", 
            barSize: 150, 
            barLength: 45, 
            description: "Digital marketing campaign launch",
            positive: true
          }
        ]
      },
      {
        category: ".product",
        items: [
          { 
            value: "+€750K", 
            barSize: 150, 
            barLength: 75, 
            description: "New feature development for Q2",
            positive: true
          },
          { 
            value: "+€600K", 
            barSize: 150, 
            barLength: 60, 
            description: "Mobile app optimization project",
            positive: true
          },
          { 
            value: "+€500K", 
            barSize: 150, 
            barLength: 50, 
            description: "API integration improvements",
            positive: true
          }
        ]
      },
      {
        category: ".operations",
        items: [
          { 
            value: "-€700K", 
            barSize: 150, 
            barLength: 70, 
            description: "Process automation implementation",
            positive: true
          },
          { 
            value: "+€550K", 
            barSize: 150, 
            barLength: 55, 
            description: "Team expansion and training",
            positive: true
          }
        ]
      }
    ]
  },

  TRTAssessmentTemplate: {
    title: "Readiness Assessment",
    subtitle: "Implementation Criteria Check",
    description: "Team demonstrates strong readiness for strategic initiatives with some areas requiring attention.",
    criteria: [
      {
        iconType: "plus",
        status: "success",
        title: "Budget Approval Complete",
        description: "All funding secured and allocated across departments"
      },
      {
        iconType: "thunder",
        status: "success",
        title: "Strong Leadership Alignment",
        description: "Executive team fully committed to transformation goals"
      },
      {
        iconType: "exclamation",
        status: "warning",
        title: "Partial Stakeholder Buy-in",
        description: "Two departments pending final approval on timeline"
      },
      {
        iconType: "plus",
        status: "success",
        title: "Technical Infrastructure Ready",
        description: "Systems tested and operational for rollout"
      },
      {
        iconType: "minus",
        status: "negative",
        title: "Compliance Documentation Incomplete",
        description: "Legal review required before proceeding with launch"
      },
      {
        iconType: "plus",
        status: "success",
        title: "High Team Capability",
        description: "Staff trained and ready to execute implementation plan"
      }
    ]
  },

  RecommendationsBaseModal: {
    title: "Key Insights",
    subtitle: "Strategic Analysis",
    sections: [
      {
        title: "Market Opportunity",
        content: "Emerging market segment shows 45% YoY growth with limited competition. Early entry position provides significant first-mover advantage."
      },
      {
        title: "Competitive Landscape",
        content: "Three major competitors control 60% market share, but none have entered the premium segment. Customer surveys indicate strong demand for differentiated offerings."
      },
      {
        title: "Risk Factors",
        content: "Regulatory changes expected Q3 may impact go-to-market strategy. Recommend establishing legal framework early and building compliance into product roadmap."
      },
      {
        title: "Recommendations",
        content: "Launch pilot program with selected enterprise customers to validate value proposition before full market entry. Budget €500K for initial phase."
      }
    ]
  },

  GetMoneyTemplate: {
    title: "Priority Actions",
    subtitle: "Ranked by Impact",
    mainTitle: "Top Strategic Initiatives",
    items: [
      {
        label: "#1 - Customer Retention",
        description: "Launch loyalty program targeting high-value customers to reduce churn by 15% and increase lifetime value."
      },
      {
        label: "#2 - Market Expansion",
        description: "Enter adjacent geographic markets with localized product offerings and dedicated sales teams."
      },
      {
        label: "#3 - Product Innovation",
        description: "Accelerate R&D investment in next-generation features based on customer feedback and market trends."
      },
      {
        label: "#4 - Operational Excellence",
        description: "Implement automation across key workflows to improve efficiency and reduce operational costs by 20%."
      },
      {
        label: "#5 - Partnership Strategy",
        description: "Develop strategic alliances with complementary providers to expand market reach and enhance value proposition."
      }
    ]
  },

  IRInteractiveDecisionTemplate: {
    title: "Active Decisions",
    subtitle: "Strategic Initiatives Portfolio",
    location: "Global Operations",
    aiTitle: "Decision Support",
    aiSubtitle: "Review Required",
    items: [
      {
        label: "Initiative Alpha (Phase III)",
        description: "Digital transformation project ahead of schedule with strong stakeholder support",
        value: "Launch: March 2025"
      },
      {
        label: "Initiative Beta",
        description: "Market expansion experiencing delays due to regulatory approvals in target regions",
        value: "Review: February 2025"
      },
      {
        label: "Initiative Gamma",
        description: "Product development showing promising results in testing, considering accelerated timeline",
        value: "Decision: April 2025"
      },
      {
        label: "Initiative Delta",
        description: "Partnership negotiations progressing well, awaiting final terms and conditions",
        value: "Close: May 2025"
      }
    ]
  },

  TrialScenarioTemplate: {
    headerTitle: "Product Launch Analysis",
    subtitle: "Q1 2025 Performance Review",
    opportunitySection: {
      label: "Opportunity",
      pill: {
        value: "€8.5M",
        label: "NPV",
      },
    },
    primaryMetric: {
      title: "Overall Performance Score",
      value: "+22% Growth",
    },
    chart: {
      xKey: "month",
      data: [
        { month: "Jan", baseline: 75, forecast: 82 },
        { month: "Feb", baseline: 78, forecast: 88 },
        { month: "Mar", baseline: 80, forecast: 92 },
        { month: "Apr", baseline: 77, forecast: 89 },
        { month: "May", baseline: 82, forecast: 95 },
        { month: "Jun", baseline: 85, forecast: 98 },
      ],
      lines: [
        { key: "baseline", name: "Baseline", color: "#FF8C00" },
        { key: "forecast", name: "AI Forecast", color: "#00ffb3" },
      ],
    },
    kpis: [
      {
        label: "Revenue",
        value: "€4.2M",
        change: "+18%",
        positive: true,
      },
      {
        label: "Market Share",
        value: "12.5%",
        change: "+2.3pp",
        positive: true,
      },
      {
        label: "Customer Growth",
        value: "+850",
        change: "new accounts",
        positive: true,
      },
      {
        label: "Retention Rate",
        value: "94%",
        change: "+3%",
        positive: true,
      },
    ],
  },

  ProgressTrackingModal: {
    title: "Replenish SKUs with value of",
    subtitle: "Based on 3 month forecast vs target",
    primaryMetric: {
      value: "€5M",
      label: "Replenish SKUs at store"
    },
    legend: [
      { label: "AI Inventory Forecast", color: "#FF3469" },
      { label: "Target", color: "#FFFFFF" }
    ],
    items: [
      {
        title: "SDJ duffle ROUGE CABERNET - Miami Aventura Mall | from Houston Galleria",
        unitsNeeded: "17 units needed",
        changeValue: "3 units",
        changePositive: false,
        forecastPercent: 0,
        targetPercent: 85,
        forecastLabel: "AI Forecast 0 units · TGT 17 units"
      },
      {
        title: "SDJ NANO ORANGE - Toronto Yorkdale | from Canada warehouse",
        unitsNeeded: "10 units needed",
        changeValue: "0 units",
        changePositive: false,
        forecastPercent: 9,
        targetPercent: 60,
        forecastLabel: "AI Forecast 1 unit · TGT 11 units"
      },
      {
        title: "CASSANDRA Mini BLACK - Cancun Fashion Harbour | from Mexico warehouse",
        unitsNeeded: "7 units needed",
        changeValue: "4 units",
        changePositive: true,
        forecastPercent: 12,
        targetPercent: 50,
        forecastLabel: "AI Forecast 1 unit · TGT 8 units"
      }
    ]
  },

  RecommendationsInsightsModal: {
    title: "Inventory recommendations",
    recommendations: [
      {
        title: "Stop auto-replenishment",
        description: "Disable automatic replenishment for these slow-moving SKUs to reduce excess inventory and prevent overstock. These items have consistently low turnover rates.",
        items: [
          "SAC DE JOUR BABY ROUGE CABERNET - New York Saks",
          "SAC DE JOUR BABY ROUGE CABERNET - Sao Paulo Iguatemi",
          "SAC DE JOUR NANO ORANGE - Toronto Yorkdale Shopping Centre"
        ]
      }
    ]
  },

  TRTAssessmentModal: {
    title: "AMER handbags",
    description: "Next actions to take",
    criteria: [
      {
        title: "Execute transfer orders in Anaplan",
        iconType: "plus"
      },
      {
        title: "Adjust auto-replenishment and MDQ rules in Sh.A.Re",
        iconType: "plus"
      },
      {
        title: "Start outlet transfer process for recommended SKUs",
        iconType: "plus"
      }
    ]
  },

  DecisionGaugeTemplate: {
    title: "Store Manager Agent",
    subtitle: "Paris Avenue Montaigne",
    statusText: "You're on track!",
    isOnTrack: true,
    gauge: {
      percentage: 75,
      label: "EoM Sales Prediction",
      secondaryLabel: true,
      secondaryLabelHighlight: "#3",
      secondaryLabelText: "Leaderboard position"
    },
    opportunityLabel: "This week's opportunity",
    opportunityValue: "€150,000",
    buttonText: "SEE LEADERBOARD",
    buttonAction: { type: 'openModal', modalId: 'leaderboard' }
  },

  LeaderboardModal: {
    title: "Store Leaderboard",
    subtitle: "Sales Performance",
    filters: [
      { label: "Metric", options: ["Sales vs Target", "Conversion", "Revenue"] },
      { label: "Region", options: ["Flagship", "Territory", "Global"] }
    ],
    currentRank: "#5",
    currentPercentage: "68%",
    currentStore: "Sample Store Location",
    items: [
      { rank: 1, name: "Store Alpha", percentage: 95 },
      { rank: 2, name: "Store Beta", percentage: 88 },
      { rank: 3, name: "Store Gamma", percentage: 82 },
      { rank: 4, name: "Store Delta", percentage: 75 },
      { rank: 5, name: "Sample Store Location", percentage: 68 },
      { rank: 6, name: "Store Epsilon", percentage: 62 },
      { rank: 7, name: "Store Zeta", percentage: 55 },
      { rank: 8, name: "Store Eta", percentage: 48 },
      { rank: 9, name: "Store Theta", percentage: 42 },
      { rank: 10, name: "Store Iota", percentage: 38 }
    ]
  },

  FeedbackFormModal: {
    title: "Feedback",
    question: "Was this recommendation helpful?",
    options: [
      "Accurate but need to modify approach",
      "Not applicable to our situation",
      "Need more technical details",
      "Too generic, need specific examples"
    ]
  },

  LeaderboardTopTemplate: {
    title: "Dupixent Highlights",
    subtitle: "Priority Label",
    items: [
      {
        rank: "#00",
        title: "Leaderboard Item",
        additionalInfo: "Additional info.",
        value: "0.0",
        positive: false
      },
      {
        rank: "#00",
        title: "Leaderboard Item",
        additionalInfo: "Additional info.",
        value: "0.0",
        positive: false
      },
      {
        rank: "#00",
        title: "Leaderboard Item",
        additionalInfo: "Additional info.",
        value: "0.0",
        positive: false
      }
    ]
  },

};
