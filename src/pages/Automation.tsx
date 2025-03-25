
import React, { useState } from 'react';
import { MessageSquare, Send, Clock, FileText, Image, Link2, Smile, Filter } from 'lucide-react';

// Sample conversation data
const conversationsData = [
  {
    id: 1,
    username: 'johndoe',
    name: 'John Doe',
    platform: 'Instagram',
    lastMessage: 'Thanks for reaching out! I\'d be interested in learning more.',
    time: '2 hours ago',
    unread: true,
    avatar: null,
  },
  {
    id: 2,
    username: 'janesmith',
    name: 'Jane Smith',
    platform: 'Twitter',
    lastMessage: 'When would be a good time to schedule a call?',
    time: '3 hours ago',
    unread: false,
    avatar: null,
  },
  {
    id: 3,
    username: 'robertjohnson',
    name: 'Robert Johnson',
    platform: 'LinkedIn',
    lastMessage: 'Hello, I received your message about the collaboration.',
    time: '1 day ago',
    unread: false,
    avatar: null,
  },
  {
    id: 4,
    username: 'sarahwilson',
    name: 'Sarah Wilson',
    platform: 'Instagram',
    lastMessage: 'I\'m not interested at the moment, but thank you.',
    time: '2 days ago',
    unread: false,
    avatar: null,
  },
];

// Sample messages for a conversation
const messageData = [
  {
    id: 1,
    sender: 'user',
    content: 'Hi John, I noticed your work and wanted to connect! 👋',
    time: '2023-09-01T10:30:00',
    status: 'delivered',
  },
  {
    id: 2,
    sender: 'contact',
    content: 'Hey there! Thanks for reaching out. What can I help you with?',
    time: '2023-09-01T10:35:00',
    status: 'read',
  },
  {
    id: 3,
    sender: 'user',
    content: 'I wanted to discuss a potential collaboration for our upcoming project. We\'re looking for someone with your expertise.',
    time: '2023-09-01T10:40:00',
    status: 'delivered',
  },
  {
    id: 4,
    sender: 'contact',
    content: 'That sounds interesting! I\'d be happy to learn more about it.',
    time: '2023-09-01T10:45:00',
    status: 'read',
  },
  {
    id: 5,
    sender: 'contact',
    content: 'Could you share some details about the project?',
    time: '2023-09-01T10:46:00',
    status: 'read',
  },
];

// Schedule message data
const scheduledMessages = [
  {
    id: 1,
    content: 'Hey {first_name}, just following up on our conversation!',
    recipients: 15,
    scheduledFor: '2023-09-10T14:30:00',
    platform: 'Instagram',
  },
  {
    id: 2,
    content: 'Hi {first_name}, I wanted to invite you to our exclusive webinar.',
    recipients: 50,
    scheduledFor: '2023-09-15T10:00:00',
    platform: 'LinkedIn',
  },
];

// Format time for messages
const formatMessageTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true
  }).format(date);
};

// Format date for scheduled messages
const formatScheduledDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

// Generate initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const Automation = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1); // Default to first conversation
  const [messageText, setMessageText] = useState('');
  const [showScheduled, setShowScheduled] = useState(false);
  
  // Get the selected conversation data
  const currentConversation = conversationsData.find(conv => conv.id === selectedConversation);
  
  return (
    <div className="p-0 h-[calc(100vh-16px)] mt-16 ml-[65px] animate-fade-in flex">
      {/* Left Sidebar - Conversations */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-medium">Inbox</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowScheduled(!showScheduled)}
              className={`p-1.5 rounded-md ${
                showScheduled ? 'bg-yellow/10 text-yellow' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Clock size={18} />
            </button>
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50">
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        {!showScheduled ? (
          <div className="flex-1 overflow-y-auto">
            {conversationsData.map((conversation) => (
              <div 
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
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
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-medium mb-2">Scheduled Messages</h3>
              
              {scheduledMessages.map((message) => (
                <div key={message.id} className="mb-4 bg-card rounded-lg p-3 border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">{message.platform}</span>
                    <button className="text-xs text-muted-foreground hover:text-foreground">Edit</button>
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
              ))}
              
              <button className="w-full py-2 mt-2 border border-border rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors">
                Schedule New Message
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content - Conversation */}
      {selectedConversation && currentConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Conversation Header */}
          <div className="p-4 border-b border-border flex items-center">
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
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messageData.map((message) => (
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
                      {formatMessageTime(message.time)}
                    </span>
                    {message.sender === 'user' && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        {message.status === 'delivered' ? '✓' : '✓✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-end">
              <div className="flex-1">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-yellow/50 min-h-[60px] max-h-[150px]"
                  rows={2}
                />
                
                <div className="flex items-center mt-2">
                  <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                    <Image size={18} />
                  </button>
                  <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                    <FileText size={18} />
                  </button>
                  <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                    <Link2 size={18} />
                  </button>
                  <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                    <Smile size={18} />
                  </button>
                </div>
              </div>
              
              <div className="ml-3 flex flex-col space-y-2">
                <button className="p-2 bg-yellow text-primary-foreground rounded-md hover-scale">
                  <Send size={18} />
                </button>
                <button className="p-2 bg-secondary text-foreground rounded-md hover:bg-secondary/70 transition-colors">
                  <Clock size={18} />
                </button>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 bg-secondary/50 text-sm rounded hover:bg-secondary transition-colors">
                  Thanks for your interest!
                </button>
                <button className="px-3 py-1.5 bg-secondary/50 text-sm rounded hover:bg-secondary transition-colors">
                  When's a good time to chat?
                </button>
                <button className="px-3 py-1.5 bg-secondary/50 text-sm rounded hover:bg-secondary transition-colors">
                  Here's more info about our service
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
            <p className="text-muted-foreground">Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automation;
