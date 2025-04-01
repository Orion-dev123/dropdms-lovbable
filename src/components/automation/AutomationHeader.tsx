import React from 'react';

interface AutomationHeaderProps {
  showScheduled: boolean;
  setShowScheduled: (show: boolean) => void;
  onOpenScheduleDialog: () => void;
}

const AutomationHeader: React.FC<AutomationHeaderProps> = ({ 
  showScheduled, 
  setShowScheduled, 
  onOpenScheduleDialog 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end mb-2">
      {/* Removed the buttons from here */}
    </div>
  );
};

export default AutomationHeader;
