
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { conversationsData as initialConversations, scheduledMessagesData as initialScheduledMessages } from '../data/conversations';
import { Conversation } from '@/utils/messageUtils';

// Import the newly created components
import ConversationList from '@/components/automation/ConversationList';
import ScheduledMessagesList from '@/components/automation/ScheduledMessagesList';
import ConversationHeader from '@/components/automation/ConversationHeader';
import ConversationMessages from '@/components/automation/ConversationMessages';
import EmptyState from '@/components/automation/EmptyState';
import MessageComposer from '@/components/automation/MessageComposer';
import ScheduleMessageDialog from '@/components/automation/ScheduleMessageDialog';
import AutomationHeader from '@/components/automation/AutomationHeader';

const Automation = () => {
  const { toast } = useToast();
  
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [scheduledMessages, setScheduledMessages] = useState(initialScheduledMessages);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1); // Default to first conversation
  const [showScheduled, setShowScheduled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  
  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleConversationClick = (id: number) => {
    setSelectedConversation(id);
    
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === id && conv.unread) {
          return { ...conv, unread: false };
        }
        return conv;
      })
    );
  };

  const handleDeleteScheduledMessage = (id: number) => {
    setScheduledMessages(scheduledMessages.filter(msg => msg.id !== id));
    toast({
      title: "Message deleted",
      description: "The scheduled message has been deleted.",
    });
  };
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <AutomationHeader 
        showScheduled={showScheduled} 
        setShowScheduled={setShowScheduled} 
        onOpenScheduleDialog={() => setIsScheduleDialogOpen(true)} 
      />

      <div className="flex flex-1 h-full overflow-hidden">
        {!showScheduled ? (
          <ConversationList 
            showScheduled={showScheduled}
            conversations={conversations}
            selectedConversation={selectedConversation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleConversationClick={handleConversationClick}
            setShowScheduled={setShowScheduled}
            onOpenScheduleDialog={() => setIsScheduleDialogOpen(true)}
          />
        ) : (
          <div className="w-80 border-r border-border flex flex-col bg-card">
            <div className="p-3 border-b border-border">
              <h2 className="font-medium">Scheduled Messages</h2>
            </div>
            <ScheduledMessagesList 
              scheduledMessages={scheduledMessages}
              handleDeleteScheduledMessage={handleDeleteScheduledMessage}
              onOpenScheduleDialog={() => setIsScheduleDialogOpen(true)}
            />
          </div>
        )}
        
        <div className="flex-1 flex flex-col bg-background overflow-hidden">
          {selectedConversation && currentConversation && !showScheduled ? (
            <>
              <ConversationHeader conversation={currentConversation} />
              <ConversationMessages conversation={currentConversation} />
              <div className="flex-shrink-0">
                <MessageComposer 
                  selectedConversation={selectedConversation}
                  conversations={conversations}
                  setConversations={setConversations}
                  onSchedule={() => setIsScheduleDialogOpen(true)}
                />
              </div>
            </>
          ) : (
            <EmptyState 
              type={showScheduled ? 'scheduled' : 'conversations'} 
              onSchedule={showScheduled ? () => setIsScheduleDialogOpen(true) : undefined}
            />
          )}
        </div>

        <ScheduleMessageDialog 
          isOpen={isScheduleDialogOpen}
          onClose={() => setIsScheduleDialogOpen(false)}
          conversations={conversations}
          setScheduledMessages={setScheduledMessages}
        />
      </div>
    </div>
  );
};

export default Automation;
