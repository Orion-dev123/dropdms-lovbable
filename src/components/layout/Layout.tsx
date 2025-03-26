
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <Navbar />
      <main className="ml-[65px] pt-16 h-[calc(100vh-16px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
