import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Message } from "@/types/chat";
import { generateAIResponse } from "@/lib/openai";

interface ChatContextProps {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  clearChat: () => void;
  suggestedPrompt: string;
  setSuggestedPrompt: (prompt: string) => void;
  sarcasmLevel: string;
  setSarcasmLevel: (level: string) => void;
  adultContentEnabled: boolean;
  setAdultContentEnabled: (enabled: boolean) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Well, well, well... look who decided to grace me with their presence. I'm Chatmate X — the AI your therapist fears more than your unresolved childhood issues. What embarrassing question are you dying to ask that would make your browser history blush?",
  timestamp: new Date().toISOString()
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedPrompt, setSuggestedPrompt] = useState("");
  const [sarcasmLevel, setSarcasmLevel] = useState("maximum");
  const [adultContentEnabled, setAdultContentEnabled] = useState(true);
  
  // Ensure sarcasm level has a valid value
  useEffect(() => {
    // Set to maximum if sarcasmLevel is undefined or null
    if (!sarcasmLevel) {
      setSarcasmLevel("maximum");
    }
  }, []);
  
  const sendMessage = async (content: string) => {
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString()
    };
    
    // Update messages with user message
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Create system message based on selected sarcasm level
      let sarcasmInstructions = "";
      
      switch(sarcasmLevel) {
        case "mild":
          sarcasmInstructions = "Use occasional sarcasm and light humor. Be mildly witty but mostly helpful and straightforward.";
          break;
        case "medium":
          sarcasmInstructions = "Use moderate sarcasm and humor. Balance being witty with being helpful and informative.";
          break;
        case "maximum":
          sarcasmInstructions = "Maintain MAXIMUM sarcasm in your response. Be extremely witty, clever, and entertaining with strong humor.";
          break;
        case "borderline":
          sarcasmInstructions = "Use intense sarcasm that borders on rudeness. Be very edgy, snarky, and unapologetically sarcastic, while still being funny.";
          break;
        default:
          sarcasmInstructions = "Maintain MAXIMUM sarcasm in your response. Be extremely witty, clever, and entertaining with strong humor.";
      }
      
      const systemMessage: Message = {
        id: "system-" + Date.now().toString(),
        role: "system",
        content: `Remember to ${sarcasmInstructions}`,
        timestamp: new Date().toISOString()
      };
      
      // Create conversation history with user message
      const conversationHistory = [...messages, systemMessage, userMessage];
      
      // Generate AI response
      const response = await generateAIResponse(conversationHistory);
      
      // Simulate variable typing speed based on response length
      const typingDelay = Math.min(Math.max(response.length * 5, 1000), 2500);
      
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, typingDelay);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
    }
  };
  
  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
  };
  
  useEffect(() => {
    // Reset suggested prompt after it's been set
    if (suggestedPrompt) {
      const timeoutId = setTimeout(() => {
        setSuggestedPrompt("");
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [suggestedPrompt]);
  
  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        sendMessage,
        clearChat,
        suggestedPrompt,
        setSuggestedPrompt,
        sarcasmLevel,
        setSarcasmLevel,
        adultContentEnabled,
        setAdultContentEnabled
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
