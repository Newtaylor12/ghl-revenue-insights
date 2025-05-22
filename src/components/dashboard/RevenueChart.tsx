
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getMonthData } from '@/lib/dashboard-data';

interface RevenueChartProps {
  selectedMonth: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ selectedMonth }) => {
  const data = getMonthData(selectedMonth);
  
  // Generate daily data for the chart
  const [year, month] = selectedMonth.split('-').map(n => parseInt(n));
  const daysInMonth = new Date(year, month, 0).getDate();
  
  // Generate chart data
  const chartData = [];
  
  // Create day-by-day breakdown simulating collection progress through the month
  let collected = 0;
  const dailyTarget = data.totalMonthlyRevenue / daysInMonth;
  
  for (let day = 1; day <= daysInMonth; day++) {
    // Simulate some randomness in collection pattern
    const collectionRate = Math.random() * 0.5 + 0.7; // Between 70-120% of target
    const dailyCollection = day <= new Date().getDate() ? dailyTarget * collectionRate : 0;
    collected += dailyCollection;
    
    chartData.push({
      day: day,
      collected: Math.min(collected, data.collectedRevenue),
      target: (data.totalMonthlyRevenue / daysInMonth) * day
    });
  }
  
  // Format for currency display
  const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="day" 
            tickFormatter={(day) => day % 5 === 0 ? day.toString() : ''} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={formatCurrency} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: any) => formatCurrency(value as number)}
            labelFormatter={(day) => `Day ${day}`}
          />
          <Legend />
          <Bar 
            name="Collected Revenue" 
            dataKey="collected" 
            fill="#10b981" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            name="Target Revenue" 
            dataKey="target" 
            fill="#e2e8f0" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
