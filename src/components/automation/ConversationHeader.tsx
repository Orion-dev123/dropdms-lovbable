
import React from 'react';
import { Conversation, getInitials } from '@/utils/messageUtils';
import { useToast } from "@/hooks/use-toast";

interface ConversationHeaderProps {
  conversation: Conversation;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation }) => {
  const { toast } = useToast();
  
  return (
    <div className="p-3 border-b border-border flex items-center justify-between bg-card">
      <div className="flex items-center">
        <div className="mr-3">
          {conversation.avatar ? (
            <img 
              src={conversation.avatar} 
              alt={conversation.name} 
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
              {getInitials(conversation.name)}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-medium">{conversation.name}</h3>
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground">@{conversation.username}</span>
            <span className="mx-1 text-muted-foreground">•</span>
            <span className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">{conversation.platform}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          onClick={() => toast({ title: "Profile", description: "View profile feature is not implemented yet." })}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;
