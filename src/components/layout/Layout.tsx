
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Navbar />
      <main className="ml-[65px] pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
