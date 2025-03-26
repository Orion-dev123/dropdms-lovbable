
import { useState } from 'react';
import { Send, Clock, Image, FileText, Link2, Smile } from 'lucide-react';
import { Conversation, sendMessage } from '@/utils/messageUtils';

interface MessageComposerProps {
  selectedConversation: number | null;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  onSchedule: () => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ 
  selectedConversation, 
  conversations, 
  setConversations,
  onSchedule
}) => {
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (selectedConversation && messageText.trim()) {
      sendMessage(selectedConversation, messageText, conversations, setConversations);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-end">
        <div className="flex-1">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
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
          <button 
            className="p-2 bg-yellow text-primary-foreground rounded-md hover-scale"
            onClick={handleSendMessage}
            disabled={!selectedConversation || !messageText.trim()}
          >
            <Send size={18} />
          </button>
          <button 
            className="p-2 bg-secondary text-foreground rounded-md hover:bg-secondary/70 transition-colors"
            onClick={onSchedule}
          >
            <Clock size={18} />
          </button>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex flex-wrap gap-2">
          <button 
            className="px-3 py-1.5 bg-secondary/50 text-sm rounded hover:bg-secondary transition-colors"
            onClick={() => setMessageText("Thanks for your interest!")}
          >
            Thanks for your interest!
          </button>
          <button 
            className="px-3 py-1.5 bg-secondary/50 text-sm rounded hover:bg-secondary transition-colors"
            onClick={() => setMessageText("When's a good time to chat?")}
          >
            When's a good time to chat?
          </button>
          <button 
            className="px-3 py-1.5 bg-secondary/50 text-sm rounded hover:bg-secondary transition-colors"
            onClick={() => setMessageText("Here's more info about our service")}
          >
            Here's more info about our service
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
