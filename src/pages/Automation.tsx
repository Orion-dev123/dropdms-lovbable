
import React, { useState, useEffect, useRef } from 'react';
import { Inbox, Send, Clock, Filter, Search, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { conversationsData as initialConversations, scheduledMessagesData as initialScheduledMessages } from '../data/conversations';
import { formatScheduledDate, getInitials, Conversation } from '@/utils/messageUtils';
import MessageComposer from '@/components/automation/MessageComposer';
import ScheduleMessageDialog from '@/components/automation/ScheduleMessageDialog';

const Automation = () => {
  const { toast } = useToast();
  
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [scheduledMessages, setScheduledMessages] = useState(initialScheduledMessages);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1); // Default to first conversation
  const [showScheduled, setShowScheduled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get the selected conversation data
  const currentConversation = conversations.find(conv => conv.id === selectedConversation);
  
  // Scroll to bottom of messages when conversation changes or new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentConversation?.messages]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle conversation click
  const handleConversationClick = (id: number) => {
    setSelectedConversation(id);
    
    // Mark conversation as read
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === id && conv.unread) {
          return { ...conv, unread: false };
        }
        return conv;
      })
    );
  };

  // Delete scheduled message
  const handleDeleteScheduledMessage = (id: number) => {
    setScheduledMessages(scheduledMessages.filter(msg => msg.id !== id));
    toast({
      title: "Message deleted",
      description: "The scheduled message has been deleted.",
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="bg-card p-4 border-b border-border sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Inbox size={28} className="text-yellow" />
            <h1 className="text-2xl font-bold">Inbox</h1>
          </div>
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
              onClick={() => setIsScheduleDialogOpen(true)}
            >
              <Plus size={16} />
              <span>New Message</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 h-[calc(100vh-120px)]">
        {/* Left Sidebar - Conversations */}
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
          
          {/* Search input */}
          {!showScheduled && (
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
            </div>
          )}
          
          {/* Conversations or Scheduled Messages List with separate scroll */}
          <ScrollArea className="flex-1">
            {!showScheduled ? (
              filteredConversations.length > 0 ? (
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
              )
            ) : (
              <div className="p-3">
                {scheduledMessages.length > 0 ? (
                  scheduledMessages.map((message) => (
                    <div key={message.id} className="mb-4 bg-card rounded-lg p-3 border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">{message.platform}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            className="text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => toast({ title: "Not implemented", description: "Edit functionality is not implemented yet." })}
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
                  onClick={() => setIsScheduleDialogOpen(true)}
                >
                  <Plus size={16} />
                  Schedule New Message
                </button>
              </div>
            )}
          </ScrollArea>
        </div>
        
        {/* Main Content - Conversation or Scheduled Messages View */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedConversation && currentConversation && !showScheduled ? (
            <>
              {/* Conversation Header */}
              <div className="p-3 border-b border-border flex items-center justify-between bg-card">
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
                    <h3 className="font-medium">{currentConversation.name}</h3>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">@{currentConversation.username}</span>
                      <span className="mx-1 text-muted-foreground">•</span>
                      <span className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">{currentConversation.platform}</span>
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
              
              {/* Messages with separate scroll */}
              <ScrollArea className="flex-1 p-4 space-y-4">
                {currentConversation.messages.map((message) => (
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
              </ScrollArea>
              
              {/* Message Input - positioned at the bottom */}
              <div className="sticky bottom-0 w-full bg-card border-t border-border">
                <MessageComposer 
                  selectedConversation={selectedConversation}
                  conversations={conversations}
                  setConversations={setConversations}
                  onSchedule={() => setIsScheduleDialogOpen(true)}
                />
              </div>
            </>
          ) : !showScheduled ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Inbox size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md p-6">
                <Clock size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-3">Scheduled Messages View</h3>
                <p className="text-muted-foreground mb-6">You are currently viewing your scheduled messages. Select a message to see details or create a new scheduled message.</p>
                <button 
                  className="px-4 py-2 bg-yellow text-primary-foreground rounded-md inline-flex items-center gap-2 hover-scale"
                  onClick={() => setIsScheduleDialogOpen(true)}
                >
                  <Plus size={18} />
                  Schedule New Message
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Schedule Message Dialog */}
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
