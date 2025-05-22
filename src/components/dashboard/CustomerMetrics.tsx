
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getMonthData } from '@/lib/dashboard-data';

interface CustomerMetricsProps {
  selectedMonth: string;
}

const CustomerMetrics: React.FC<CustomerMetricsProps> = ({ selectedMonth }) => {
  const data = getMonthData(selectedMonth);
  
  // Calculate average revenue per customer
  const avgRevenue = data.totalMonthlyRevenue / data.activeCustomers;
  
  // Customer segments (these would come from real data in production)
  const segments = [
    { name: "Enterprise", percentage: 35, color: "bg-blue-500" },
    { name: "Mid-Market", percentage: 40, color: "bg-indigo-500" },
    { name: "Small Business", percentage: 25, color: "bg-purple-500" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Metrics</CardTitle>
        <CardDescription>Analysis of your customer base</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Active Customers</div>
            <div className="text-sm font-medium">{data.activeCustomers}</div>
          </div>
          <Progress value={85} className="h-2" />
          <div className="mt-1 text-xs text-muted-foreground">
            85% retention rate from previous month
          </div>
        </div>
        
        <div>
          <div className="mb-2 text-sm font-medium">
            Avg. Revenue Per Customer
          </div>
          <div className="text-2xl font-bold">${avgRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            MRR ÷ Active Customers
          </div>
        </div>
        
        <div>
          <div className="mb-2 text-sm font-medium">Customer Segments</div>
          <div className="space-y-1.5">
            {segments.map((segment) => (
              <div key={segment.name} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${segment.color}`} />
                <div className="text-sm">{segment.name}</div>
                <div className="ml-auto text-sm text-muted-foreground">{segment.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerMetrics;
