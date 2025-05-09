import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";

interface PersonalitySidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const PersonalitySidebar: React.FC<PersonalitySidebarProps> = ({ isVisible, onClose }) => {
  const { setSuggestedPrompt, sarcasmLevel, setSarcasmLevel, adultContentEnabled, setAdultContentEnabled } = useChat();

  const suggestedPrompts = [
    "Tell me about black holes, but make it inappropriately funny.",
    "What would you say if I told you I still use Internet Explorer?",
    "Roast my taste in music if I love Nickelback.",
    "Explain quantum physics like you're a sarcastic bartender at 2 AM.",
    "Write me a breakup text for someone I've only dated for 3 days.",
    "Tell me a dirty joke that will make me question my life choices."
  ];

  const handleSuggestedPrompt = (prompt: string) => {
    setSuggestedPrompt(prompt);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <div 
      className={cn(
        "w-80 border-l border-secondary bg-background-light transition-all duration-300 flex-col",
        isVisible ? "fixed inset-0 z-50 md:relative md:inset-auto" : "hidden"
      )}
    >
      {isVisible && window.innerWidth < 768 && (
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      <div className="p-4 border-b border-secondary">
        <h2 className="font-space font-bold text-lg">Personality Profile</h2>
        <p className="text-sm text-gray-400">Meet your AI with attitude</p>
        <div className="mt-2 bg-accent bg-opacity-20 text-accent text-xs p-2 rounded-md">
          <span className="font-bold">POWERED BY GROQ AI</span> - Enhanced sarcasm and humor
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {/* Sarcasm Level */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Sarcasm Level</h3>
            <span className={`text-xs font-semibold ${sarcasmLevel === "maximum" || sarcasmLevel === "borderline" ? "text-accent animate-pulse" : "text-primary"}`}>
              {sarcasmLevel === "mild" && "MILD"}
              {sarcasmLevel === "medium" && "MEDIUM"}
              {sarcasmLevel === "maximum" && "MAXIMUM"}
              {sarcasmLevel === "borderline" && "BORDERLINE"}
            </span>
          </div>
          <progress 
            className="w-full h-2 bg-secondary rounded-full appearance-none [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-gradient-to-r from-accent to-primary [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-gradient-to-r from-accent to-primary" 
            value={sarcasmLevel === "mild" ? 25 : sarcasmLevel === "medium" ? 50 : sarcasmLevel === "maximum" ? 90 : 100} 
            max="100"
          ></progress>
          <p className="text-xs text-gray-400 mt-1">
            {sarcasmLevel === "mild" && "Occasionally witty with light sarcasm."}
            {sarcasmLevel === "medium" && "Moderately sarcastic with balanced humor."}
            {sarcasmLevel === "maximum" && "Maximum sarcasm level. Highly entertaining."}
            {sarcasmLevel === "borderline" && "Dangerously sarcastic. Almost offensive."}
          </p>
        </div>
        
        {/* Humor Style */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Humor Style</h3>
            <span className="text-xs text-primary font-semibold">Dark & Witty</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center bg-secondary bg-opacity-50 rounded-lg py-2 ring-2 ring-accent">
              <span className="text-xs text-foreground">Dark</span>
            </div>
            <div className="text-center bg-secondary bg-opacity-50 rounded-lg py-2">
              <span className="text-xs text-foreground">Dad Jokes</span>
            </div>
            <div className="text-center bg-secondary bg-opacity-50 rounded-lg py-2 ring-2 ring-accent">
              <span className="text-xs text-foreground">Witty</span>
            </div>
            <div className="text-center bg-secondary bg-opacity-50 rounded-lg py-2">
              <span className="text-xs text-foreground">Silly</span>
            </div>
            <div className="text-center bg-secondary bg-opacity-50 rounded-lg py-2 ring-2 ring-accent">
              <span className="text-xs text-foreground">Edgy</span>
            </div>
            <div className="text-center bg-secondary bg-opacity-50 rounded-lg py-2">
              <span className="text-xs text-foreground">Clean</span>
            </div>
          </div>
        </div>
        
        {/* Current Mood */}
        <div>
          <h3 className="font-medium mb-2">Current Mood</h3>
          <div className="bg-secondary bg-opacity-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              {sarcasmLevel === "mild" && (
                <svg className="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {sarcasmLevel === "medium" && (
                <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {sarcasmLevel === "maximum" && (
                <svg className="h-6 w-6 text-warning" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6-14l-2 2m0 0l-2-2m2 2l2-2m-12 6h16M6 12l2-2m0 0l-2-2m2 2l-2 2m2-2l2 2M8 19l4-4 4 4m-8-4v8m16-11a3 3 0 01-3 3H9a3 3 0 01-3-3V8a3 3 0 013-3h10a3 3 0 013 3v4z" />
                </svg>
              )}
              {sarcasmLevel === "borderline" && (
                <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A8 8 0 1017.657 18.657z" />
                </svg>
              )}
              <div>
                <p className="font-medium">
                  {sarcasmLevel === "mild" && "Helpfully Polite"}
                  {sarcasmLevel === "medium" && "Mildly Sarcastic"}
                  {sarcasmLevel === "maximum" && "Sarcastically Helpful"}
                  {sarcasmLevel === "borderline" && "Brutally Sarcastic"}
                </p>
                <p className="text-xs text-gray-400">
                  {sarcasmLevel === "mild" && "Will help you without much judgment."}
                  {sarcasmLevel === "medium" && "Will help you, with a dash of snark."}
                  {sarcasmLevel === "maximum" && "Will help you, but judge you for needing it."}
                  {sarcasmLevel === "borderline" && "Will help you, while roasting you thoroughly."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Personality Traits */}
        <div>
          <h3 className="font-medium mb-2">Personality Traits</h3>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-accent bg-opacity-20 rounded-full px-3 py-1 text-accent font-semibold">Quick-Witted</span>
            <span className="text-xs bg-primary bg-opacity-20 rounded-full px-3 py-1 text-primary font-semibold">Provocative</span>
            <span className="text-xs bg-blue-400 bg-opacity-20 rounded-full px-3 py-1 text-blue-400 font-semibold">Intellectual</span>
            <span className="text-xs bg-yellow-400 bg-opacity-20 rounded-full px-3 py-1 text-yellow-400 font-semibold">Flirty</span>
            <span className="text-xs bg-red-400 bg-opacity-20 rounded-full px-3 py-1 text-red-400 font-semibold">Unapologetic</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-foreground font-semibold">No Filter</span>
          </div>
        </div>
        
        {/* Content Settings */}
        <div>
          <h3 className="font-medium mb-2">Content Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm flex items-center">
                <span>Adult Content</span>
                <span className={cn(
                  "ml-2 text-xs rounded px-1",
                  adultContentEnabled 
                    ? "text-accent bg-accent bg-opacity-20" 
                    : "text-red-400 bg-red-400 bg-opacity-20"
                )}>
                  {adultContentEnabled ? 'ON' : 'OFF'}
                </span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={adultContentEnabled} 
                  onChange={(e) => setAdultContentEnabled(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm flex items-center">
                <span>Sarcasm Intensity</span>
              </label>
              <select 
                className="bg-secondary text-sm rounded-md py-1 px-2 border-none focus:outline-none focus:ring-1 focus:ring-primary"
                value={sarcasmLevel}
                onChange={(e) => setSarcasmLevel(e.target.value)}
              >
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="maximum">Maximum (Default)</option>
                <option value="borderline">Borderline Rude</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Suggested Topics */}
        <div>
          <h3 className="font-medium mb-2">Suggested Topics</h3>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt, index) => (
              <button 
                key={index}
                className="w-full text-left text-sm bg-secondary bg-opacity-40 hover:bg-opacity-60 rounded-lg p-2 transition-colors"
                onClick={() => handleSuggestedPrompt(prompt)}
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-secondary">
        <p className="text-xs text-gray-400 mb-2">About Chatmate X</p>
        <p className="text-xs text-gray-400">
          The AI with attitude that answers any question with intelligence, sarcasm, and a complete disregard for social norms. Never boring, sometimes inappropriate, always entertaining.
        </p>
      </div>
    </div>
  );
};

export default PersonalitySidebar;
