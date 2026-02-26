// Shopfloor Optimizer Agent Data

export const data = {
  // Welcome screen
  welcome: {
    title: "Store Manager",
    subtitle: "Hello, I'm the Aily Store Manager Agent.",
    description:
      "I'm here to help you exceed your sales targets and create exceptional client experiences. Let's make today extraordinary!",
    cta: "Let's get started!",
  },

  // Sales Gauge screen
  salesGauge: {
    title: "Store Manager Agent",
    subtitle: "Paris Avenue Montaigne",
    statusText: "You're not on track!",
    isOnTrack: false,
    gauge: {
      percentage: 52,
      label: "EoM Sales Prediction",
      secondaryLabel: true,
      secondaryLabelHighlight: "#8",
      secondaryLabelText: "Leaderboard position",
    },
    opportunityLabel: "This week's opportunity",
    opportunityValue: "€250,000",
    buttonText: "SEE LEADERBOARD",
    buttonAction: { type: 'openModal', modalId: 'leaderboard' },
  },

  // Leaderboard modal
  leaderboard: {
    title: "Store Leaderboard",
    subtitle: "Avenue Paris Montaigne",
    filters: [
      { label: "Sales vs Target", options: ["Sales vs Target", "Conversion"] },
      { label: "Flagship", options: ["Flagship", "Territory"] },
    ],
    currentRank: "#8",
    currentPercentage: "52%",
    currentStore: "Avenue Paris Montaigne",
    items: [
      { rank: 1, name: "Paris Champs-Élysées", percentage: 92 },
      { rank: 2, name: "Tokyo Ginza Six Mall", percentage: 84 },
      { rank: 3, name: "Paris Rue du Faubourg Saint-Honoré", percentage: 79 },
      { rank: 4, name: "Paris Sèvres-Babylone", percentage: 73 },
      { rank: 5, name: "London New Bond Street", percentage: 62 },
      { rank: 6, name: "Tokyo Omotesando", percentage: 60 },
      { rank: 7, name: "Los Angeles Rodeo Drive", percentage: 59 },
      { rank: 8, name: "Paris Avenue Montaigne", percentage: 52 },
      { rank: 9, name: "New York Madison Avenue", percentage: 45 },
      { rank: 10, name: "Shanghai Plaza 66", percentage: 42 },
    ],
  },

  // Optimized Scenario screen (screen 3)
  optimizedScenario: {
    headerTitle: "Store Manager Agent",
    subtitle: "Paris Avenue Montaigne",
    opportunitySection: {
      label: "Optimized Scenario",
      pill: {
        value: "ai.",
        label: "",
      },
    },
    primaryMetric: {
      title: "Uplift core drivers this week and beat store target",
      value: "+€250,000",
    },
    chart: {
      xKey: "day",
      data: [
        { day: "Mon", baseline: 45, forecast: 45 },
        { day: "Tue", baseline: 65, forecast: 65 },
        { day: "Wed", baseline: 85, forecast: 85 },
        { day: "Thu", baseline: 80, forecast: 110 },
        { day: "Fri", baseline: 80, forecast: 150 },
        { day: "Sat", baseline: 80, forecast: 200 },
        { day: "Sun", baseline: 80, forecast: 250 },
      ],
      lines: [
        { key: "baseline", name: "Baseline", color: "#31D4B6" },
        { key: "forecast", name: "Predicted sales with recommendations", color: "#FF8C00" },
      ],
    },
    kpis: [
      {
        label: "Number of Tickets",
        value: "630",
        change: "+4%",
        positive: true,
      },
      {
        label: "Average Ticket",
        value: "€1,270",
        change: "+2.3%",
        positive: true,
      },
      {
        label: "",
        value: "",
        change: "",
        positive: true,
      },
      {
        label: "",
        value: "",
        change: "",
        positive: true,
      },
    ],
  },

  // Core Store Drivers screen (screen 4)
  coreDrivers: {
    title: "Store Manager Agent",
    subtitle: "Paris Avenue Montaigne",
    aiTitle: "Core Store Drivers",
    aiSubtitle: "",
    items: [
      {
        label: "Footfall and Conversion",
        description: "Last week's traffic -10% vs PY. Act proactively.",
        value: "Conversion focus"
      },
      {
        label: "Basket Composition",
        description: "Weekly UPT of 1.41 vs 1.71 of previous week",
        value: "Target cross-sell"
      },
      {
        label: "CRM Underperformance",
        description: "Repeat-purchase activation at 12.7% vs 21.4% benchmark",
        value: "Drive value up"
      },
      {
        label: "Review Replenishment Requests",
        description: "Low cover in CARRYOVER RTW threatens demand",
        value: "Supply insights"
      }
    ]
  },

  // Driver Insights modals
  driverInsights: {
    footfall: {
      title: "Footfall and Conversion",
      subtitle: "Paris Avenue Montaigne",
      sections: [
        {
          title: "Improve conversion from footfall",
          description: "Lower traffic last week reduced selling opportunities; improved conversion is required to reach target sales."
        },
        {
          title: "Targets for the week",
          bullets: [
            { text: "PW conversion: ", highlight: "17.1% vs 18.5% target" },
            { text: "Required uplift to support plan: ", highlight: "+1.4 pts" },
            { text: "Peak hours underperforming by ", highlight: "–2 pts vs target" }
          ]
        },
        {
          title: "Actions to lift conversion",
          bullets: [
            { text: "Rebalance advisor coverage around peak periods" },
            { text: "Ensure new season delivery is fully merchandised on floor" }
          ]
        },
        {
          title: "Store context",
          description: "This store outperforms plan when advisor coverage and selling discipline align to peak hours and key client flows."
        }
      ],
      feedbackQuestion: "Will you focus on this opportunity?"
    },
    basket: {
      title: "Basket Composition",
      subtitle: "Paris Avenue Montaigne",
      sections: [
        {
          title: "Increase units per transaction",
          description: "Weekly UPT has declined from 1.71 to 1.41, indicating missed cross-sell opportunities."
        },
        {
          title: "Targets for the week",
          bullets: [
            { text: "Current UPT: ", highlight: "1.41 vs 1.71 previous week" },
            { text: "Target UPT: ", highlight: "1.65" },
            { text: "Revenue impact if achieved: ", highlight: "+€45K" }
          ]
        },
        {
          title: "Actions to improve basket",
          bullets: [
            { text: "Focus on complementary product suggestions at point of sale" },
            { text: "Brief team on current promotional bundles" }
          ]
        },
        {
          title: "Store context",
          description: "This store typically achieves high UPT when team is briefed on styling combinations."
        }
      ],
      feedbackQuestion: "Will you focus on this opportunity?"
    },
    crm: {
      title: "CRM Underperformance",
      subtitle: "Paris Avenue Montaigne",
      sections: [
        {
          title: "Drive repeat purchase activation",
          description: "Repeat-purchase activation is significantly below benchmark, reducing customer lifetime value."
        },
        {
          title: "Targets for the week",
          bullets: [
            { text: "Current activation: ", highlight: "12.7% vs 21.4% benchmark" },
            { text: "Gap to close: ", highlight: "8.7 pts" },
            { text: "Potential revenue recovery: ", highlight: "+€82K" }
          ]
        },
        {
          title: "Actions to drive value",
          bullets: [
            { text: "Prioritize outreach to lapsed high-value clients" },
            { text: "Leverage clienteling app for personalized recommendations" }
          ]
        },
        {
          title: "Store context",
          description: "Strong clienteling relationships exist but require more systematic follow-up."
        }
      ],
      feedbackQuestion: "Will you focus on this opportunity?"
    },
    replenishment: {
      title: "Review Replenishment Requests",
      subtitle: "Paris Avenue Montaigne",
      sections: [
        {
          title: "Address stock coverage gaps",
          description: "Low cover in CARRYOVER RTW threatens ability to meet demand."
        },
        {
          title: "Current status",
          bullets: [
            { text: "Stock cover: ", highlight: "2.1 weeks vs 4 week target" },
            { text: "At-risk SKUs: ", highlight: "47 items" },
            { text: "Potential lost sales: ", highlight: "€120K" }
          ]
        },
        {
          title: "Recommended actions",
          bullets: [
            { text: "Submit priority replenishment request for top 20 SKUs" },
            { text: "Review allocation with regional supply team" }
          ]
        },
        {
          title: "Store context",
          description: "CARRYOVER RTW drives 35% of store revenue and requires consistent stock availability."
        }
      ],
      feedbackQuestion: "Will you focus on this opportunity?"
    }
  },

  // Risk Assessment screen (screen 5)
  riskAssessment: {
    title: "Store Manager Agent",
    subtitle: "Paris Avenue Montaigne",
    aiTitle: "Risk Assessment",
    description: "Store positioned well to exceed Q4 targets with AI-driven client strategies.",
    items: [
      {
        label: "Solid appointment conversion rate",
        description: "13% conversion rate. Advisors actively using tier progression insights."
      },
      {
        label: "Consistent flagship excellence",
        description: "Store maintains a consistent weekly rhythm aligned with its flagship profile and stands out as a top-performing flagship in terms of weekly net sales."
      }
    ]
  },

  // Trigger/Impact screen
  trigger: {
    title: "Shopfloor Optimizer",
    subtitle: "Opportunity to boost production efficiency",
    primaryMetric: {
      value: "+12.5%",
      label: "OEE improvement potential",
    },
    secondaryMetric: {
      value: "+€2.8M",
    },
    hasInsights: true,
  },

  // Insights modal content
  insights: {
    title: "Insights",
    subtitle: "Shopfloor Optimizer",
    sections: [
      {
        title: "Downtime Analysis",
        content:
          "Unplanned downtime accounts for 18% of available production time, with Line 3 being the primary contributor.",
      },
      {
        title: "Quality Trends",
        content:
          "First-pass yield has declined by 2.3% over the last quarter, primarily due to calibration drift on packaging equipment.",
      },
      {
        title: "Capacity Utilization",
        content:
          "Current utilization at 72% leaves room for 15% additional throughput without capital investment.",
      },
    ],
  },

  // Production Alerts
  productionAlerts: {
    title: "Production Alerts",
    subtitle: "Manufacturing Lines",
    location: "Plant A",
    aiTitle: "Operations",
    aiSubtitle: "Action Required",
    items: [
      {
        label: "Line 1 - Assembly",
        description: "Cycle time variance detected: 8% above standard, impacting throughput",
        value: "High Priority"
      },
      {
        label: "Line 2 - Packaging",
        description: "Scheduled maintenance overdue by 3 days, risk of unplanned downtime",
        value: "Medium Priority"
      },
      {
        label: "Line 3 - Quality Control",
        description: "Reject rate increased to 4.2%, exceeding 3% threshold",
        value: "High Priority"
      }
    ]
  },

  // Alert Insights
  alertInsights: {
    line1: {
      title: "Line 1 - Assembly",
      subtitle: "Cycle Time Analysis",
      sections: [
        {
          title: "Issue Overview",
          content: "Cycle time has increased by 8% over the past 2 weeks, reducing daily output by approximately 120 units."
        },
        {
          title: "Root Cause",
          content: "Analysis indicates worn tooling on Station 4 causing repeated micro-stops and operator interventions. Secondary factor is material feed inconsistency from upstream process."
        },
        {
          title: "Recommended Actions",
          content: "Schedule immediate tooling replacement during next shift change. Implement material buffer between stations to absorb upstream variability."
        }
      ]
    },
    line2: {
      title: "Line 2 - Packaging",
      subtitle: "Maintenance Alert",
      sections: [
        {
          title: "Current Status",
          content: "Preventive maintenance is 3 days overdue on the primary sealing unit. Equipment is still operational but showing early signs of performance degradation."
        },
        {
          title: "Risk Assessment",
          content: "Based on historical data, similar delays have resulted in 4-6 hour unplanned stops. Probability of failure in next 48 hours estimated at 35%."
        },
        {
          title: "Recovery Strategy",
          content: "Schedule maintenance for tonight's shift downtime. Pre-position spare parts and allocate dedicated maintenance crew. Estimated maintenance time: 2.5 hours."
        }
      ]
    },
    line3: {
      title: "Line 3 - Quality Control",
      subtitle: "Reject Rate Analysis",
      sections: [
        {
          title: "Defect Analysis",
          content: "Reject rate has increased from baseline 2.1% to 4.2%. Primary defect type is dimensional variance (68% of rejects), followed by surface defects (24%)."
        },
        {
          title: "Root Cause",
          content: "Dimensional issues traced to temperature fluctuations in the molding process. Surface defects correlating with material lot 2024-Q4-887."
        },
        {
          title: "Corrective Actions",
          content: "Recalibrate temperature controllers on molding machines. Quarantine affected material lot and request supplier investigation. Expected yield recovery within 24 hours."
        }
      ]
    }
  },

  // Decision Levers / Scenarios
  scenarios: {
    title: "Decision Levers",
    timeperiods: ["1 month", "1 quarter"],
    strategies: {
      "1 month": [
        {
          id: "aggressive",
          name: "Max Efficiency",
          metrics: {
            fcf: {
              value: "+8.5%",
              label: "OEE",
              positive: true,
            },
            conversionRate: {
              value: "+€1.2M",
              label: "Cost Savings",
              positive: true,
            },
          },
          description:
            "Aggressive optimization with extended maintenance windows and process changes.",
          impact: {
            title: "Impact Assessment",
            subtitle: "Aily recommends",
            primaryMetric: {
              title: "Production impact",
              value: "+8.5% OEE",
            },
            chart: {
              data: [
                { quarter: "Week 1", baseline: 72, forecast: 74 },
                { quarter: "Week 2", baseline: 72, forecast: 77 },
                { quarter: "Week 3", baseline: 73, forecast: 80 },
                { quarter: "Week 4", baseline: 73, forecast: 82 },
              ],
              legend: {
                baseline: "Current OEE",
                forecast: "Projected OEE",
              },
            },
            secondaryMetric: {
              label: "Throughput increase",
              value: "+450 units/day",
              change: "+12%",
              positive: true,
            },
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: "Efficiency Strategy",
              sections: [
                {
                  category: ".ops",
                  title: "Reduce unplanned downtime",
                  value: "-45% (€520K)",
                  positive: true,
                },
                {
                  category: ".quality",
                  title: "Improve first-pass yield",
                  value: "+2.1% (€380K)",
                  positive: true,
                },
                {
                  category: ".maint",
                  title: "Optimize maintenance schedule",
                  value: "-18% costs (€300K)",
                  positive: true,
                },
              ],
            },
            {
              title: "Implementation Road",
              subtitle: "Top Efficiency Actions",
              topMetrics: [
                {
                  topLabel: "Total savings",
                  value: "+€1.2M",
                  bottomLabel: "Monthly cost reduction",
                  positive: true
                }
              ],
              sections: [
                {
                  category: ".ops Downtime",
                  items: [
                    {
                      value: "-2.5 hrs/day",
                      barSize: 150,
                      barLength: 80,
                      description: "Predictive maintenance on Line 1 (+€200K)",
                    },
                    {
                      value: "-1.8 hrs/day",
                      barSize: 150,
                      barLength: 65,
                      description: "Quick changeover implementation (+€150K)",
                    },
                  ],
                },
                {
                  category: ".quality Yield",
                  items: [
                    {
                      value: "+2.1%",
                      barSize: 150,
                      barLength: 70,
                      description: "SPC implementation on critical CTQs (+€380K)",
                    },
                  ],
                },
                {
                  category: ".maint Schedule",
                  items: [
                    {
                      value: "-€45K/mo",
                      barSize: 150,
                      barLength: 55,
                      positive: true,
                      description: "Condition-based maintenance rollout",
                    },
                  ],
                },
              ],
            },
            {
              title: "Implementation Decision",
              subtitle: "Shopfloor Optimizer · 1 Month Plan",
              mainTitle: "Priority Actions",
              items: [
                {
                  label: "#1 - Line 1 Tooling",
                  description: "Replace worn tooling on Station 4 to restore cycle time to standard."
                },
                {
                  label: "#2 - Predictive Sensors",
                  description: "Install vibration sensors on critical equipment for early failure detection."
                },
                {
                  label: "#3 - SPC Rollout",
                  description: "Implement statistical process control on top 5 quality characteristics."
                },
                {
                  label: "#4 - Maintenance Scheduling",
                  description: "Shift from calendar-based to condition-based maintenance triggers."
                }
              ]
            },
          ],
          assessment: {
            title: "TRT Assessment",
            subtitle: "Team Readiness",
            description:
              "Operations team shows strong capability for rapid improvement initiatives.",
            criteria: [
              {
                status: "success",
                iconType: "plus",
                title: "Strong lean manufacturing foundation",
                description:
                  "Team has experience with kaizen events and quick wins.",
              },
              {
                status: "success",
                iconType: "thunder",
                title: "Good data infrastructure",
                description:
                  "Real-time OEE tracking already in place on all lines.",
              },
              {
                status: "warning",
                iconType: "exclamation",
                title: "Maintenance backlog exists",
                description:
                  "Some deferred maintenance may slow initial progress.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "Management commitment secured",
                description:
                  "Plant leadership aligned on efficiency improvement goals.",
              },
            ],
          },
        },
        {
          id: "balanced",
          name: "Steady Improvement",
          metrics: {
            fcf: {
              value: "+4.2%",
              label: "OEE",
              positive: true,
            },
            conversionRate: {
              value: "+€600K",
              label: "Cost Savings",
              positive: true,
            },
          },
          description:
            "Gradual optimization minimizing production disruption.",
          impact: {
            title: "Impact Assessment",
            subtitle: "Aily recommends",
            primaryMetric: {
              title: "Production impact",
              value: "+4.2% OEE",
            },
            chart: {
              data: [
                { quarter: "Week 1", baseline: 72, forecast: 73 },
                { quarter: "Week 2", baseline: 72, forecast: 74 },
                { quarter: "Week 3", baseline: 73, forecast: 75 },
                { quarter: "Week 4", baseline: 73, forecast: 76 },
              ],
              legend: {
                baseline: "Current OEE",
                forecast: "Projected OEE",
              },
            },
            secondaryMetric: {
              label: "Throughput increase",
              value: "+220 units/day",
              change: "+6%",
              positive: true,
            },
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: "Efficiency Strategy",
              sections: [
                {
                  category: ".ops",
                  title: "Reduce unplanned downtime",
                  value: "-22% (€260K)",
                  positive: true,
                },
                {
                  category: ".quality",
                  title: "Improve first-pass yield",
                  value: "+1.0% (€180K)",
                  positive: true,
                },
                {
                  category: ".maint",
                  title: "Optimize maintenance schedule",
                  value: "-10% costs (€160K)",
                  positive: true,
                },
              ],
            },
            {
              title: "Implementation Road",
              subtitle: "Top Efficiency Actions",
              sections: [
                {
                  category: ".ops Downtime",
                  items: [
                    {
                      value: "-1.2 hrs/day",
                      barSize: 150,
                      barLength: 50,
                      description: "Address top 3 downtime causes (+€150K)",
                    },
                  ],
                },
                {
                  category: ".quality Yield",
                  items: [
                    {
                      value: "+1.0%",
                      barSize: 150,
                      barLength: 45,
                      description: "Operator training on defect prevention (+€180K)",
                    },
                  ],
                },
                {
                  category: ".maint Schedule",
                  items: [
                    {
                      value: "-€25K/mo",
                      barSize: 150,
                      barLength: 40,
                      description: "Optimize PM frequencies based on data",
                    },
                  ],
                },
              ],
            },
          ],
          assessment: {
            title: "TRT Assessment",
            subtitle: "Team Readiness",
            description: "Team suited for measured improvement approach.",
            criteria: [
              {
                status: "success",
                iconType: "plus",
                title: "Low risk tolerance appropriate",
                description:
                  "Steady approach matches team's preference for stability.",
              },
              {
                status: "negative",
                iconType: "minus",
                title: "Slower ROI realization",
                description:
                  "Benefits will take longer to materialize.",
              },
              {
                status: "success",
                iconType: "thunder",
                title: "Sustainable change pace",
                description:
                  "Changes can be absorbed without overwhelming the team.",
              },
              {
                status: "warning",
                iconType: "exclamation",
                title: "Competitor pressure",
                description:
                  "May need to accelerate if market conditions change.",
              },
            ],
          },
        },
      ],
      "1 quarter": [
        {
          id: "aggressive",
          name: "Max Efficiency",
          metrics: {
            fcf: {
              value: "+12.5%",
              label: "OEE",
              positive: true,
            },
            conversionRate: {
              value: "+€2.8M",
              label: "Cost Savings",
              positive: true,
            },
          },
          description:
            "Comprehensive transformation with significant capital investment.",
          impact: {
            title: "Impact Assessment",
            subtitle: "Aily recommends",
            primaryMetric: {
              title: "Quarterly production impact",
              value: "+12.5% OEE",
            },
            chart: {
              data: [
                { quarter: "Month 1", baseline: 72, forecast: 77 },
                { quarter: "Month 2", baseline: 73, forecast: 82 },
                { quarter: "Month 3", baseline: 73, forecast: 85 },
              ],
              legend: {
                baseline: "Current OEE",
                forecast: "Projected OEE",
              },
            },
            secondaryMetric: {
              label: "Annual throughput increase",
              value: "+165K units",
              change: "+18%",
              positive: true,
            },
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: "Efficiency Strategy",
              sections: [
                {
                  category: ".ops",
                  title: "Reduce unplanned downtime",
                  value: "-65% (€1.1M)",
                  positive: true,
                },
                {
                  category: ".quality",
                  title: "Improve first-pass yield",
                  value: "+3.5% (€850K)",
                  positive: true,
                },
                {
                  category: ".maint",
                  title: "Optimize maintenance schedule",
                  value: "-35% costs (€850K)",
                  positive: true,
                },
              ],
            },
            {
              title: "Implementation Road",
              subtitle: "Top Efficiency Actions",
              topMetrics: [
                {
                  topLabel: "Total quarterly savings",
                  value: "+€2.8M",
                  bottomLabel: "Cost reduction over 3 months",
                  positive: true
                }
              ],
              sections: [
                {
                  category: ".ops Automation",
                  items: [
                    {
                      value: "+25%",
                      barSize: 150,
                      barLength: 90,
                      description: "Automated changeover on Line 2 (+€450K)",
                    },
                  ],
                },
                {
                  category: ".quality AI",
                  items: [
                    {
                      value: "-80%",
                      barSize: 150,
                      barLength: 85,
                      description: "Vision system for defect detection (+€600K)",
                    },
                  ],
                },
                {
                  category: ".maint Predictive",
                  items: [
                    {
                      value: "-90%",
                      barSize: 150,
                      barLength: 80,
                      description: "Full predictive maintenance deployment (+€700K)",
                    },
                  ],
                },
              ],
            },
          ],
          assessment: {
            title: "TRT Assessment",
            subtitle: "Team Readiness",
            description:
              "Organization ready for significant transformation.",
            criteria: [
              {
                status: "success",
                iconType: "thunder",
                title: "Capital budget approved",
                description:
                  "Investment funding secured for automation projects.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "Technical expertise available",
                description:
                  "Internal and external resources lined up for implementation.",
              },
              {
                status: "negative",
                iconType: "minus",
                title: "Production risk during transition",
                description:
                  "Some output disruption expected during major changes.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "Strong change management",
                description:
                  "Communication plan and training programs prepared.",
              },
            ],
          },
        },
        {
          id: "balanced",
          name: "Steady Improvement",
          metrics: {
            fcf: {
              value: "+7.0%",
              label: "OEE",
              positive: true,
            },
            conversionRate: {
              value: "+€1.4M",
              label: "Cost Savings",
              positive: true,
            },
          },
          description:
            "Phased improvement with minimal production disruption.",
          impact: {
            title: "Impact Assessment",
            subtitle: "Aily recommends",
            primaryMetric: {
              title: "Quarterly production impact",
              value: "+7.0% OEE",
            },
            chart: {
              data: [
                { quarter: "Month 1", baseline: 72, forecast: 74 },
                { quarter: "Month 2", baseline: 73, forecast: 77 },
                { quarter: "Month 3", baseline: 73, forecast: 79 },
              ],
              legend: {
                baseline: "Current OEE",
                forecast: "Projected OEE",
              },
            },
            secondaryMetric: {
              label: "Annual throughput increase",
              value: "+85K units",
              change: "+9%",
              positive: true,
            },
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: "Efficiency Strategy",
              sections: [
                {
                  category: ".ops",
                  title: "Reduce unplanned downtime",
                  value: "-35% (€550K)",
                  positive: true,
                },
                {
                  category: ".quality",
                  title: "Improve first-pass yield",
                  value: "+2.0% (€450K)",
                  positive: true,
                },
                {
                  category: ".maint",
                  title: "Optimize maintenance schedule",
                  value: "-20% costs (€400K)",
                  positive: true,
                },
              ],
            },
            {
              title: "Implementation Road",
              subtitle: "Top Efficiency Actions",
              sections: [
                {
                  category: ".ops Process",
                  items: [
                    {
                      value: "-35%",
                      barSize: 150,
                      barLength: 60,
                      description: "SMED implementation on all lines (+€350K)",
                    },
                  ],
                },
                {
                  category: ".quality Training",
                  items: [
                    {
                      value: "+2.0%",
                      barSize: 150,
                      barLength: 55,
                      description: "Quality circles and operator certification (+€450K)",
                    },
                  ],
                },
                {
                  category: ".maint Planning",
                  items: [
                    {
                      value: "-20%",
                      barSize: 150,
                      barLength: 50,
                      description: "CMMS optimization and spare parts management (+€400K)",
                    },
                  ],
                },
              ],
            },
          ],
          assessment: {
            title: "TRT Assessment",
            subtitle: "Team Readiness",
            description: "Sustainable approach matching organizational capacity.",
            criteria: [
              {
                status: "success",
                iconType: "thunder",
                title: "Minimal disruption risk",
                description:
                  "Production commitments can be maintained throughout.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "Internal resources sufficient",
                description:
                  "Can be executed with existing team capabilities.",
              },
              {
                status: "warning",
                iconType: "exclamation",
                title: "Delayed competitive advantage",
                description:
                  "Slower improvement may impact market position.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "Lower investment required",
                description:
                  "Reduced capital expenditure compared to aggressive approach.",
              },
            ],
          },
        },
      ],
    },
  },

  // KPI Dashboard
  kpiDashboard: {
    headerTitle: "Production Dashboard",
    subtitle: "Plant A - Live Metrics",
    opportunitySection: {
      label: "Status",
      pill: {
        value: "85%",
        label: "OEE",
      },
    },
    primaryMetric: {
      title: "Daily output",
      value: "+3,450 units",
    },
    chart: {
      xKey: "shift",
      data: [
        { shift: "6AM", baseline: 280, forecast: 295 },
        { shift: "8AM", baseline: 310, forecast: 340 },
        { shift: "10AM", baseline: 305, forecast: 335 },
        { shift: "12PM", baseline: 290, forecast: 320 },
        { shift: "2PM", baseline: 315, forecast: 350 },
        { shift: "4PM", baseline: 300, forecast: 330 },
      ],
      lines: [
        { key: "baseline", name: "Target", color: "#FF8C00" },
        { key: "forecast", name: "Actual", color: "#00ffb3" },
      ],
    },
    kpis: [
      {
        label: "Availability",
        value: "92%",
        change: "+3%",
        positive: true,
      },
      {
        label: "Performance",
        value: "88%",
        change: "+5%",
        positive: true,
      },
      {
        label: "Quality",
        value: "97.8%",
        change: "-0.2%",
        positive: false,
      },
      {
        label: "Downtime",
        value: "45 min",
        change: "-18 min",
        positive: true,
      },
    ],
  },
};
