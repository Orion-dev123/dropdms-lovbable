import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { conversationsData as initialConversations } from '../data/conversations';
import { Conversation } from '@/utils/messageUtils';
import { Search, Send, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Automation = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [filters, setFilters] = useState({
    replied: false,
    notReplied: false,
  });
  
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

  const handleSendMessage = () => {
    if (selectedConversation && messageText.trim()) {
      // Add message to the conversation
      const now = new Date().toISOString();
      const newMessage = {
        id: Date.now(),
        sender: 'user' as const,
        content: messageText,
        time: now,
        status: 'sent' as const
      };

      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.id === selectedConversation) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: messageText,
              time: 'now'
            };
          }
          return conv;
        })
      );

      setMessageText('');
      toast({
        title: "Message sent",
        description: "Your message has been sent.",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const hasReplies = (conversation: Conversation) => {
    return conversation.messages.some(msg => msg.sender !== 'user');
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesReplyFilter = true;
    if (filters.replied && !hasReplies(conv)) matchesReplyFilter = false;
    if (filters.notReplied && hasReplies(conv)) matchesReplyFilter = false;
    
    return matchesSearch && matchesReplyFilter;
  });

  const handleFilterChange = (key: 'replied' | 'notReplied') => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="h-full flex">
      <div className="w-80 border-r border-border flex flex-col h-full bg-card">
        <div className="p-4 border-b border-border">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter size={18} className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card">
                <DropdownMenuLabel>Filter Conversations</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem 
                  checked={filters.replied}
                  onCheckedChange={() => handleFilterChange('replied')}
                >
                  Has replied
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={filters.notReplied}
                  onCheckedChange={() => handleFilterChange('notReplied')}
                >
                  Has not replied
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <ScrollArea className="flex-1 overflow-y-auto">
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
                      {hasReplies(conversation) && (
                        <span className="ml-2 text-xs text-muted-foreground">has replies</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>No conversations match your filters</p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ replied: false, notReplied: false });
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </ScrollArea>
      </div>
      
      <div className="flex-1 flex flex-col h-full">
        {currentConversation ? (
          <>
            <div className="p-4 border-b border-border flex justify-between items-center bg-card">
              <div className="flex items-center">
                <div className="mr-3">
                  {currentConversation.avatar ? (
                    <img 
                      src={currentConversation.avatar} 
                      alt={currentConversation.name} 
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                      {getInitials(currentConversation.name)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-medium">{currentConversation.name}</h2>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span>@{currentConversation.username}</span>
                    <span className="bg-secondary/50 px-1.5 py-0.5 rounded">{currentConversation.platform}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline">View</Button>
            </div>
            
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6 pb-4">
                {currentConversation.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
                  >
                    <div 
                      className={`rounded-lg p-4 ${
                        message.sender === 'user' 
                          ? 'bg-yellow/10 text-foreground' 
                          : 'bg-secondary/50 text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-muted-foreground">
                          {formatMessageTime(message.time)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-border mt-auto">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Type Message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  className="ml-2 rounded-full p-2 h-10 w-10 bg-yellow hover:bg-yellow/90" 
                  onClick={handleSendMessage}
                >
                  <Send size={18} className="text-primary-foreground" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-lg font-medium mb-2">No conversation selected</h2>
              <p className="text-muted-foreground">Select a conversation to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Automation;
