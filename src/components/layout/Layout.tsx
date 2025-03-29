
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isInboxPage = location.pathname === '/automation';
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Navbar />
      <main className={`ml-[65px] pt-16 ${isInboxPage ? 'h-[calc(100vh-64px)]' : 'min-h-[calc(100vh-64px)]'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
