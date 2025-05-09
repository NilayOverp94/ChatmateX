import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Chat from "@/pages/Chat";
import { ChatProvider } from "@/contexts/ChatContext";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Chat} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Ensure dark mode is always used
  useEffect(() => {
    // Remove any light mode classes
    document.documentElement.classList.remove('light-mode');
    document.body.classList.remove('light-theme');
    
    // Add dark mode classes
    document.body.classList.add('dark-theme');
    
    // Always use dark theme
    localStorage.setItem('theme', 'dark');
    
    // Ensure text is visible
    document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, button, label, input, select, textarea')
      .forEach(el => {
        if (el instanceof HTMLElement && !el.classList.contains('text-white') && 
            !el.classList.contains('text-foreground') && 
            !el.classList.contains('text-accent') && 
            !el.classList.contains('text-primary')) {
          el.classList.add('text-foreground');
        }
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChatProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ChatProvider>
    </QueryClientProvider>
  );
}

export default App;
