
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatScheduledDate, scheduleMessage } from '@/utils/messageUtils';

interface ScheduleMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: any[];
  setScheduledMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const ScheduleMessageDialog: React.FC<ScheduleMessageDialogProps> = ({ 
  isOpen, 
  onClose,
  conversations,
  setScheduledMessages
}) => {
  const [messageText, setMessageText] = useState('');
  const [scheduledDate, setScheduledDate] = useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [scheduledTime, setScheduledTime] = useState('12:00');
  const [platform, setPlatform] = useState('Instagram');
  const [selectedRecipients, setSelectedRecipients] = useState<number[]>([]);

  const handleToggleRecipient = (id: number) => {
    if (selectedRecipients.includes(id)) {
      setSelectedRecipients(selectedRecipients.filter(recipientId => recipientId !== id));
    } else {
      setSelectedRecipients([...selectedRecipients, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRecipients.length === conversations.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(conversations.map(conv => conv.id));
    }
  };

  const handleSchedule = () => {
    if (messageText.trim() && selectedRecipients.length > 0) {
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      
      scheduleMessage(
        messageText,
        scheduledDateTime,
        selectedRecipients,
        platform,
        setScheduledMessages
      );
      
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setMessageText('');
    setScheduledDate(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setScheduledTime('12:00');
    setPlatform('Instagram');
    setSelectedRecipients([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Message</DialogTitle>
          <DialogDescription>
            Create a message to be sent at a later time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-yellow/50 min-h-[100px]"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full pl-10 p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full pl-10 p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50"
            >
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Recipients ({selectedRecipients.length})</label>
              <button 
                onClick={handleSelectAll}
                className="text-xs text-yellow hover:underline"
              >
                {selectedRecipients.length === conversations.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="max-h-[200px] overflow-y-auto border border-border rounded-md p-2">
              {conversations.map((conv) => (
                <div key={conv.id} className="flex items-center space-x-2 py-2 border-b border-border last:border-0">
                  <Checkbox 
                    id={`recipient-${conv.id}`}
                    checked={selectedRecipients.includes(conv.id)}
                    onCheckedChange={() => handleToggleRecipient(conv.id)}
                  />
                  <label 
                    htmlFor={`recipient-${conv.id}`}
                    className="text-sm flex-1 cursor-pointer"
                  >
                    {conv.name} <span className="text-muted-foreground">({conv.platform})</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {selectedRecipients.length > 0 && (
            <div className="text-sm text-muted-foreground">
              This message will be scheduled to send to {selectedRecipients.length} recipients on {formatScheduledDate(`${scheduledDate}T${scheduledTime}`)}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSchedule}
            disabled={!messageText.trim() || selectedRecipients.length === 0}
          >
            Schedule Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMessageDialog;
