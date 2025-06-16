
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
  const [viewMode, setViewMode] = useState<'kanban'>('kanban');

  // Filter campaigns based on active tab
  const filteredCampaigns = activeTab === 'All' ? campaignData : campaignData.filter(campaign => campaign.status === activeTab);
  
  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <p className="text-muted-foreground text-base">Manage your marketing campaigns</p>
      </div>
      
      {/* Kanban Board View */}
      <KanbanBoard campaigns={filteredCampaigns} />
      
      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
            <Send size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No campaigns found</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            You don't have any {activeTab.toLowerCase()} campaigns yet. Create your first campaign to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
