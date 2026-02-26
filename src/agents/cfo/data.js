// CFO Cash Optimizer Agent Data

export const data = {
  // Welcome screen
  welcome: {
    title: "CFO Cash Optimizer",
    subtitle: "Hello, I am the Aily CFO Cash Optimizer Agent.",
    description:
      "I can help you optimize your cash flow by improving your FCF conversion rate through strategic management of DSO, DPO, and DIO.",
    cta: "Let's get started!",
  },

  // Trigger/Impact screen
  trigger: {
    title: "CFO Cash Optimizer",
    subtitle: "Opportunity to boost 2025 - 2026 FCF",
    primaryMetric: {
      value: "+€400M",
      label: "by improving FCF conversion",
    },
    secondaryMetric: {
      value: "+1.2pp",
    },
    hasInsights: true,
  },

  // Insights modal content
  insights: {
    title: "Insights",
    subtitle: "CFO Cash Optimizer",
    sections: [
      {
        title: "Competitor insights",
        content:
          "AI competitors to improve conversion rate, all reaching 28.3% conversion rate.",
      },
      {
        title: "Improve FCF Trend",
        content:
          "FCF declining by 1.2% requiring improvements in DSO, DIO, DPO.",
      },
    ],
  },

  // GetMoney example - Priority focus areas
  priorityFocus: {
    title: "Implementation Decision",
    subtitle: "CFO Cash Optimizer · Priority Actions",
    mainTitle: "Focus Areas",
    items: [
      {
        label: "#1 - DSO Reduction",
        description: "Accelerate payment collection from key accounts in China and Spain to improve cash position by €85M."
      },
      {
        label: "#2 - DPO Extension",
        description: "Negotiate extended payment terms with US suppliers while maintaining relationships for €60M benefit."
      },
      {
        label: "#3 - DIO Optimization",
        description: "Strategic inventory management across product lines, balancing OOS risk with cash flow needs."
      },
      {
        label: "#4 - Regional Strategy",
        description: "Align cash flow initiatives with regional business priorities and market conditions for sustainable growth."
      }
    ]
  },

  // IRInteractiveDecision example - Procurement launches
  procurementLaunches: {
    title: "Procurement Launches",
    subtitle: "Amlitelimab AD",
    location: "USA",
    aiTitle: "Marketing & Sales",
    aiSubtitle: "Action Required",
    items: [
      {
        label: "Study SFY17915 (Phase II)",
        description: "Significant delays (up to 25 days) in Canada for Site Initiation Visits",
        value: "January 2025"
      },
      {
        label: "Study EFC17559",
        description: "6 patients behind plan with $860K spent on PPD Global Central Labs",
        value: "January 2025"
      },
      {
        label: "Study EFC17599",
        description: "49-day delay in site initiation, with +€674k invested in Clariness",
        value: "January 2025"
      }
    ]
  },

  // Procurement Launches Insights
  procurementInsights: {
    study1: {
      title: "Study SFY17915 (Phase II)",
      subtitle: "Site Initiation Delays - Canada",
      sections: [
        {
          title: "Issue Overview",
          content: "Site Initiation Visits are experiencing significant delays of up to 25 days in Canadian locations, impacting overall study timeline and potentially delaying drug approval milestones."
        },
        {
          title: "Root Causes",
          content: "Analysis indicates regulatory documentation processing delays at provincial level, combined with limited availability of specialized clinical research coordinators in the Canadian market during Q1 2025."
        },
        {
          title: "Recommended Actions",
          content: "Expedite local regulatory submissions through specialized consultants, pre-qualify backup sites in major Canadian cities, and consider increasing site initiation budgets by 15% to secure priority scheduling."
        }
      ]
    },
    study2: {
      title: "Study EFC17559",
      subtitle: "Enrollment Behind Plan",
      sections: [
        {
          title: "Current Status",
          content: "Study is 6 patients behind enrollment plan while $860K has already been invested in PPD Global Central Labs infrastructure and setup costs."
        },
        {
          title: "Financial Impact",
          content: "Current cost per enrolled patient is 35% above budget projections. If enrollment continues at current pace, total study cost overrun could reach $2.1M by Q3 2025."
        },
        {
          title: "Recovery Strategy",
          content: "Activate 3 additional backup sites in high-enrollment regions, increase patient recruitment advertising budget by $180K, and implement patient referral incentive program for participating physicians."
        }
      ]
    },
    study3: {
      title: "Study EFC17599",
      subtitle: "Site Initiation Timeline Issues",
      sections: [
        {
          title: "Delay Analysis",
          content: "49-day delay in site initiation has occurred despite +€674K investment in Clariness CRO services, representing a critical path risk to the overall study timeline."
        },
        {
          title: "Vendor Performance",
          content: "Clariness has underperformed on site activation timelines compared to contract SLAs. 12 of 18 planned sites still pending final regulatory clearance and ethics committee approval."
        },
        {
          title: "Mitigation Plan",
          content: "Escalate to Clariness executive leadership for dedicated task force, consider parallel site qualification in alternative regions, and evaluate penalty clauses in CRO contract for missed milestones."
        }
      ]
    }
  },

  // Decision Levers / Scenarios
  scenarios: {
    title: "Decision Levers",
    timeperiods: ["1 year", "3 years"],
    strategies: {
      "1 year": [
        {
          id: "aggressive",
          name: "Beat Competition",
          metrics: {
            fcf: {
              value: "+€400M",
              label: "FCF",
              positive: true,
            },
            conversionRate: {
              value: "+1.2pp",
              label: "Conversion Rate",
              positive: true,
            },
          },
          description:
            "Puts pressure on early payment discounts, supplier relationships, goodwill, and OOS risk.",
          // Impact Assessment data
          impact: {
            title: "Impact Assessment",
            subtitle: "Aily recommends",
            primaryMetric: {
              title: "FCF impact 2025-2026",
              value: "+€400M",
            },
            chart: {
              data: [
                { quarter: "Q1-25", baseline: 1.0, forecast: 1.4 },
                { quarter: "Q2-25", baseline: 0.8, forecast: 1.2 },
                { quarter: "Q3-25", baseline: 1.4, forecast: 1.8 },
                { quarter: "Q4-25", baseline: 1.5, forecast: 1.6 },
                { quarter: "Q1-26", baseline: 1.0, forecast: 1.3 },
              ],
              legend: {
                baseline: "Baseline",
                forecast: "AI forecasted FCF",
              },
            },
            secondaryMetric: {
              label: "FCF conversion rate",
              value: "6.6B",
              change: "+€80M",
              positive: true,
            },
          },
          // Implementation Road
          implementation: [
            {
              title: "Implementation Road",
              subtitle: "Efficiency Strategy",
              sections: [
                {
                  category: ".fin",
                  title: "From 38 days shorten DSO",
                  value: "-1 day (€6M)",
                  positive: true,
                },
                {
                  category: ".fin",
                  title: "From 41 days increase DPO",
                  value: "+0 days (€1M)",
                  positive: true,
                },
                {
                  category: ".supply",
                  title: "From 82 days improve DIO",
                  value: "-1 day (€35M)",
                  positive: true,
                },
              ],
            },
            {
              title: "Implementation Road",
              subtitle: "Top Efficiency Actions",
              topMetrics: [
                {
                  topLabel: "Total FCF impact",
                  value: "+€400M",
                  bottomLabel: "Additional cash flow over 1 year",
                  positive: true
                }
              ],
              sections: [
                {
                  category: ".fin DSO",
                  items: [
                    {
                      value: "-2 days",
                      barSize: 150,
                      barLength: 60,
                      description: "Accelerate China Public (+30M FCF)",
                    },
                    {
                      value: "-7 days",
                      barSize: 150,
                      barLength: 100,
                      description: "Accelerate Spain Public (+55M FCF)",
                    },
                  ],
                },
                {
                  category: ".fin DPO",
                  items: [
                    {
                      value: "+3 days",
                      barSize: 150,
                      barLength: 70,
                      description: "Increase USA Private (+60M FCF)",
                    },
                  ],
                },
                {
                  category: ".supply DIO",
                  items: [
                    {
                      value: "+€5.2M",
                      barSize: 150,
                      barLength: 90,
                      positive: false,
                      description:
                        "Increase inventory in Dupixent due to OOS risk",
                    },
                  ],
                },
              ],
            },
            {
              title: "Implementation Decision",
              subtitle: "CFO Cash Optimizer · 1 Year Plan",
              mainTitle: "Priority Actions",
              items: [
                {
                  label: "#1 - DSO Reduction",
                  description: "Accelerate payment collection from key accounts in China and Spain to improve cash position by €85M."
                },
                {
                  label: "#2 - DPO Extension",
                  description: "Negotiate extended payment terms with US suppliers while maintaining relationships for €60M benefit."
                },
                {
                  label: "#3 - DIO Optimization",
                  description: "Strategic inventory management across product lines, balancing OOS risk with cash flow needs."
                },
                {
                  label: "#4 - Regional Alignment",
                  description: "Align cash flow initiatives with regional business priorities and market conditions."
                }
              ]
            },
          ],
          // TRT Assessment
          assessment: {
            title: "TRT Assessment",
            subtitle: "Top Efficiency Actions",
            description:
              "Team shows solid capacity to act on high-impact financial levers.",
            criteria: [
              {
                status: "success",
                iconType: "plus",
                title: "Strong tolerance for bold finance moves",
                description:
                  "Team ready to shorten DSO or shift DPO without hesitation.",
              },
              {
                status: "success",
                iconType: "thunder",
                title: "Good openness to test-and-learn",
                description:
                  "Willingness to experiment with inventory and cashflow pilots.",
              },
              {
                status: "warning",
                iconType: "exclamation",
                title: "Moderate clarity in ownership",
                description:
                  "Some ambiguity in who owns specific levers. Align before rollout.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "High alignment with urgency of change",
                description:
                  "Team understands need for fast action to support CEO priorities.",
              },
            ],
          },
        },
        {
          id: "balanced",
          name: "Balanced",
          metrics: {
            fcf: {
              value: "+€20M",
              label: "FCF",
              positive: true,
            },
            conversionRate: {
              value: "-0.1pp",
              label: "Conversion Rate",
              positive: false,
            },
          },
          description:
            "Preserves business relationships at the cost of some financial optimization.",
          impact: {
            title: "Impact Assessment",
            subtitle: "Aily recommends",
            primaryMetric: {
              title: "FCF impact 2025-2026",
              value: "+€20M",
            },
            chart: {
              data: [
                { quarter: "Q1-25", baseline: 1.0, forecast: 1.05 },
                { quarter: "Q2-25", baseline: 0.8, forecast: 0.85 },
                { quarter: "Q3-25", baseline: 1.4, forecast: 1.45 },
                { quarter: "Q4-25", baseline: 1.5, forecast: 1.52 },
                { quarter: "Q1-26", baseline: 1.0, forecast: 1.03 },
              ],
              legend: {
                baseline: "Baseline",
                forecast: "AI forecasted FCF",
              },
            },
            secondaryMetric: {
              label: "FCF conversion rate",
              value: "6.5B",
              change: "+€5M",
              positive: true,
            },
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: "Efficiency Strategy",
              sections: [
                {
                  category: ".fin",
                  title: "From 38 days shorten DSO",
                  value: "+0 days (€1M)",
                  positive: true,
                },
                {
                  category: ".fin",
                  title: "From 41 days increase DPO",
                  value: "+1 days (€8M)",
                  positive: true,
                },
                {
                  category: ".supply",
                  title: "From 82 days improve DIO",
                  value: "+0 days (€11M)",
                  positive: true,
                },
              ],
            },
            {
              title: "Implementation Road",
              subtitle: "Top Efficiency Actions",
              sections: [
                {
                  category: ".fin DSO",
                  items: [
                    {
                      value: "+0 days",
                      barSize: 150,
                      barLength: 40,
                      positive: false,
                      description: "Maintain China Public relationships",
                    },
                  ],
                },
                {
                  category: ".fin DPO",
                  items: [
                    {
                      value: "+1 day",
                      barSize: 150,
                      barLength: 50,
                      description: "Slight increase USA Private (+8M FCF)",
                    },
                  ],
                },
                {
                  category: ".supply DIO",
                  items: [
                    {
                      value: "+€11M",
                      barSize: 150,
                      barLength: 60,
                      description: "Minor inventory optimization in Dupixent",
                    },
                  ],
                },
              ],
            },
          ],
          assessment: {
            title: "TRT Assessment",
            subtitle: "Top Efficiency Actions",
            description: "Team shows solid capacity with measured approach.",
            criteria: [
              {
                status: "success",
                iconType: "plus",
                title: "Balanced risk tolerance",
                description:
                  "Team comfortable with incremental changes to DSO and DPO.",
              },
              {
                status: "negative",
                iconType: "minus",
                title: "Strong relationship focus",
                description:
                  "Prioritizes maintaining key business partnerships.",
              },
              {
                status: "success",
                iconType: "thunder",
                title: "Clear ownership structure",
                description:
                  "Well-defined responsibilities across finance and supply teams.",
              },
              {
                status: "warning",
                iconType: "exclamation",
                title: "Moderate urgency alignment",
                description:
                  "Team understands priorities while maintaining stability.",
              },
            ],
          },
        },
      ],
      "3 years": [
        {
          id: "aggressive",
          name: "Beat Competition",
          metrics: {
            fcf: {
              value: "+€1.2B",
              label: "FCF",
              positive: true,
            },
            conversionRate: {
              value: "+3.8pp",
              label: "Conversion Rate",
              positive: true,
            },
          },
          description:
            "Puts pressure on early payment discounts, supplier relationships, goodwill, and OOS risk.",
          impact: {
            title: "Impact Assessment",
            subtitle: "Aily recommends",
            primaryMetric: {
              title: "FCF impact 2025-2028",
              value: "+€1.2B",
            },
            chart: {
              data: [
                { quarter: "2025", baseline: 3.2, forecast: 3.8 },
                { quarter: "2026", baseline: 3.5, forecast: 4.5 },
                { quarter: "2027", baseline: 3.8, forecast: 5.2 },
                { quarter: "2028", baseline: 4.0, forecast: 5.8 },
              ],
              legend: {
                baseline: "Baseline",
                forecast: "AI forecasted FCF",
              },
            },
            secondaryMetric: {
              label: "FCF conversion rate",
              value: "7.2B",
              change: "+€240M",
              positive: true,
            },
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: "Efficiency Strategy",
              sections: [
                {
                  category: ".fin",
                  title: "From 38 days shorten DSO",
                  value: "-5 days (€120M)",
                  positive: true,
                },
                {
                  category: ".fin",
                  title: "From 41 days increase DPO",
                  value: "+3 days (€85M)",
                  positive: true,
                },
                {
                  category: ".supply",
                  title: "From 82 days improve DIO",
                  value: "-8 days (€315M)",
                  positive: true,
                },
              ],
            },
            {
              title: "Implementation Road",
              subtitle: "Top Efficiency Actions",
              topMetrics: [
                {
                  topLabel: "Total FCF impact",
                  value: "+€1.2B",
                  bottomLabel: "Additional cash flow over 3 years",
                  positive: true
                }
              ],
              sections: [
                {
                  category: ".fin DSO",
                  items: [
                    {
                      value: "-5 days",
                      barSize: 150,
                      barLength: 85,
                      description:
                        "Accelerate global payment terms (+120M FCF)",
                    },
                  ],
                },
                {
                  category: ".fin DPO",
                  items: [
                    {
                      value: "+3 days",
                      barSize: 150,
                      barLength: 75,
                      description: "Strategic supplier negotiation (+85M FCF)",
                    },
                  ],
                },
                {
                  category: ".supply DIO",
                  items: [
                    {
                      value: "+€315M",
                      barSize: 150,
                      barLength: 95,
                      description: "Comprehensive inventory optimization",
                    },
                  ],
                },
              ],
            },
          ],
          assessment: {
            title: "TRT Assessment",
            subtitle: "Top Efficiency Actions",
            description:
              "Team shows solid capacity to act on high-impact financial levers.",
            criteria: [
              {
                status: "success",
                iconType: "thunder",
                title: "Strong tolerance for bold finance moves",
                description:
                  "Team ready to shorten DSO or shift DPO without hesitation.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "Good openness to test-and-learn",
                description:
                  "Willingness to experiment with inventory and cashflow pilots.",
              },
              {
                status: "negative",
                iconType: "minus",
                title: "Moderate clarity in ownership",
                description:
                  "Some ambiguity in who owns specific levers. Align before rollout.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "High alignment with urgency of change",
                description:
                  "Team understands need for fast action to support CEO priorities.",
              },
            ],
          },
        },
        {
          id: "balanced",
          name: "Balanced",
          metrics: {
            fcf: {
              value: "+€180M",
              label: "FCF",
              positive: true,
            },
            conversionRate: {
              value: "+0.2pp",
              label: "Conversion Rate",
              positive: true,
            },
          },
          description:
            "Preserves business relationships at the cost of some financial optimization.",
          impact: {
            title: "Impact Assessment",
            subtitle: "Aily recommends",
            primaryMetric: {
              title: "FCF impact 2025-2028",
              value: "+€180M",
            },
            chart: {
              data: [
                { quarter: "2025", baseline: 3.2, forecast: 3.3 },
                { quarter: "2026", baseline: 3.5, forecast: 3.7 },
                { quarter: "2027", baseline: 3.8, forecast: 4.1 },
                { quarter: "2028", baseline: 4.0, forecast: 4.4 },
              ],
              legend: {
                baseline: "Baseline",
                forecast: "AI forecasted FCF",
              },
            },
            secondaryMetric: {
              label: "FCF conversion rate",
              value: "6.7B",
              change: "+€45M",
              positive: true,
            },
          },
          implementation: [
            {
              title: "Implementation Road",
              subtitle: "Efficiency Strategy",
              sections: [
                {
                  category: ".fin",
                  title: "From 38 days shorten DSO",
                  value: "-1 day (€25M)",
                  positive: true,
                },
                {
                  category: ".fin",
                  title: "From 41 days increase DPO",
                  value: "+2 days (€55M)",
                  positive: true,
                },
                {
                  category: ".supply",
                  title: "From 82 days improve DIO",
                  value: "-2 days (€100M)",
                  positive: true,
                },
              ],
            },
            {
              title: "Implementation Road",
              subtitle: "Top Efficiency Actions",
              sections: [
                {
                  category: ".fin DSO",
                  items: [
                    {
                      value: "-1 day",
                      barSize: 150,
                      barLength: 55,
                      positive: false,
                      description:
                        "Modest payment term improvements (+25M FCF)",
                    },
                  ],
                },
                {
                  category: ".fin DPO",
                  items: [
                    {
                      value: "+2 days",
                      barSize: 150,
                      barLength: 65,
                      description: "Balanced supplier negotiations (+55M FCF)",
                    },
                  ],
                },
                {
                  category: ".supply DIO",
                  items: [
                    {
                      value: "+€100M",
                      barSize: 150,
                      barLength: 70,
                      description: "Selective inventory optimization",
                    },
                  ],
                },
              ],
            },
          ],
          assessment: {
            title: "TRT Assessment",
            subtitle: "Top Efficiency Actions",
            description: "Team shows solid capacity with measured approach.",
            criteria: [
              {
                status: "success",
                iconType: "thunder",
                title: "Balanced risk tolerance",
                description:
                  "Team comfortable with incremental changes to DSO and DPO.",
              },
              {
                status: "success",
                iconType: "plus",
                title: "Strong relationship focus",
                description:
                  "Prioritizes maintaining key business partnerships.",
              },
              {
                status: "negative",
                iconType: "minus",
                title: "Clear ownership structure",
                description:
                  "Well-defined responsibilities across finance and supply teams.",
              },
              {
                status: "warning",
                iconType: "exclamation",
                title: "Moderate urgency alignment",
                description:
                  "Team understands priorities while maintaining stability.",
              },
            ],
          },
        },
      ],
    },
  },

  // Follow-up questions for superagent mode
  followUp: [
    { question: "What are the key risks and assumptions going forward?" },
    { question: "Will teams adopt and execute this smoothly?" },
    { question: "How do we track progress and impact?" },
  ],

  // TrialScenario example - Clinical trial KPIs
  trialScenario: {
    headerTitle: "Dupixent Highlights",
    subtitle: "Priority Label",
    opportunitySection: {
      label: "Opportunity",
      pill: {
        value: "6.6B",
        label: "rNPV",
      },
    },
    primaryMetric: {
      title: "Topic score 0.0",
      value: "+00.0M",
    },
    chart: {
      xKey: "month",
      data: [
        { month: "Jan", baseline: 85, forecast: 92 },
        { month: "Feb", baseline: 88, forecast: 95 },
        { month: "Mar", baseline: 90, forecast: 98 },
        { month: "Apr", baseline: 87, forecast: 94 },
        { month: "May", baseline: 91, forecast: 100 },
        { month: "Jun", baseline: 93, forecast: 103 },
      ],
      lines: [
        { key: "baseline", name: "Baseline", color: "#FF8C00" },
        { key: "forecast", name: "Forecast", color: "#00ffb3" },
      ],
    },
    kpis: [
      {
        label: "Enrollment",
        value: "+12%",
        change: "vs target",
        positive: true,
      },
      {
        label: "Site Activation",
        value: "-8 days",
        change: "delay",
        positive: false,
      },
      {
        label: "Cost Efficiency",
        value: "€2.4M",
        change: "+15%",
        positive: true,
      },
      {
        label: "Timeline Risk",
        value: "Medium",
        change: "↑ High",
        positive: false,
      },
    ],
  },
};
