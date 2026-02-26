// Inventory Optimizer Agent Data

export const data = {
  // Welcome screen
  welcome: {
    title: "Inventory Manager",
    subtitle: "Hello, I'm the Aily Fashion Inventory Agent.",
    description:
      "I'll show you E2E inventory recommendations to reach optimal inventory, avoid markdowns, and increase full-price sales for AMER handbags.",
    cta: "Let's get started!",
  },

  // Trigger/Metrics screen
  trigger: {
    title: "AMER handbags",
    subtitle: "Opportunity to reduce excess inventory of AMER handbags by",
    primaryMetric: {
      value: "€30M",
      label: "and increase inventory where stock levels are too low by",
    },
    secondaryMetric: {
      value: "€5M",
      label: "",
    },
    hasInsights: false,
  },

  // Scenario Modal (shown when "Open Scenario" is tapped)
  scenarioModal: {
    headerTitle: "AMER handbags",
    subtitle: "Fashion Inventory Agent",
    opportunitySection: {
      label: "Balanced Scenario",
    },
    primaryMetric: {
      title: "3 month inventory optimization potential (vs baseline forecast)",
      value: "€35M",
    },
    chart: {
      xKey: "month",
      data: [
        { month: "Nov 25", overstock: 5, understock: 0 },
        { month: "Dec 25", overstock: 20, understock: 5 },
        { month: "Jan 26", overstock: 40, understock: 15 },
      ],
      lines: [
        { key: "overstock", name: "Overstock Deviation", color: "#C41B54" },
        { key: "understock", name: "Understock Deviation", color: "#E5C766" },
      ],
    },
    kpis: [
      {
        label: "Coverage (weeks)",
        value: "10",
        change: "-2",
        positive: true,
        color: "#FF3469",
      },
      {
        label: "Weekly STR",
        value: "50%",
        change: "+2%",
        positive: true,
      },
      {
        label: "OOS Value",
        value: "€500K",
        change: "+€100K",
        positive: true,
        color: "#FF3469",
      },
      {
        label: "Markdown Value",
        value: "€600K",
        change: "-150K",
        positive: true,
      },
    ],
    cta: "LET'S DO IT!",
  },

  // Progress Tracking Modal (second page of scenario modal)
  progressTracking: {
    title: "Replenish SKUs with value of",
    subtitle: "Based on 3 month forecast vs target",
    primaryMetric: {
      value: "€5M",
      label: "Replenish SKUs at store",
    },
    legend: [
      { label: "AI Inventory Forecast", color: "#FF3469" },
      { label: "Target", color: "#FFFFFF" },
    ],
    items: [
      {
        title: "SDJ duffle ROUGE CABERNET - Miami Aventura Mall | from Houston Galleria",
        unitsNeeded: "17 units needed",
        changeValue: "3 units",
        changePositive: false,
        forecastPercent: 0,
        targetPercent: 85,
        forecastLabel: "AI Forecast 0 units · TGT 17 units",
      },
      {
        title: "SDJ NANO ORANGE - Toronto Yorkdale | from Canada warehouse",
        unitsNeeded: "10 units needed",
        changeValue: "0 units",
        changePositive: false,
        forecastPercent: 9,
        targetPercent: 60,
        forecastLabel: "AI Forecast 1 unit · TGT 11 units",
      },
      {
        title: "CASSANDRA Mini BLACK - Cancun Fashion Harbour | from Mexico warehouse",
        unitsNeeded: "7 units needed",
        changeValue: "4 units",
        changePositive: true,
        forecastPercent: 12,
        targetPercent: 50,
        forecastLabel: "AI Forecast 1 unit · TGT 8 units",
      },
    ],
  },

  // Recommendations Insights Modal (third page of scenario modal)
  recommendationsInsights: {
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

  // Adjust Minimum Quantity Modal (fourth page of scenario modal)
  adjustMinimumQuantity: {
    title: "Adjust minimum quantity rules",
    mainHeading: "Reduce minimum inventory thresholds (MDQ)",
    sections: [
      {
        category: "Current min. 4",
        title: "SAC DE JOUR BABY ROUGE CABERNET - New York Saks",
        value: "Recommended min: 1",
        positive: true
      },
      {
        category: "Current min. 3",
        title: "SAC DE JOUR BABY ROUGE CABERNET - Sao Paulo Iguatemi",
        value: "Recommended min: 1",
        positive: true
      },
      {
        category: "Current min. 5",
        title: "SAC DE JOUR NANO ORANGE - Toronto Yorkdale Shopping Centre",
        value: "Recommended min: 0",
        positive: true
      }
    ]
  },

  // Next Actions Modal (fifth page of scenario modal)
  nextActions: {
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

  // Decision Levers screen with 3 scenarios
  decisionLevers: {
    headerTitle: "AMER handbags",
    subtitle: "Fashion Inventory Agent",
    scenarios: [
      {
        id: "cost-effective",
        name: "Cost effective scenario",
        coverage: "8",
        str: "52.5%",
        metrics: {
          oosValue: {
            value: "+225K",
            label: "OOS Value",
            positive: true,
          },
          markdownValue: {
            value: "-270K",
            label: "Markdown Value",
            positive: false,
          },
        },
      },
      {
        id: "recommended",
        name: "aily recommends",
        coverage: "10",
        str: "50%",
        metrics: {
          oosValue: {
            value: "+100K",
            label: "OOS Value",
            positive: true,
          },
          markdownValue: {
            value: "-150K",
            label: "Markdown Value",
            positive: false,
          },
        },
      },
      {
        id: "conservative",
        name: "Conservative scenario",
        coverage: "12",
        str: "48%",
        metrics: {
          oosValue: {
            value: "-100K",
            label: "OOS Value",
            positive: false,
          },
          markdownValue: {
            value: "+250K",
            label: "Markdown Value",
            positive: true,
          },
        },
      },
    ],
  },

  // Inventory Drivers screen
  inventoryDrivers: {
    title: "Inventory Agent",
    subtitle: "Central Distribution Hub",
    aiTitle: "Inventory Optimization Levers",
    aiSubtitle: "",
    items: [
      {
        label: "Stockout Prevention",
        description: "47 SKUs at risk of stockout within 7 days",
        value: "Urgent action",
      },
      {
        label: "Overstock Reduction",
        description: "€1.2M in slow-moving inventory exceeding 90 days",
        value: "Liquidation plan",
      },
      {
        label: "Dead Stock Clearance",
        description: "€280K in obsolete inventory requiring write-off decision",
        value: "Review items",
      },
      {
        label: "Reorder Point Optimization",
        description: "23% of SKUs have suboptimal safety stock levels",
        value: "Adjust levels",
      },
    ],
  },

  // Driver Insights modals
  driverInsights: {
    stockouts: {
      title: "Stockout Prevention",
      subtitle: "Central Distribution Hub",
      sections: [
        {
          title: "Critical stockout risk identified",
          description:
            "47 SKUs are projected to stock out within 7 days based on current demand velocity and lead times.",
        },
        {
          title: "Impact assessment",
          bullets: [
            { text: "Revenue at risk: ", highlight: "€156K in next 14 days" },
            { text: "Top affected category: ", highlight: "Electronics (28 SKUs)" },
            { text: "Average days until stockout: ", highlight: "4.2 days" },
          ],
        },
        {
          title: "Recommended actions",
          bullets: [
            { text: "Expedite orders for 12 critical A-class SKUs" },
            { text: "Activate backup supplier for electronics components" },
            { text: "Reallocate stock from low-demand locations" },
          ],
        },
        {
          title: "Warehouse context",
          description:
            "This hub services 340 downstream locations. Stockouts here cascade to regional availability.",
        },
      ],
      feedbackQuestion: "Will you address this stockout risk?",
    },
    overstock: {
      title: "Overstock Reduction",
      subtitle: "Central Distribution Hub",
      sections: [
        {
          title: "Excess inventory identified",
          description:
            "€1.2M in inventory has been sitting for over 90 days with minimal movement.",
        },
        {
          title: "Overstock breakdown",
          bullets: [
            { text: "Seasonal items past peak: ", highlight: "€520K (43%)" },
            { text: "Superseded products: ", highlight: "€380K (32%)" },
            { text: "Demand forecast misses: ", highlight: "€300K (25%)" },
          ],
        },
        {
          title: "Liquidation strategies",
          bullets: [
            { text: "Bundle slow-movers with fast-moving products" },
            { text: "Offer volume discounts to B2B customers" },
            { text: "Transfer to outlet channels at 40% markdown" },
          ],
        },
        {
          title: "Cost context",
          description:
            "Current carrying cost is €8.5K/month. Each week of delay adds €2.1K in holding costs.",
        },
      ],
      feedbackQuestion: "Will you implement the liquidation plan?",
    },
    deadstock: {
      title: "Dead Stock Clearance",
      subtitle: "Central Distribution Hub",
      sections: [
        {
          title: "Obsolete inventory requiring decision",
          description:
            "€280K in products have had zero sales in 180+ days and are unlikely to recover.",
        },
        {
          title: "Dead stock analysis",
          bullets: [
            { text: "Discontinued products: ", highlight: "€145K (52%)" },
            { text: "Expired/damaged goods: ", highlight: "€78K (28%)" },
            { text: "Technology obsolescence: ", highlight: "€57K (20%)" },
          ],
        },
        {
          title: "Disposal options",
          bullets: [
            { text: "Donation for tax credit (estimated €42K benefit)" },
            { text: "Recycling program (recovers €18K in materials)" },
            { text: "Write-off and clear warehouse space (saves €3.2K/month)" },
          ],
        },
        {
          title: "Warehouse context",
          description:
            "Dead stock occupies 1,200 sq ft of premium warehouse space that could store high-velocity items.",
        },
      ],
      feedbackQuestion: "Will you proceed with dead stock clearance?",
    },
    reorder: {
      title: "Reorder Point Optimization",
      subtitle: "Central Distribution Hub",
      sections: [
        {
          title: "Safety stock levels need adjustment",
          description:
            "23% of SKUs have either excess or insufficient safety stock based on updated demand patterns.",
        },
        {
          title: "Current state",
          bullets: [
            { text: "Over-buffered SKUs: ", highlight: "847 items (€340K tied up)" },
            { text: "Under-buffered SKUs: ", highlight: "312 items (stockout risk)" },
            { text: "Last optimization: ", highlight: "8 months ago" },
          ],
        },
        {
          title: "Optimization actions",
          bullets: [
            { text: "Apply dynamic safety stock algorithm" },
            { text: "Reduce buffer for stable-demand items by 15%" },
            { text: "Increase buffer for volatile categories by 20%" },
          ],
        },
        {
          title: "Expected outcome",
          description:
            "Rebalancing will free €120K in working capital while improving service level from 94% to 97%.",
        },
      ],
      feedbackQuestion: "Will you optimize reorder points?",
    },
  },

  // Risk Assessment screen
  riskAssessment: {
    title: "Inventory Agent",
    subtitle: "Central Distribution Hub",
    aiTitle: "Risk Assessment",
    description:
      "Warehouse operations are stable with opportunities for inventory optimization and cost reduction.",
    items: [
      {
        label: "Strong supplier relationships",
        description:
          "94% on-time delivery rate from top 10 suppliers. Backup suppliers available for critical items.",
      },
      {
        label: "Efficient warehouse operations",
        description:
          "Pick accuracy at 99.7% and average pick time improved 12% this quarter through layout optimization.",
      },
    ],
  },
};
