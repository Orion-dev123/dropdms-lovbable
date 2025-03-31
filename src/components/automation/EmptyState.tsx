
import React from 'react';
import { Inbox, Clock, Plus } from 'lucide-react';

interface EmptyStateProps {
  type: 'conversations' | 'scheduled';
  onSchedule?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onSchedule }) => {
  if (type === 'conversations') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Inbox size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
          <p className="text-muted-foreground">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-md p-6">
        <Clock size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-medium mb-3">Scheduled Messages View</h3>
        <p className="text-muted-foreground mb-6">You are currently viewing your scheduled messages. Select a message to see details or create a new scheduled message.</p>
        {onSchedule && (
          <button 
            className="px-4 py-2 bg-yellow text-primary-foreground rounded-md inline-flex items-center gap-2 hover-scale"
            onClick={onSchedule}
          >
            <Plus size={18} />
            Schedule New Message
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
