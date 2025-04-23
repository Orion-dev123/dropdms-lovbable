
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    // Main container is flex row, full height, prevents its own overflow
    <div className="h-screen bg-background text-foreground flex overflow-hidden"> 
      <Sidebar /> 
      {/* Container for Navbar and Main content, takes remaining space, handles vertical flex, AND adds left margin for Sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden ml-[65px]"> 
        <Navbar location={location} /> 
        {/* Main content area grows (flex-1) and handles its own vertical scrolling */}
        <main className="flex-1 overflow-y-auto"> 
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
