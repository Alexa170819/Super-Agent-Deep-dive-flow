/**
 * Mock Normalized Data Source
 * Simulates normalized data ingestion from various domains (Finance, M&S, R&D, Spend)
 * This structure matches what real data ingestion would provide
 */

export const normalizedData = {
  finance: [
    {
      id: 'fin-001',
      domain: 'finance',
      timestamp: '2024-01-15T10:00:00Z',
      type: 'budget_variance',
      metrics: {
        budget: 1800000,
        actual: 2100000,
        variance: 300000,
        variancePercent: 18,
        period: 'Q3',
        category: 'marketing'
      },
      metadata: {
        department: 'Marketing',
        region: 'Global',
        owner: 'Marketing Director'
      }
    },
    {
      id: 'fin-004',
      domain: 'finance',
      timestamp: '2024-01-16T09:00:00Z',
      type: 'sales_opportunity',
      metrics: {
        ytdSales: 36000000,
        priorYearSales: 29600000,
        variance: 6400000,
        variancePercent: 21.6,
        categoryContribution: 7500000,
        category: 'Other Generics',
        growth: 6400000,
        growthPercent: 21.6,
        contributionGenerics: 7500000
      },
      metadata: {
        region: 'Switzerland',
        country: 'Switzerland',
        category: 'Other Generics',
        driver: 'Other Generics',
        brand: 'Kering',
        opportunity: 'high',
        urgency: 'high',
        timeToAct: '7 days',
        reason: 'Market opportunity window closing'
      }
    },
    {
      id: 'fin-002',
      domain: 'finance',
      timestamp: '2024-01-14T09:30:00Z',
      type: 'cash_flow',
      metrics: {
        dso: 45,
        dpo: 30,
        dio: 60,
        fcf: -2500000,
        targetFcf: 5000000,
        gap: 7500000
      },
      metadata: {
        region: 'North America',
        urgency: 'high'
      }
    },
    {
      id: 'fin-003',
      domain: 'finance',
      timestamp: '2024-01-13T14:20:00Z',
      type: 'working_capital',
      metrics: {
        currentRatio: 1.2,
        targetRatio: 1.5,
        workingCapital: 5000000,
        targetWorkingCapital: 8000000,
        gap: 3000000
      },
      metadata: {
        region: 'Global',
        priority: 'medium'
      }
    }
  ],
  marketing: [
    {
      id: 'mkt-001',
      domain: 'marketing',
      timestamp: '2024-01-15T11:00:00Z',
      type: 'lead_generation',
      metrics: {
        leads: 1200,
        target: 2000,
        conversionRate: 2.5,
        targetConversionRate: 4.0,
        gap: 800
      },
      metadata: {
        channel: 'Digital',
        campaign: 'Q3 Product Launch',
        region: 'Global'
      }
    },
    {
      id: 'mkt-002',
      domain: 'marketing',
      timestamp: '2024-01-14T15:00:00Z',
      type: 'spend_efficiency',
      metrics: {
        spend: 2100000,
        revenue: 8500000,
        roi: 4.05,
        targetRoi: 5.0,
        efficiency: 0.81
      },
      metadata: {
        period: 'Q3',
        category: 'Paid Media'
      }
    }
  ],
  rnd: [
    {
      id: 'rnd-001',
      domain: 'rnd',
      timestamp: '2024-01-12T08:00:00Z',
      type: 'project_delay',
      metrics: {
        projectId: 'PROJ-2024-001',
        plannedCompletion: '2024-06-30',
        projectedCompletion: '2024-08-15',
        delayDays: 46,
        budget: 5000000,
        spent: 3200000,
        remaining: 1800000
      },
      metadata: {
        project: 'New Product Development',
        impact: 'high',
        department: 'R&D'
      }
    }
  ],
  spend: [
    {
      id: 'spend-001',
      domain: 'spend',
      timestamp: '2024-01-15T09:00:00Z',
      type: 'vendor_anomaly',
      metrics: {
        vendorId: 'VEND-12345',
        spend: 850000,
        avgSpend: 450000,
        variance: 400000,
        variancePercent: 89,
        invoices: 45,
        avgInvoices: 25
      },
      metadata: {
        vendor: 'Tech Solutions Inc',
        category: 'IT Services',
        risk: 'high'
      }
    },
    {
      id: 'spend-002',
      domain: 'spend',
      timestamp: '2024-01-14T13:00:00Z',
      type: 'category_overspend',
      metrics: {
        category: 'Travel & Entertainment',
        budget: 500000,
        actual: 720000,
        variance: 220000,
        variancePercent: 44
      },
      metadata: {
        period: 'Q3',
        region: 'Global',
        urgency: 'medium'
      }
    }
  ]
};

/**
 * Get all normalized data
 */
export const getAllNormalizedData = () => {
  return [
    ...normalizedData.finance,
    ...normalizedData.marketing,
    ...normalizedData.rnd,
    ...normalizedData.spend
  ];
};

/**
 * Get data by domain
 */
export const getDataByDomain = (domain) => {
  return normalizedData[domain] || [];
};

/**
 * Get data by type
 */
export const getDataByType = (type) => {
  const allData = getAllNormalizedData();
  return allData.filter(item => item.type === type);
};

/**
 * Get recent data (last N days)
 */
export const getRecentData = (days = 7) => {
  const allData = getAllNormalizedData();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return allData.filter(item => {
    const itemDate = new Date(item.timestamp);
    return itemDate >= cutoffDate;
  });
};
