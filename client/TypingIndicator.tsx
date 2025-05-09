import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end mb-6 space-x-2">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="bg-secondary px-4 py-3 rounded-lg rounded-bl-none shadow-md flex items-center gap-1">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
