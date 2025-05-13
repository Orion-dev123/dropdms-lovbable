
import React from 'react';
import { Pencil, Calendar, Clock, User } from 'lucide-react';
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
      return 'bg-[#F2FCE2] text-green-700 border-green-200';
    case 'Ongoing':
      return 'bg-[#FEF7CD] text-yellow-700 border-yellow-200';
    case 'Paused':
      return 'bg-[#FEC6A1] text-orange-700 border-orange-200';
    case 'Completed':
      return 'bg-[#E5DEFF] text-purple-700 border-purple-200';
    default:
      return 'text-muted-foreground';
  }
};

// Column color helpers
export const getColumnColor = (status: CampaignStatus) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-[#F2FCE2]/30 border-green-200';
    case 'Ongoing':
      return 'bg-[#FEF7CD]/30 border-yellow-200';
    case 'Paused':
      return 'bg-[#FEC6A1]/30 border-orange-200';
    case 'Completed':
      return 'bg-[#E5DEFF]/30 border-purple-200';
    default:
      return 'bg-card';
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
      className="bg-card border border-border rounded-lg shadow-sm p-4 mb-3 cursor-move hover:border-yellow/50 transition-all duration-200"
      draggable
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{campaign.name}</h4>
        <Badge className={cn("text-xs", getStatusColor(campaign.status))}>
          {campaign.status}
        </Badge>
      </div>
      
      <p className="text-xs text-muted-foreground mb-3">
        {campaign.platform}
      </p>
      
      <div className="space-y-2 mt-3">
        <div className="flex items-center text-xs">
          <Calendar size={14} className="mr-2 text-muted-foreground" />
          <span>{formatDate(campaign.date)}</span>
        </div>
        
        {(campaign.startTime || campaign.endTime) && (
          <div className="flex items-center text-xs">
            <Clock size={14} className="mr-2 text-muted-foreground" />
            <span>
              {campaign.startTime || "--"} 
              {campaign.endTime && campaign.startTime && " - "} 
              {campaign.endTime || ""}
            </span>
          </div>
        )}
        
        {campaign.owner && (
          <div className="flex items-center text-xs">
            <User size={14} className="mr-2 text-muted-foreground" />
            <span>{campaign.owner}</span>
          </div>
        )}
      </div>
      
      {campaign.status !== 'Scheduled' && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{campaign.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow rounded-full transition-all duration-500" 
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
        </div>
      )}
      
      <button className="mt-3 text-xs text-yellow flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Pencil size={12} className="mr-1" />
        Edit
      </button>
    </div>
  );
};

// KanbanColumn component
const KanbanColumn = ({ status, campaigns }: { status: CampaignStatus; campaigns: Campaign[] }) => {
  return (
    <div className={cn("p-3 rounded-lg border", getColumnColor(status))}>
      <div className="mb-3 px-2">
        <h3 className="font-medium">{status}</h3>
        <p className="text-xs text-muted-foreground">{campaigns.length} campaign(s)</p>
      </div>
      
      <div className="space-y-2">
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(campaignsByStatus).map(([status, statusCampaigns]) => (
        <KanbanColumn 
          key={status} 
          status={status as CampaignStatus} 
          campaigns={statusCampaigns} 
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
