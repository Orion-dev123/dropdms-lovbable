
import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Campaign, getStatusColor } from './KanbanBoard';

type CalendarViewProps = {
  campaigns: Campaign[];
};

const CalendarView = ({ campaigns }: CalendarViewProps) => {
  const [viewDate, setViewDate] = React.useState(new Date());
  
  // Get start of the week for the current view date
  const weekStart = startOfWeek(viewDate, { weekStartsOn: 0 }); // Sunday as start of week
  
  // Generate array of dates for the week
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Group campaigns by date
  const campaignsByDate: Record<string, Campaign[]> = {};
  
  // Format date to YYYY-MM-DD for comparison
  const formatDateForComparison = (date: Date) => format(date, 'yyyy-MM-dd');
  
  // Initialize empty arrays for each day of the week
  weekDates.forEach(date => {
    campaignsByDate[formatDateForComparison(date)] = [];
  });
  
  // Populate campaigns by date
  campaigns.forEach(campaign => {
    const campaignDate = campaign.date.split('T')[0]; // Extract YYYY-MM-DD part
    if (campaignDate in campaignsByDate) {
      campaignsByDate[campaignDate].push(campaign);
    }
  });
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    setViewDate(prevDate => addDays(prevDate, -7));
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    setViewDate(prevDate => addDays(prevDate, 7));
  };
  
  return (
    <div className="mb-6 overflow-hidden border border-border rounded-lg">
      {/* Calendar header */}
      <div className="bg-secondary/30 px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-medium">Campaign Calendar</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPreviousWeek}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextWeek}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-b border-border">
        {weekDates.map(date => (
          <div 
            key={format(date, 'yyyy-MM-dd')} 
            className="p-2 text-center border-r border-border last:border-r-0"
          >
            <div className="text-xs text-muted-foreground">{format(date, 'EEE')}</div>
            <div className={cn(
              "text-sm font-medium mt-1",
              format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? "text-yellow" : ""
            )}>
              {format(date, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      {/* Campaign events */}
      <div className="grid grid-cols-7 h-40 overflow-y-auto">
        {weekDates.map(date => {
          const dateKey = formatDateForComparison(date);
          const daysCampaigns = campaignsByDate[dateKey] || [];
          
          return (
            <div 
              key={dateKey} 
              className="p-2 border-r border-border last:border-r-0 h-full overflow-y-auto"
            >
              {daysCampaigns.length === 0 && (
                <div className="h-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">No campaigns</span>
                </div>
              )}
              
              {daysCampaigns.map(campaign => (
                <div 
                  key={campaign.id}
                  className="mb-2 p-1 rounded text-xs bg-card border border-border hover:border-yellow/30 cursor-pointer transition-colors"
                >
                  <div className="font-medium truncate">{campaign.name}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-muted-foreground">{campaign.platform}</span>
                    <Badge className={cn("text-xs h-5 px-1", getStatusColor(campaign.status))}>
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
