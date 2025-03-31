
import React from 'react';
import { Clock, Plus } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatScheduledDate } from '@/utils/messageUtils';

interface ScheduledMessagesListProps {
  scheduledMessages: any[];
  handleDeleteScheduledMessage: (id: number) => void;
  onOpenScheduleDialog: () => void;
}

const ScheduledMessagesList: React.FC<ScheduledMessagesListProps> = ({
  scheduledMessages,
  handleDeleteScheduledMessage,
  onOpenScheduleDialog
}) => {
  return (
    <div className="p-3">
      {scheduledMessages.length > 0 ? (
        scheduledMessages.map((message) => (
          <div key={message.id} className="mb-4 bg-card rounded-lg p-3 border border-border">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">{message.platform}</span>
              <div className="flex items-center gap-2">
                <button 
                  className="text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => {}}
                >
                  Edit
                </button>
                <button 
                  className="text-xs text-muted-foreground hover:text-red-500"
                  onClick={() => handleDeleteScheduledMessage(message.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            
            <p className="text-sm mb-2 line-clamp-2">{message.content}</p>
            
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{message.recipients} recipients</span>
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                <span>{formatScheduledDate(message.scheduledFor)}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <Clock size={36} className="mx-auto mb-2 opacity-50" />
          <p>No scheduled messages</p>
        </div>
      )}
      
      <button 
        className="w-full py-2 mt-2 border border-border rounded-md text-sm flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors"
        onClick={onOpenScheduleDialog}
      >
        <Plus size={16} />
        Schedule New Message
      </button>
    </div>
  );
};

export default ScheduledMessagesList;
