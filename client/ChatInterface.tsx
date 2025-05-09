import React, { useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import MessageBubble from "@/components/MessageBubble";
import InputArea from "@/components/InputArea";
import TypingIndicator from "@/components/TypingIndicator";
import { cn } from "@/lib/utils";

const ChatInterface: React.FC = () => {
  const { messages, isTyping, clearChat } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col relative">
      <div 
        ref={chatContainerRef}
        className={cn(
          "chat-container flex-1 overflow-y-auto p-4 space-y-4",
          "scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
        )}
      >
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
      </div>
      
      <InputArea onClearChat={clearChat} />
    </div>
  );
};

export default ChatInterface;
