
import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onMonthChange }) => {
  const [year, month] = selectedMonth.split('-').map(n => parseInt(n));
  const date = new Date(year, month - 1, 1);
  
  const goToPreviousMonth = () => {
    const prevMonth = new Date(year, month - 2, 1);
    onMonthChange(`${prevMonth.getFullYear()}-${(prevMonth.getMonth() + 1).toString().padStart(2, '0')}`);
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(year, month, 1);
    onMonthChange(`${nextMonth.getFullYear()}-${(nextMonth.getMonth() + 1).toString().padStart(2, '0')}`);
  };
  
  return (
    <div className="inline-flex items-center rounded-md border bg-white p-2 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPreviousMonth}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous month</span>
      </Button>
      
      <div className="px-4 text-sm font-medium">
        {format(date, 'MMMM yyyy')}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNextMonth}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next month</span>
      </Button>
    </div>
  );
};

export default MonthSelector;
