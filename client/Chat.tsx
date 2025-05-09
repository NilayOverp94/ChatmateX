import React, { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import PersonalitySidebar from "@/components/PersonalitySidebar";
import SettingsPanel from "@/components/SettingsPanel";

const Chat: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  
  const toggleSidebar = () => {
    // Toggle the sidebar visibility
    setSidebarVisible(!sidebarVisible);
    // If settings panel is open, close it
    if (settingsVisible) setSettingsVisible(false);
  };
  
  const toggleSettings = () => {
    // Toggle the settings visibility
    setSettingsVisible(!settingsVisible);
    // If sidebar is open, close it
    if (sidebarVisible) setSidebarVisible(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header 
        onToggleSidebar={toggleSidebar} 
        onToggleSettings={toggleSettings} 
      />
      
      <main className="flex-1 flex overflow-hidden">
        <ChatInterface />
        <PersonalitySidebar 
          isVisible={sidebarVisible} 
          onClose={() => setSidebarVisible(false)} 
        />
        <SettingsPanel 
          isVisible={settingsVisible} 
          onClose={() => setSettingsVisible(false)} 
        />
      </main>
      
      {/* Mobile Navigation */}
      <nav className="md:hidden bg-background-light border-t border-secondary py-2 px-4">
        <div className="flex justify-between items-center">
          <button 
            className="flex flex-col items-center text-white transition-colors"
            onClick={() => {
              // Close any open panels
              if (sidebarVisible) setSidebarVisible(false);
              if (settingsVisible) setSettingsVisible(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-xs mt-1">Chat</span>
          </button>
          
          <button 
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">Personality</span>
          </button>
          
          <button 
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
            onClick={toggleSettings}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Chat;
