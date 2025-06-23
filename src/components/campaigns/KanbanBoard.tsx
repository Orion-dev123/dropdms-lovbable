
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
      return 'bg-[#1c1c1c]';
    case 'Ongoing':
      return 'bg-[#1c1c1c]';
    case 'Paused':
      return 'bg-[#1c1c1c]';
    case 'Completed':
      return 'bg-[#1c1c1c]';
    default:
      return 'bg-[#1c1c1c]';
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
      className="bg-[#282828] rounded-lg p-5 cursor-grab hover:border-[#555] transition-all duration-200 group border border-[#3a3a3a]"
      draggable
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-[#e0e0e0] text-lg leading-tight flex-1 pr-2">{campaign.name}</h4>
        <Badge className={cn("text-xs px-2 py-0.5 flex-shrink-0", getStatusColor(campaign.status))}>
          {campaign.status}
        </Badge>
      </div>
      
      {/* Platform Information */}
      <p className="text-sm text-[#a0a0a0] font-medium">
        {campaign.platform}
      </p>
      
      {/* Schedule Details */}
      <div className="space-y-2">
        <div className="flex items-center text-sm text-[#a0a0a0]">
          <Calendar size={16} className="mr-2 flex-shrink-0" />
          <span>{formatDate(campaign.date)}</span>
        </div>
        
        {(campaign.startTime || campaign.endTime) && (
          <div className="flex items-center text-sm text-[#a0a0a0]">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span>
              {campaign.startTime || "--"} 
              {campaign.endTime && campaign.startTime && " - "} 
              {campaign.endTime || ""}
            </span>
          </div>
        )}
        
        {campaign.owner && (
          <div className="flex items-center text-sm text-[#a0a0a0]">
            <User size={16} className="mr-2 flex-shrink-0" />
            <span>{campaign.owner}</span>
          </div>
        )}
      </div>
      
      {/* Performance Metrics (for non-scheduled campaigns) */}
      {campaign.status !== 'Scheduled' && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-[#a0a0a0] mb-1">
            <span>Progress</span>
            <span>{campaign.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#3f3f3f] rounded-sm overflow-hidden">
            <div 
              className="h-full bg-[#e0e0e0] rounded-sm transition-all duration-300" 
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Interactive Elements */}
      <button className="mt-2 text-xs text-[#a0a0a0] hover:text-[#e0e0e0] flex items-center opacity-0 group-hover:opacity-100 transition-opacity self-start">
        <Edit size={10} className="mr-1.5" />
        Edit
      </button>
    </div>
  );
};

// KanbanColumn component
const KanbanColumn = ({ status, campaigns }: { status: CampaignStatus; campaigns: Campaign[] }) => {
  return (
    <div 
      className={cn("rounded-lg p-4 min-w-80 max-w-80", getColumnColor(status))}
      style={{
        flex: '1',
        border: '1px solid #3a3a3a',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Column Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="flex items-center gap-2 font-medium text-sm text-[#a0a0a0]">
          <span>{status}</span>
          <span 
            className="bg-[#3a3a3a] text-[#a0a0a0] text-xs font-semibold px-2 py-1 rounded"
          >
            {campaigns.length}
          </span>
        </h3>
        <button className="text-[#a0a0a0] hover:text-[#e0e0e0] text-lg leading-none">
          …
        </button>
      </div>
      
      {/* Cards Container */}
      <div 
        className="flex-grow min-h-24 transition-colors duration-200"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      
      {/* Add Card Button */}
      <button 
        className="w-full mt-4 p-3 bg-transparent border border-[#3a3a3a] rounded-lg text-[#a0a0a0] font-medium cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#282828] hover:border-[#555] text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        Add new campaign
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
    <div 
      className="flex gap-6 w-full overflow-x-auto pb-4"
      style={{
        minHeight: '600px'
      }}
    >
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
