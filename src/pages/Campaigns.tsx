
import React, { useState } from 'react';
import { Send, List, Grid, ChevronRight, User, MessageSquare, Clock, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import KanbanBoard, { type Campaign, type CampaignStatus } from '@/components/campaigns/KanbanBoard';
import CalendarView from '@/components/campaigns/CalendarView';

// Updated Campaign Data with new status types
const campaignData: Campaign[] = [{
  id: 1,
  name: 'Summer Outreach',
  platform: 'Instagram',
  progress: 67,
  leads: 100,
  messagesDelivered: 67,
  status: 'Ongoing',
  date: '2023-09-01T10:30:00',
  startTime: '10:30 AM',
  endTime: '2:30 PM',
  owner: 'Alex Kim'
}, {
  id: 2,
  name: 'Product Launch',
  platform: 'LinkedIn',
  progress: 100,
  leads: 120,
  messagesDelivered: 120,
  status: 'Completed',
  date: '2023-08-15T14:45:00',
  startTime: '2:45 PM',
  endTime: '5:00 PM',
  owner: 'Sarah Johnson'
}, {
  id: 3,
  name: 'Feedback Collection',
  platform: 'Twitter',
  progress: 0,
  leads: 50,
  messagesDelivered: 0,
  status: 'Scheduled',
  date: '2023-09-10T09:15:00',
  startTime: '9:15 AM',
  endTime: '12:00 PM',
  owner: 'James Smith'
}, {
  id: 4,
  name: 'Influencer Outreach',
  platform: 'Instagram',
  progress: 43,
  leads: 75,
  messagesDelivered: 32,
  status: 'Ongoing',
  date: '2023-08-20T16:20:00',
  startTime: '4:20 PM',
  endTime: '6:30 PM',
  owner: 'Emily Chen'
}, {
  id: 5,
  name: 'Holiday Promotion',
  platform: 'Twitter',
  progress: 0,
  leads: 200,
  messagesDelivered: 0,
  status: 'Scheduled',
  date: '2023-09-05T11:30:00',
  startTime: '11:30 AM',
  endTime: '3:00 PM',
  owner: 'Michael Rogers'
}, {
  id: 6,
  name: 'User Reactivation',
  platform: 'Instagram',
  progress: 25,
  leads: 150,
  messagesDelivered: 37,
  status: 'Paused',
  date: '2023-08-25T14:00:00',
  startTime: '2:00 PM',
  endTime: '5:30 PM',
  owner: 'David Lee'
}];

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState<CampaignStatus | 'All'>('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'kanban' | 'calendar'>('kanban');

  // Filter campaigns based on active tab
  const filteredCampaigns = activeTab === 'All' ? campaignData : campaignData.filter(campaign => campaign.status === activeTab);

  // Campaign creation steps mockup
  const [showCampaignCreation, setShowCampaignCreation] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Toggle campaign creation wizard
  const toggleCampaignCreation = () => {
    setShowCampaignCreation(!showCampaignCreation);
    setCurrentStep(1);
  };
  
  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <p className="text-muted-foreground text-base">Manage your marketing campaigns</p>
      </div>
      
      {/* Tabs and View Toggle */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex border-b border-border">
          <button onClick={() => setActiveTab('All')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'All' ? 'border-b-2 border-yellow text-yellow' : 'text-muted-foreground'}`}>
            All
          </button>
          <button onClick={() => setActiveTab('Ongoing')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'Ongoing' ? 'border-b-2 border-yellow text-yellow' : 'text-muted-foreground'}`}>
            Ongoing
          </button>
          <button onClick={() => setActiveTab('Scheduled')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'Scheduled' ? 'border-b-2 border-yellow text-yellow' : 'text-muted-foreground'}`}>
            Scheduled
          </button>
          <button onClick={() => setActiveTab('Paused')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'Paused' ? 'border-b-2 border-yellow text-yellow' : 'text-muted-foreground'}`}>
            Paused
          </button>
          <button onClick={() => setActiveTab('Completed')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'Completed' ? 'border-b-2 border-yellow text-yellow' : 'text-muted-foreground'}`}>
            Completed
          </button>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <div className="bg-secondary/50 rounded-md p-1 flex items-center space-x-2 mr-2">
            <button onClick={() => setViewMode('kanban')} className={`p-1.5 rounded-md ${viewMode === 'kanban' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}>
              <Grid size={18} />
            </button>
            <button onClick={() => setViewMode('calendar')} className={`p-1.5 rounded-md ${viewMode === 'calendar' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}>
              <Calendar size={18} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}>
              <List size={18} />
            </button>
          </div>
          
          <Button onClick={toggleCampaignCreation} className="flex items-center gap-2 bg-yellow text-primary-foreground hover:bg-yellow/90">
            <Send size={16} />
            <span>New Campaign</span>
          </Button>
        </div>
      </div>
      
      {/* Calendar View */}
      {viewMode === 'calendar' && !showCampaignCreation && (
        <CalendarView campaigns={filteredCampaigns} />
      )}
      
      {/* Kanban Board View */}
      {viewMode === 'kanban' && !showCampaignCreation && (
        <KanbanBoard campaigns={filteredCampaigns} />
      )}
      
      {/* Empty State */}
      {filteredCampaigns.length === 0 && !showCampaignCreation && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
            <Send size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No campaigns found</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            You don't have any {activeTab.toLowerCase()} campaigns yet. Create your first campaign to get started.
          </p>
          <button onClick={toggleCampaignCreation} className="px-4 py-2 bg-yellow text-primary-foreground rounded-md flex items-center gap-2 hover-scale">
            <Send size={16} />
            <span>New Campaign</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
