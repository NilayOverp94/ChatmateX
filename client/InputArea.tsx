import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";

interface InputAreaProps {
  onClearChat: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onClearChat }) => {
  const { sendMessage, isTyping, sarcasmLevel, suggestedPrompt } = useChat();
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Predefined emojis for quick insertion
  const emojis = ["😂", "🤔", "😒", "🙄", "😎", "🤣", "😆", "👍", "🔥", "👀"];
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  useEffect(() => {
    // Focus input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Define SpeechRecognition types
  interface SpeechRecognitionEvent {
    results: {
      [index: number]: {
        [index: number]: {
          transcript: string;
        };
      };
    };
  }

  interface SpeechRecognitionErrorEvent {
    error: string;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    onstart: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
    start: () => void;
  }

  type SpeechRecognitionConstructor = new () => SpeechRecognition;

  // Function to start voice recognition
  const startListening = () => {
    // Type assertion for browser compatibility
    const windowWithSpeech = window as any;
    
    if ('webkitSpeechRecognition' in windowWithSpeech || 'SpeechRecognition' in windowWithSpeech) {
      const SpeechRecognitionAPI = (windowWithSpeech.SpeechRecognition || 
        windowWithSpeech.webkitSpeechRecognition) as SpeechRecognitionConstructor;
      
      const recognition = new SpeechRecognitionAPI();
      
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setMessage(prevMessage => prevMessage + ' ' + transcript);
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Your browser does not support speech recognition. Please try a modern browser like Chrome.');
    }
  };
  
  // Function to add emoji to the message
  const addEmoji = (emoji: string) => {
    setMessage(prevMessage => prevMessage + emoji);
    setShowEmojiPicker(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  useEffect(() => {
    // Set input value when suggestedPrompt changes
    if (suggestedPrompt) {
      setMessage(suggestedPrompt);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [suggestedPrompt]);
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (message.trim() && !isTyping) {
      sendMessage(message.trim());
      setMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="border-t border-secondary p-3 bg-background-light">
      <form onSubmit={handleSubmit} className="flex items-center bg-secondary rounded-lg p-2">
        <div className="relative">
          <button
            type="button"
            className={`text-gray-400 hover:text-white p-2 rounded-full transition-colors ${showEmojiPicker ? 'bg-primary bg-opacity-30 text-white' : ''}`}
            aria-label="Emoji picker"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          {showEmojiPicker && (
            <div className="absolute left-0 bottom-full mb-2 p-2 bg-secondary border border-accent rounded-lg shadow-lg flex flex-wrap gap-2 max-w-[220px] z-50">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  className="text-xl hover:bg-primary hover:bg-opacity-30 p-1 rounded transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something witty or scandalous..."
          className="flex-1 bg-transparent border-none focus:outline-none text-foreground mx-2"
          disabled={isTyping}
        />
        
        <div className="flex items-center">
          <button
            type="button"
            className={`text-gray-400 hover:text-white p-2 rounded-full transition-colors ${isListening ? 'bg-primary bg-opacity-30 text-white' : ''}`}
            aria-label="Voice input"
            onClick={startListening}
            disabled={isListening}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-full shadow-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
            disabled={!message.trim() || isTyping}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
      
      <div className="mt-2 px-2 text-xs text-gray-400 flex justify-between">
        <span>
          Chatmate X's Sassiness: <span className="text-accent font-semibold capitalize">{sarcasmLevel}</span>
        </span>
        <button 
          className="text-primary hover:underline"
          onClick={onClearChat}
        >
          Clear chat
        </button>
      </div>
    </div>
  );
};

export default InputArea;
