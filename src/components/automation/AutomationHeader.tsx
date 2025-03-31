
import React from 'react';
import { Clock, Plus } from 'lucide-react';

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
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setShowScheduled(!showScheduled)}
          className={`px-3 py-2 rounded-md flex items-center gap-2 ${
            showScheduled ? 'bg-yellow/10 text-yellow' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          }`}
        >
          <Clock size={16} />
          <span>{showScheduled ? 'View Conversations' : 'View Scheduled'}</span>
        </button>
        <button 
          className="px-3 py-2 rounded-md bg-yellow text-primary-foreground flex items-center gap-2 hover-scale"
          onClick={onOpenScheduleDialog}
        >
          <Plus size={16} />
          <span>New Message</span>
        </button>
      </div>
    </div>
  );
};

export default AutomationHeader;
