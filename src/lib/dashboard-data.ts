// This file contains mock data service functions that would normally fetch data from APIs
// In a real application, these would connect to your backend or GoHighLevel API

// Mock data for each month
const mockData = {
  "2025-01": {
    totalMonthlyRevenue: 42000,
    collectedRevenue: 38000,
    remainingToCollect: 4000,
    activeCustomers: 78,
  },
  "2025-02": {
    totalMonthlyRevenue: 45000,
    collectedRevenue: 36000,
    remainingToCollect: 9000,
    activeCustomers: 82,
  },
  "2025-03": {
    totalMonthlyRevenue: 48000,
    collectedRevenue: 24000,
    remainingToCollect: 24000,
    activeCustomers: 87,
  },
  "2025-04": {
    totalMonthlyRevenue: 47000,
    collectedRevenue: 23500,
    remainingToCollect: 23500,
    activeCustomers: 85,
  },
  "2025-05": {
    totalMonthlyRevenue: 50000,
    collectedRevenue: 40000,
    remainingToCollect: 10000,
    activeCustomers: 90,
  }
};

// Get data for a specific month
export function getMonthData(monthKey: string) {
  // If we have data for the requested month, return it
  if (mockData[monthKey as keyof typeof mockData]) {
    return mockData[monthKey as keyof typeof mockData];
  }
  
  // Otherwise, generate some placeholder data
  const baseRevenue = 40000 + Math.random() * 15000;
  const collectedPercentage = Math.random() * 0.5 + 0.4; // 40-90% collected
  const collectedRevenue = baseRevenue * collectedPercentage;
  
  return {
    totalMonthlyRevenue: Math.round(baseRevenue),
    collectedRevenue: Math.round(collectedRevenue),
    remainingToCollect: Math.round(baseRevenue - collectedRevenue),
    activeCustomers: Math.round(75 + Math.random() * 25),
  };
}

// In a real application, you would have functions like:
// export async function fetchRevenueData(monthKey: string) {
//   const response = await fetch(`/api/revenue/${monthKey}`);
//   return response.json();
// }

// export async function fetchCustomerData(monthKey: string) {
//   const response = await fetch(`/api/customers/${monthKey}`);
//   return response.json();
// }
