
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
      return 'bg-emerald-900/20 text-emerald-400 border-emerald-700/30';
    case 'Ongoing':
      return 'bg-amber-900/20 text-amber-400 border-amber-700/30';
    case 'Paused':
      return 'bg-orange-900/20 text-orange-400 border-orange-700/30';
    case 'Completed':
      return 'bg-violet-900/20 text-violet-400 border-violet-700/30';
    default:
      return 'text-zinc-400';
  }
};

// Column color helpers
export const getColumnColor = (status: CampaignStatus) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-zinc-900/50';
    case 'Ongoing':
      return 'bg-zinc-800/50';
    case 'Paused':
      return 'bg-zinc-700/50';
    case 'Completed':
      return 'bg-zinc-600/50';
    default:
      return 'bg-zinc-900';
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
      className="bg-zinc-900/60 rounded-lg p-3 mb-2 cursor-move hover:bg-zinc-800/60 transition-all duration-200 group"
      draggable
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-zinc-100 text-sm">{campaign.name}</h4>
        <Badge className={cn("text-xs px-2 py-0.5", getStatusColor(campaign.status))}>
          {campaign.status}
        </Badge>
      </div>
      
      <p className="text-xs text-zinc-400 mb-3">
        {campaign.platform}
      </p>
      
      <div className="space-y-1.5">
        <div className="flex items-center text-xs text-zinc-400">
          <Calendar size={12} className="mr-1.5" />
          <span>{formatDate(campaign.date)}</span>
        </div>
        
        {(campaign.startTime || campaign.endTime) && (
          <div className="flex items-center text-xs text-zinc-400">
            <Clock size={12} className="mr-1.5" />
            <span>
              {campaign.startTime || "--"} 
              {campaign.endTime && campaign.startTime && " - "} 
              {campaign.endTime || ""}
            </span>
          </div>
        )}
        
        {campaign.owner && (
          <div className="flex items-center text-xs text-zinc-400">
            <User size={12} className="mr-1.5" />
            <span>{campaign.owner}</span>
          </div>
        )}
      </div>
      
      {campaign.status !== 'Scheduled' && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-zinc-500 mb-1">
            <span>Progress</span>
            <span>{campaign.progress}%</span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 rounded-full transition-all duration-500" 
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
        </div>
      )}
      
      <button className="mt-3 text-xs text-yellow-500 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Pencil size={10} className="mr-1" />
        Edit
      </button>
    </div>
  );
};

// KanbanColumn component
const KanbanColumn = ({ status, campaigns }: { status: CampaignStatus; campaigns: Campaign[] }) => {
  return (
    <div className={cn("rounded-lg p-3", getColumnColor(status))}>
      <div className="mb-3">
        <h3 className="font-medium text-zinc-200 text-sm">{status}</h3>
        <p className="text-xs text-zinc-400">{campaigns.length} campaign(s)</p>
      </div>
      
      <div className="space-y-1">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
