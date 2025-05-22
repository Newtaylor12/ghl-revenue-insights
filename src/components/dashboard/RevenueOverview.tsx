
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getMonthData } from '@/lib/dashboard-data';

interface RevenueOverviewProps {
  selectedMonth: string;
}

const RevenueOverview: React.FC<RevenueOverviewProps> = ({ selectedMonth }) => {
  const data = getMonthData(selectedMonth);
  
  const cards = [
    {
      title: "Total Monthly Revenue",
      value: `$${data.totalMonthlyRevenue.toLocaleString()}`,
      icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
      description: "Expected revenue for the month",
      change: "+5.4%",
      changeType: "positive"
    },
    {
      title: "Collected Revenue",
      value: `$${data.collectedRevenue.toLocaleString()}`,
      icon: <ArrowUpRight className="h-5 w-5 text-emerald-600" />,
      description: `${Math.round(data.collectedRevenue/data.totalMonthlyRevenue*100)}% of monthly total`,
      change: "+2.1%",
      changeType: "positive"
    },
    {
      title: "Remaining to Collect",
      value: `$${data.remainingToCollect.toLocaleString()}`,
      icon: <ArrowDownRight className="h-5 w-5 text-amber-500" />,
      description: `${Math.round(data.remainingToCollect/data.totalMonthlyRevenue*100)}% of monthly total`,
      change: "-3.4%",
      changeType: "negative"
    },
    {
      title: "Active Customers",
      value: data.activeCustomers.toString(),
      icon: <Users className="h-5 w-5 text-blue-600" />,
      description: "Paying customers this month",
      change: "+12",
      changeType: "positive"
    }
  ];

  return (
    <>
      {cards.map((card, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {card.changeType === "positive" ? (
                <ArrowUpRight className="h-3 w-3 text-emerald-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-rose-500" />
              )}
              <span className={card.changeType === "positive" ? "text-emerald-600" : "text-rose-500"}>
                {card.change} from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default RevenueOverview;
