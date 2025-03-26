
import { toast } from "@/hooks/use-toast";

export interface Message {
  id: number;
  sender: 'user' | 'contact';
  content: string;
  time: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  attachments?: { type: 'image' | 'file' | 'link', url: string }[];
}

export interface Conversation {
  id: number;
  username: string;
  name: string;
  platform: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string | null;
  messages: Message[];
}

// Format time for messages
export const formatMessageTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true
  }).format(date);
};

// Format date for scheduled messages
export const formatScheduledDate = (dateString: string) => {
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
export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

// Send a message
export const sendMessage = (
  conversationId: number,
  content: string,
  conversations: Conversation[],
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
) => {
  if (!content.trim()) return;

  const now = new Date().toISOString();
  const newMessage: Message = {
    id: Date.now(),
    sender: 'user',
    content,
    time: now,
    status: 'sent'
  };

  const updatedConversations = conversations.map(conv => {
    if (conv.id === conversationId) {
      // Update the conversation with the new message
      return {
        ...conv,
        lastMessage: content,
        time: '1 min ago',
        messages: [...conv.messages, newMessage]
      };
    }
    return conv;
  });

  setConversations(updatedConversations);
  toast({
    title: "Message sent",
    description: "Your message has been sent successfully.",
  });

  // Simulate a reply after 3 seconds (for demo purposes)
  setTimeout(() => {
    const replyMessage: Message = {
      id: Date.now(),
      sender: 'contact',
      content: "Thanks for your message! I'll get back to you soon.",
      time: new Date().toISOString(),
      status: 'read'
    };

    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: replyMessage.content,
            time: 'just now',
            messages: [...conv.messages, replyMessage]
          };
        }
        return conv;
      })
    );
  }, 3000);
};

// Schedule a message
export const scheduleMessage = (
  content: string,
  scheduledTime: Date,
  selectedRecipients: number[],
  platform: string,
  setScheduledMessages: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const newScheduledMessage = {
    id: Date.now(),
    content,
    recipients: selectedRecipients.length,
    scheduledFor: scheduledTime.toISOString(),
    platform
  };

  setScheduledMessages(prev => [...prev, newScheduledMessage]);
  toast({
    title: "Message scheduled",
    description: `Your message will be sent to ${selectedRecipients.length} recipients at ${formatScheduledDate(scheduledTime.toISOString())}.`,
  });
};
