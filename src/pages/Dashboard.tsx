
import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import CampaignsList from '../components/dashboard/CampaignsList';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { Send, UserPlus, Clock, BarChart } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard 
          title="DMs Sent Today" 
          value="128" 
          icon={Send} 
          trend={{ value: 12, positive: true }}
        />
        <StatCard 
          title="New Leads Captured" 
          value="35" 
          icon={UserPlus} 
          trend={{ value: 8, positive: true }}
        />
        <StatCard 
          title="Messages in Queue" 
          value="64" 
          icon={Clock}
        />
        <StatCard 
          title="Click-through Rate" 
          value="5.2%" 
          icon={BarChart} 
          trend={{ value: 2.1, positive: false }}
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns - Spans 2 columns */}
        <div className="lg:col-span-2">
          <CampaignsList />
        </div>
        
        {/* Activity Feed */}
        <div>
          <ActivityFeed />
        </div>
      </div>
      
      {/* Floating Action Button */}
      <button className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-yellow text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-200">
        <Send size={20} />
      </button>
    </div>
  );
};

export default Dashboard;
