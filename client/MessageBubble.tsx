import React, { useState } from "react";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [reactions, setReactions] = useState({
    hilarious: false,
    burn: false
  });

  const isAI = message.role === "assistant";
  
  const toggleReaction = (reaction: keyof typeof reactions) => {
    setReactions(prev => ({
      ...prev,
      [reaction]: !prev[reaction]
    }));
  };
  
  // Split message content by line breaks and render paragraphs
  const paragraphs = message.content.split('\n\n').filter(Boolean);
  
  if (isAI) {
    return (
      <div className="flex items-end mb-6 space-x-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="chat-bubble-ai bg-secondary max-w-[80%] p-3 rounded-lg rounded-bl-none shadow-md relative before:content-[''] before:absolute before:left-[-8px] before:bottom-0 before:w-0 before:h-0 before:border-r-[10px] before:border-r-secondary before:border-t-[10px] before:border-t-transparent">
          <div className="text-white font-normal leading-relaxed">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx} className={idx > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
          
          {paragraphs.length > 0 && (
            <div className="mt-2 flex space-x-2">
              <button 
                className={cn(
                  "text-xs rounded-full px-2 py-1 transition-colors flex items-center", 
                  reactions.hilarious 
                    ? "bg-primary text-white" 
                    : "bg-background text-gray-400 hover:bg-primary hover:text-white"
                )}
                onClick={() => toggleReaction('hilarious')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hilarious
              </button>
              <button 
                className={cn(
                  "text-xs rounded-full px-2 py-1 transition-colors flex items-center",
                  reactions.burn 
                    ? "bg-primary text-white" 
                    : "bg-background text-gray-400 hover:bg-primary hover:text-white"
                )}
                onClick={() => toggleReaction('burn')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A8 8 0 1017.657 18.657z" />
                </svg>
                Burn
              </button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row-reverse items-end space-x-2 space-x-reverse">
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shadow-md overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="chat-bubble-user bg-primary max-w-[80%] p-3 rounded-lg rounded-br-none shadow-md relative before:content-[''] before:absolute before:right-[-8px] before:bottom-0 before:w-0 before:h-0 before:border-l-[10px] before:border-l-primary before:border-t-[10px] before:border-t-transparent">
          <div className="text-white font-normal leading-relaxed">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx} className={idx > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default MessageBubble;
