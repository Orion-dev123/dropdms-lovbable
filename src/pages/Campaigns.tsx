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

// Formatting date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Status color helper
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'text-yellow';
    case 'Completed':
      return 'text-green-500';
    case 'Draft':
      return 'text-blue-500';
    default:
      return 'text-muted-foreground';
  }
};

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
  
  return <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <p className="text-muted-foreground text-base">Manage your marketing campaigns</p>
      </div>
      
      {/* Tabs and View Toggle - THIS IS THE SECTION THE USER ASKED TO PRESERVE */}
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
              <Calendar size={18} /> {/* We need to add this import */}
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
      
      {/* Campaign Creation Wizard - Only shown when creating a new campaign */}
      {showCampaignCreation && <div className="mb-6 bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-medium">Create New Campaign</h3>
          </div>
          
          {/* Steps Indicator */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-yellow text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                1
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${currentStep > 1 ? 'bg-yellow' : 'bg-border'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-yellow text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                2
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${currentStep > 2 ? 'bg-yellow' : 'bg-border'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-yellow text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                3
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${currentStep > 3 ? 'bg-yellow' : 'bg-border'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-yellow text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                4
              </div>
            </div>
          </div>
          
          {/* Step Content */}
          <div className="px-6 py-6">
            {currentStep === 1 && <div className="animate-fade-in">
                <h4 className="text-lg font-medium mb-4">Name Your Campaign</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Campaign Name</label>
                    <input type="text" placeholder="e.g. Summer Outreach 2023" className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Platform</label>
                    <select className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50">
                      <option value="">Select a platform</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>
                </div>
              </div>}
            
            {currentStep === 2 && <div className="animate-fade-in">
                <h4 className="text-lg font-medium mb-4">Select Target Leads</h4>
                <div className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <p className="text-sm mb-3">Selected Leads: <span className="font-medium">0</span></p>
                    <button className="px-3 py-1.5 bg-secondary text-foreground rounded flex items-center gap-1 text-sm">
                      <User size={14} />
                      <span>Choose Leads</span>
                    </button>
                  </div>
                  
                  <div className="border border-border rounded-md divide-y divide-border">
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-3 rounded border-border" />
                        <div>
                          <p className="text-sm font-medium">Smart Select</p>
                          <p className="text-xs text-muted-foreground">Auto-select users based on activity</p>
                        </div>
                      </div>
                      <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">Beta</span>
                    </div>
                    <div className="p-3 flex items-center">
                      <input type="checkbox" className="mr-3 rounded border-border" />
                      <div>
                        <p className="text-sm font-medium">Manually Add Usernames</p>
                        <p className="text-xs text-muted-foreground">Add specific usernames</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            
            {currentStep === 3 && <div className="animate-fade-in">
                <h4 className="text-lg font-medium mb-4">Create Message Template</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea placeholder="Write your message here..." className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50 min-h-[120px]"></textarea>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button className="px-2 py-1 bg-secondary/50 text-xs rounded">
                        {'{first_name}'}
                      </button>
                      <button className="px-2 py-1 bg-secondary/50 text-xs rounded">
                        {'{username}'}
                      </button>
                      <button className="px-2 py-1 bg-secondary/50 text-xs rounded">
                        {'{company}'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="px-3 py-1.5 bg-secondary text-foreground rounded flex items-center gap-1 text-sm">
                      <span>Attach Image</span>
                    </button>
                    <button className="px-3 py-1.5 bg-secondary text-foreground rounded flex items-center gap-1 text-sm">
                      <span>Add Link</span>
                    </button>
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <h5 className="text-sm font-medium mb-2">Preview</h5>
                    <div className="bg-background p-3 rounded-md text-sm">
                      <p>Hey {'{first_name}'}, I noticed your work at {'{company}'} and wanted to connect!</p>
                    </div>
                  </div>
                </div>
              </div>}
            
            {currentStep === 4 && <div className="animate-fade-in">
                <h4 className="text-lg font-medium mb-4">Scheduling & Automation</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">Send Messages</h5>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <input type="radio" id="sendNow" name="sendTime" className="mr-2" />
                        <label htmlFor="sendNow" className="text-sm">Send Now</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="sendLater" name="sendTime" className="mr-2" />
                        <label htmlFor="sendLater" className="text-sm">Schedule Later</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Time Delay Between Messages</label>
                    <div className="flex items-center">
                      <input type="range" min="1" max="60" className="flex-1 mr-3" />
                      <span className="text-sm bg-secondary/50 px-2 py-1 rounded">30 seconds</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Adding a random delay helps avoid getting flagged as spam
                    </p>
                  </div>
                  
                  <div className="border border-border rounded-md divide-y divide-border">
                    <div className="p-3 flex items-center">
                      <input type="checkbox" className="mr-3 rounded border-border" />
                      <div>
                        <p className="text-sm font-medium">Randomize Message Variations</p>
                        <p className="text-xs text-muted-foreground">Small changes to make each message unique</p>
                      </div>
                    </div>
                    <div className="p-3 flex items-center">
                      <input type="checkbox" className="mr-3 rounded border-border" />
                      <div>
                        <p className="text-sm font-medium">Retry Failed Messages</p>
                        <p className="text-xs text-muted-foreground">Automatically retry if a message fails</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
          
          {/* Step Navigation */}
          <div className="px-6 py-4 border-t border-border flex justify-between">
            <button onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} className={`px-4 py-2 bg-secondary rounded-md ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={currentStep === 1}>
              Back
            </button>
            
            <button onClick={() => {
          if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
          } else {
            // Submit form
            toggleCampaignCreation();
          }
        }} className="px-4 py-2 bg-yellow text-primary-foreground rounded-md flex items-center gap-2">
              {currentStep < 4 ? <>
                  <span>Next</span>
                  <ChevronRight size={16} />
                </> : <span>Create Campaign</span>}
            </button>
          </div>
        </div>}
      
      {/* Campaigns List/Grid View */}
      {(viewMode === 'list' || viewMode === 'grid') && !showCampaignCreation && <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
          {filteredCampaigns.map(campaign => viewMode === 'grid' ? <div key={campaign.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-yellow/30 transition-all duration-300">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium truncate">{campaign.name}</h3>
                    <span className={`text-xs ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-4">
                    {campaign.platform} · {formatDate(campaign.date)}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <User size={14} className="mr-2 text-muted-foreground" />
                        <span className="text-sm">{campaign.leads} Leads</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <MessageSquare size={14} className="mr-2 text-muted-foreground" />
                        <span className="text-sm">{campaign.messagesDelivered} Messages Delivered</span>
                      </div>
                    </div>
                    
                    {campaign.status !== 'Draft' && <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{campaign.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-yellow rounded-full transition-all duration-500" style={{
                  width: `${campaign.progress}%`
                }}></div>
                        </div>
                      </div>}
                  </div>
                </div>
                
                <div className="px-5 py-3 border-t border-border bg-secondary/30 flex justify-between items-center">
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    View Details
                  </button>
                  
                  {campaign.status === 'Active' && <button className="text-sm text-yellow hover:text-yellow/80 transition-colors">
                      Pause
                    </button>}
                  
                  {campaign.status === 'Draft' && <button className="text-sm text-yellow hover:text-yellow/80 transition-colors">
                      Edit
                    </button>}
                </div>
              </div> : <div key={campaign.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-yellow/30 transition-all duration-300">
                <div className="p-4 flex flex-col md:flex-row md:items-center">
                  <div className="flex-1 mb-3 md:mb-0">
                    <div className="flex items-center">
                      <h3 className="font-medium">{campaign.name}</h3>
                      <span className={`ml-2 text-xs ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {campaign.platform} · {formatDate(campaign.date)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div className="flex items-center mb-2 md:mb-0">
                      <User size={14} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">{campaign.leads} Leads</span>
                    </div>
                    
                    <div className="flex items-center mb-2 md:mb-0">
                      <MessageSquare size={14} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">{campaign.messagesDelivered} Messages</span>
                    </div>
                    
                    {campaign.status !== 'Draft' && <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{campaign.progress}%</span>
                        <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-yellow rounded-full transition-all duration-500" style={{
                  width: `${campaign.progress}%`
                }}></div>
                        </div>
                      </div>}
                    
                    <div className="mt-3 md:mt-0 ml-auto flex items-center space-x-2">
                      <button className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded border border-border">
                        View
                      </button>
                      
                      {campaign.status === 'Active' && <button className="px-3 py-1 text-xs text-yellow hover:text-yellow/80 transition-colors rounded border border-yellow/30">
                          Pause
                        </button>}
                      
                      {campaign.status === 'Draft' && <button className="px-3 py-1 text-xs text-yellow hover:text-yellow/80 transition-colors rounded border border-yellow/30">
                          Edit
                        </button>}
                    </div>
                  </div>
                </div>
              </div>)}
        </div>}
      
      {/* Empty State */}
      {filteredCampaigns.length === 0 && !showCampaignCreation && <div className="flex flex-col items-center justify-center py-12 text-center">
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
        </div>}
    </div>;
};

export default Campaigns;
