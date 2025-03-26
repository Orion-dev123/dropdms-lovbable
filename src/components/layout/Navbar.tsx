
import React, { useState, useEffect } from 'react';
import { Bell, HelpCircle, UserCircle, Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  // Toggle between dark and light theme
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    // Update the DOM
    if (newTheme) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }
  };
  
  // Initialize theme on component mount
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'light') {
      setIsDarkTheme(false);
      document.documentElement.classList.add('light-theme');
    } else if (savedTheme === 'dark' || prefersDark) {
      setIsDarkTheme(true);
      document.documentElement.classList.remove('light-theme');
    }
  }, []);
  
  // Save theme preference when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  return (
    <header className="fixed top-0 left-[65px] right-0 h-16 bg-card border-b border-border z-30 px-6 flex items-center justify-end">
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-2 mr-2">
          <Moon size={18} className={`text-muted-foreground ${isDarkTheme ? 'text-yellow' : ''}`} />
          <Switch 
            checked={isDarkTheme}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-yellow"
          />
          <Sun size={18} className={`text-muted-foreground ${!isDarkTheme ? 'text-yellow' : ''}`} />
        </div>
        
        <button className="relative p-2 rounded-md hover:bg-secondary/50 transition-all duration-200">
          <Bell size={20} className="text-muted-foreground hover:text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow rounded-full"></span>
        </button>
        
        <button className="p-2 rounded-md hover:bg-secondary/50 transition-all duration-200">
          <HelpCircle size={20} className="text-muted-foreground hover:text-foreground" />
        </button>
        
        <div className="flex items-center space-x-2 pl-2 border-l border-border">
          <UserCircle size={28} className="text-yellow/90" />
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
