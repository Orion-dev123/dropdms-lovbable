import React from 'react';
import { Edit, Calendar, Clock, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define campaign status types
export type CampaignStatus = 'Scheduled' | 'Ongoing' | 'Paused' | 'Completed';

// Extend the campaign data type to include the new status types and other properties
export type Campaign = {
  id: number;
  name: string;
  platform: string;
  progress: number;
  leads: number;
  messagesDelivered: number;
  status: CampaignStatus;
  date: string;
  startTime?: string;
  endTime?: string;
  owner?: string;
};

// Status color helpers
export const getStatusColor = (status: CampaignStatus) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'Ongoing':
      return 'bg-yellow/10 text-yellow border-yellow/20';
    case 'Paused':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'Completed':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    default:
      return 'text-muted-foreground';
  }
};

// Format date helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Campaign Card component
const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 cursor-grab hover:border-border/80 transition-all duration-200 group shadow-sm"
      draggable
    >
      {/* Header Section */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h4 className="font-semibold text-card-foreground text-sm leading-tight flex-1">{campaign.name}</h4>
        <Badge className={cn("text-xs px-2 py-0.5 flex-shrink-0 font-medium", getStatusColor(campaign.status))}>
          {campaign.status}
        </Badge>
      </div>
      
      {/* Platform Information */}
      <p className="text-sm text-muted-foreground font-medium mb-3">
        {campaign.platform}
      </p>
      
      {/* Schedule Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar size={14} className="mr-2 flex-shrink-0" />
          <span>{formatDate(campaign.date)}</span>
        </div>
        
        {(campaign.startTime || campaign.endTime) && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock size={14} className="mr-2 flex-shrink-0" />
            <span>
              {campaign.startTime || "--"} 
              {campaign.endTime && campaign.startTime && " - "} 
              {campaign.endTime || ""}
            </span>
          </div>
        )}
        
        {campaign.owner && (
          <div className="flex items-center text-xs text-muted-foreground">
            <User size={14} className="mr-2 flex-shrink-0" />
            <span>{campaign.owner}</span>
          </div>
        )}
      </div>
      
      {/* Performance Metrics (for non-scheduled campaigns) */}
      {campaign.status !== 'Scheduled' && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{campaign.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300" 
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{campaign.messagesDelivered}/{campaign.leads} sent</span>
            <span>{campaign.leads} leads</span>
          </div>
        </div>
      )}
      
      {/* Interactive Elements */}
      <button className="mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit size={12} className="mr-1.5" />
        Edit Campaign
      </button>
    </div>
  );
};

// KanbanColumn component
const KanbanColumn = ({ status, campaigns }: { status: CampaignStatus; campaigns: Campaign[] }) => {
  return (
    <div className="bg-secondary/30 border border-border rounded-lg p-4 min-w-[320px] flex-shrink-0 flex flex-col h-fit">
      {/* Column Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <span>{status}</span>
          <Badge variant="secondary" className="text-xs font-medium">
            {campaigns.length}
          </Badge>
        </h3>
        <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </button>
      </div>
      
      {/* Cards Container */}
      <div className="flex-1 space-y-3 min-h-[100px]">
        {campaigns.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-muted-foreground text-sm border-2 border-dashed border-border rounded-lg">
            No campaigns
          </div>
        ) : (
          campaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))
        )}
      </div>
      
      {/* Add Card Button */}
      <button className="w-full mt-4 p-3 bg-transparent border border-dashed border-border hover:border-muted-foreground rounded-lg text-muted-foreground hover:text-foreground font-medium cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:bg-muted/50 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        Add Campaign
      </button>
    </div>
  );
};

// KanbanBoard component
const KanbanBoard = ({ campaigns }: { campaigns: Campaign[] }) => {
  // Group campaigns by status
  const campaignsByStatus: Record<CampaignStatus, Campaign[]> = {
    'Scheduled': [],
    'Ongoing': [],
    'Paused': [],
    'Completed': []
  };
  
  campaigns.forEach(campaign => {
    if (campaign.status in campaignsByStatus) {
      campaignsByStatus[campaign.status].push(campaign);
    }
  });
  
  return (
    <div className="w-full">
      {/* Mobile: Stack columns vertically */}
      <div className="block lg:hidden space-y-6">
        {Object.entries(campaignsByStatus).map(([status, statusCampaigns]) => (
          <KanbanColumn 
            key={status} 
            status={status as CampaignStatus} 
            campaigns={statusCampaigns} 
          />
        ))}
      </div>
      
      {/* Desktop: Horizontal layout */}
      <div className="hidden lg:flex gap-6 w-full overflow-x-auto pb-4 min-h-[600px]">
        {Object.entries(campaignsByStatus).map(([status, statusCampaigns]) => (
          <KanbanColumn 
            key={status} 
            status={status as CampaignStatus} 
            campaigns={statusCampaigns} 
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
