
import React from 'react';
import { Inbox, Filter, Search, Clock, Plus } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Conversation, getInitials } from '@/utils/messageUtils';
import { Button } from "@/components/ui/button";

interface ConversationListProps {
  showScheduled: boolean;
  conversations: Conversation[];
  selectedConversation: number | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleConversationClick: (id: number) => void;
  setShowScheduled: (show: boolean) => void;
  onOpenScheduleDialog: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  showScheduled,
  conversations,
  selectedConversation,
  searchQuery,
  setSearchQuery,
  handleConversationClick,
  setShowScheduled,
  onOpenScheduleDialog
}) => {
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-border flex flex-col bg-card">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h2 className="font-medium">
          {showScheduled ? 'Scheduled Messages' : 'Conversations'}
        </h2>
        {!showScheduled && (
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50">
            <Filter size={18} />
          </button>
        )}
      </div>
      
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50"
          />
        </div>
        
        {/* Added buttons here */}
        <div className="flex items-center justify-between mt-3 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={`flex-1 ${
              showScheduled ? 'bg-yellow/10 text-yellow' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setShowScheduled(!showScheduled)}
          >
            <Clock size={16} className="mr-2" />
            {showScheduled ? 'View Conversations' : 'View Scheduled'}
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="flex-1 bg-yellow text-primary-foreground hover:bg-yellow/90"
            onClick={onOpenScheduleDialog}
          >
            <Plus size={16} className="mr-2" />
            New Message
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <div 
              key={conversation.id}
              onClick={() => handleConversationClick(conversation.id)}
              className={`p-4 border-b border-border cursor-pointer hover:bg-secondary/30 transition-colors ${
                selectedConversation === conversation.id ? 'bg-secondary/50' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0">
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
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">{conversation.time}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">{conversation.platform}</span>
                    {conversation.unread && (
                      <span className="ml-2 w-2 h-2 bg-yellow rounded-full"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <Inbox size={36} className="mx-auto mb-2 opacity-50" />
            <p>No conversations found</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ConversationList;
