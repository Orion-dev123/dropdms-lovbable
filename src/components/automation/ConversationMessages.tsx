
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Conversation, formatScheduledDate } from '@/utils/messageUtils';

interface ConversationMessagesProps {
  conversation: Conversation;
}

const ConversationMessages: React.FC<ConversationMessagesProps> = ({ conversation }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation.messages]);
  
  return (
    <ScrollArea className="flex-1 p-4 space-y-4 h-full overflow-y-auto">
      <div className="space-y-4 pb-2">
        {conversation.messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-yellow/10 text-foreground' 
                  : 'bg-secondary text-foreground'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <div className="flex items-center justify-end mt-1">
                <span className="text-xs text-muted-foreground">
                  {formatScheduledDate(message.time)}
                </span>
                {message.sender === 'user' && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    {message.status === 'delivered' ? '✓' : message.status === 'read' ? '✓✓' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ConversationMessages;
