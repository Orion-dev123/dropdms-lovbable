
import React from 'react';
import { Bell, Search, HelpCircle, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-[65px] right-0 h-16 bg-card border-b border-border z-30 px-6 flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="search"
          className="block w-full pl-10 pr-3 py-2 bg-secondary/50 border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-yellow/50 transition-all duration-200"
          placeholder="Search leads, campaigns, or messages..."
        />
      </div>
      
      <div className="flex items-center space-x-5">
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
