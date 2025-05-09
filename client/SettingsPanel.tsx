import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isVisible, onClose }) => {
  const { 
    sarcasmLevel, 
    setSarcasmLevel, 
    adultContentEnabled, 
    setAdultContentEnabled 
  } = useChat();

  return (
    <div 
      className={cn(
        "w-80 border-l border-secondary bg-background-light transition-all duration-300",
        "flex-col",
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
        <h2 className="font-space font-bold text-lg">Chatmate X Settings</h2>
        <p className="text-sm text-gray-400">Customize your experience</p>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {/* Sarcasm Level Settings */}
        <div>
          <h3 className="font-medium mb-3">Sarcasm Level</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="sarcasm-mild" 
                name="sarcasm" 
                value="mild"
                checked={sarcasmLevel === "mild"}
                onChange={() => setSarcasmLevel("mild")}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="sarcasm-mild" className="text-sm">Mild - Occasionally sassy</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="sarcasm-medium" 
                name="sarcasm" 
                value="medium"
                checked={sarcasmLevel === "medium"}
                onChange={() => setSarcasmLevel("medium")}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="sarcasm-medium" className="text-sm">Medium - Moderately sarcastic</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="sarcasm-maximum" 
                name="sarcasm" 
                value="maximum"
                checked={sarcasmLevel === "maximum"}
                onChange={() => setSarcasmLevel("maximum")}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="sarcasm-maximum" className="text-sm font-semibold">Maximum - Full snark mode</label>
              <span className="text-xs bg-primary text-white px-1 rounded">DEFAULT</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="sarcasm-borderline" 
                name="sarcasm" 
                value="borderline"
                checked={sarcasmLevel === "borderline"}
                onChange={() => setSarcasmLevel("borderline")}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="sarcasm-borderline" className="text-sm">Borderline Rude - Almost offensive</label>
            </div>
          </div>
        </div>
        
        {/* Content Settings */}
        <div>
          <h3 className="font-medium mb-3">Content Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm flex items-center" htmlFor="adult-content-toggle">
                <span>Adult Content</span>
                <span className={cn(
                  "ml-2 text-xs rounded px-1",
                  adultContentEnabled 
                    ? "text-accent bg-accent bg-opacity-20" 
                    : "text-red-400 bg-red-400 bg-opacity-20"
                )}>
                  {adultContentEnabled ? 'ENABLED' : 'DISABLED'}
                </span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  id="adult-content-toggle"
                  type="checkbox" 
                  checked={adultContentEnabled} 
                  onChange={(e) => setAdultContentEnabled(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            <p className="text-xs text-gray-400">
              When enabled, Chatmate X can discuss adult topics and use mature humor. 
              Disable this for a more PG-rated experience.
            </p>
          </div>
        </div>
        
        {/* Removed Theme Options */}
        
        {/* Account & Privacy */}
        <div>
          <h3 className="font-medium mb-3">Account & Privacy</h3>
          <div className="space-y-2">
            <button 
              className="w-full flex justify-between items-center bg-secondary bg-opacity-50 p-3 rounded-lg hover:bg-opacity-70 transition-colors"
              onClick={() => {
                if (confirm("Are you sure you want to delete all conversation history?")) {
                  // Call the clear chat function from context
                  const { clearChat } = useChat();
                  clearChat();
                  alert("Conversation history deleted!");
                }
              }}
            >
              <span className="text-sm">Delete Conversation History</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button 
              className="w-full flex justify-between items-center bg-secondary bg-opacity-50 p-3 rounded-lg hover:bg-opacity-70 transition-colors"
              onClick={() => {
                // Get the messages from context
                const { messages } = useChat();
                
                // Convert messages to a downloadable format
                const chatLog = messages
                  .map(msg => `[${new Date(msg.timestamp).toLocaleString()}] ${msg.role}: ${msg.content}`)
                  .join('\n\n');
                
                // Create a Blob with the chat data
                const blob = new Blob([chatLog], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                
                // Create a temporary link and trigger download
                const a = document.createElement('a');
                a.href = url;
                a.download = `chatmate-x-conversation-${new Date().toISOString().split('T')[0]}.txt`;
                a.click();
                
                // Clean up
                URL.revokeObjectURL(url);
                
                alert("Chat log downloaded!");
              }}
            >
              <span className="text-sm">Export Chat Log</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button 
              className="w-full flex justify-between items-center bg-secondary bg-opacity-50 p-3 rounded-lg hover:bg-opacity-70 transition-colors"
              onClick={() => {
                alert(`
Privacy Policy for Chatmate X

At Chatmate X, we value your privacy and are committed to protecting your personal data.

Information We Collect:
- Chat messages and interactions with our AI
- Preference settings like sarcasm level and theme choice
- Non-personally identifiable technical data

How We Use Your Information:
- To provide and improve our AI chat services
- To customize your experience based on preferences
- For internal analytics to enhance our services

Data Security:
Your conversations are securely processed and not shared with third parties.

Contact:
For privacy questions, contact NILAY.

Last Updated: May 9, 2024
                `);
              }}
            >
              <span className="text-sm">Privacy Policy</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-secondary about-section space-y-3">
        <h3 className="font-medium">About Chatmate X</h3>
        <p className="text-sm text-gray-400">
          Chatmate X is an AI with attitude that answers any question with intelligence, sarcasm, and a complete disregard for social norms. Never boring, sometimes inappropriate, always entertaining.
        </p>
        <p className="text-sm text-gray-400">
          Built with advanced AI technology powered by Groq, this chatbot features adjustable sarcasm levels to match your preferences, from mildly sassy to borderline offensive.
        </p>
        <div className="border-t border-secondary pt-3 mt-3">
          <p className="text-xs text-gray-400">
            Chatmate X v1.0.0 • Powered by Groq AI
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Developed by <span className="text-accent font-semibold">NILAY</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;