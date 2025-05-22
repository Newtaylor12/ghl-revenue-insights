
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueOverview from "@/components/dashboard/RevenueOverview";
import CustomerMetrics from "@/components/dashboard/CustomerMetrics";
import MonthSelector from "@/components/dashboard/MonthSelector";
import RevenueChart from "@/components/dashboard/RevenueChart";

const Index = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());

  function getCurrentMonth() {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-10 border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Financial Dashboard</h1>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Revenue Overview</h2>
            <p className="text-muted-foreground">
              Track your financial performance at a glance
            </p>
          </div>
          
          <MonthSelector 
            selectedMonth={selectedMonth} 
            onMonthChange={setSelectedMonth} 
          />
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <RevenueOverview selectedMonth={selectedMonth} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Monthly Revenue Breakdown</CardTitle>
              <CardDescription>Collection progress for {formatMonthDisplay(selectedMonth)}</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart selectedMonth={selectedMonth} />
            </CardContent>
          </Card>

          <CustomerMetrics selectedMonth={selectedMonth} />
        </div>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Revenue Details</TabsTrigger>
            <TabsTrigger value="customers">Customer Details</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 space-y-4">
            <DetailedRevenueTable selectedMonth={selectedMonth} />
          </TabsContent>
          <TabsContent value="customers" className="mt-4">
            <CustomerTable selectedMonth={selectedMonth} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Helper component to render detailed revenue table
const DetailedRevenueTable = ({ selectedMonth }: { selectedMonth: string }) => {
  // In a real app, this would fetch from an API
  return (
    <div className="rounded-md border">
      <div className="p-4">
        <h3 className="text-lg font-medium">Revenue Details for {formatMonthDisplay(selectedMonth)}</h3>
        <p className="text-sm text-muted-foreground">Showing all revenue entries for the selected month</p>
      </div>
      <div className="px-4 pb-4">
        <p>Detailed revenue information would appear here</p>
      </div>
    </div>
  );
};

// Helper component to render customer table
const CustomerTable = ({ selectedMonth }: { selectedMonth: string }) => {
  // In a real app, this would fetch from an API
  return (
    <div className="rounded-md border">
      <div className="p-4">
        <h3 className="text-lg font-medium">Active Customers for {formatMonthDisplay(selectedMonth)}</h3>
        <p className="text-sm text-muted-foreground">List of all active paying customers</p>
      </div>
      <div className="px-4 pb-4">
        <p>Customer list would appear here</p>
      </div>
    </div>
  );
};

// Helper function to format month for display
function formatMonthDisplay(monthStr: string) {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

export default Index;
