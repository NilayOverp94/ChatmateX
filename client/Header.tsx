import React from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onToggleSettings }) => {
  return (
    <header className="bg-background-light border-b border-secondary py-3 px-4 flex flex-col md:flex-row items-center justify-between shadow-md">
      <div className="flex items-center">
        <div className="relative">
          {/* AI Avatar with status indicator */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-background-light animate-pulse"></span>
        </div>
        
        <div className="ml-3">
          <h1 className="font-sans font-bold text-xl text-white">Chatmate <span className="text-primary bg-gray-800 px-1 rounded">X</span></h1>
          <p className="text-xs text-gray-400 -mt-1">Powered by Groq AI | Now with adjustable sarcasm</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-2 md:mt-0">
        <nav className="hidden md:flex space-x-1 mr-4">
          <button 
            className="px-3 py-1 text-sm text-white bg-primary bg-opacity-20 rounded-md hover:bg-opacity-30 transition-colors"
            onClick={() => {
              // Reset the application state - both panels should be closed
              window.location.reload();
            }}
          >
            Home
          </button>
          <button 
            className="px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors"
            onClick={() => {
              // Open an About panel instead of alert
              onToggleSettings();
              setTimeout(() => {
                const aboutSection = document.querySelector('.about-section');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
          >
            About
          </button>
        </nav>
        
        <button 
          className="flex items-center bg-secondary hover:bg-opacity-80 px-3 py-1.5 rounded-md transition-colors"
          onClick={onToggleSettings}
          aria-label="Toggle settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-300">Settings</span>
        </button>
        
        <button 
          className="bg-primary hover:bg-opacity-90 px-3 py-1.5 rounded-md text-sm text-white transition-colors md:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle personality"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Personality
        </button>
        
        <button 
          className="hidden md:flex items-center bg-primary hover:bg-opacity-90 px-3 py-1.5 rounded-md transition-colors"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-white">Personality</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
