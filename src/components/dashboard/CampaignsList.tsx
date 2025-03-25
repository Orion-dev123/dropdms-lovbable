
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

// Sample data for campaigns
const campaigns = [
  {
    id: 1,
    name: 'Summer Outreach',
    platform: 'Instagram',
    sent: 67,
    total: 100,
    status: 'Running',
    progress: 67,
  },
  {
    id: 2,
    name: 'Product Launch',
    platform: 'LinkedIn',
    sent: 120,
    total: 120,
    status: 'Completed',
    progress: 100,
  },
  {
    id: 3,
    name: 'Feedback Collection',
    platform: 'Twitter',
    sent: 0,
    total: 50,
    status: 'Failed',
    progress: 0,
  },
  {
    id: 4,
    name: 'Influencer Outreach',
    platform: 'Instagram',
    sent: 32,
    total: 75,
    status: 'Running',
    progress: 43,
  },
];

// Helper function to determine status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Running':
      return 'text-yellow';
    case 'Completed':
      return 'text-green-500';
    case 'Failed':
      return 'text-red-500';
    default:
      return 'text-muted-foreground';
  }
};

const CampaignsList = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <h3 className="font-medium">Active Campaigns</h3>
        <button className="text-sm text-yellow hover:underline">View All</button>
      </div>
      
      <div className="divide-y divide-border">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-4 hover:bg-secondary/30 transition-colors duration-200">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-medium">{campaign.name}</h4>
                <p className="text-sm text-muted-foreground">{campaign.platform}</p>
              </div>
              
              <div className="flex items-center">
                <span className={`text-sm ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
                <button className="ml-2 p-1 rounded-md hover:bg-secondary transition-colors">
                  <MoreHorizontal size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{campaign.sent} / {campaign.total}</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow rounded-full transition-all duration-500"
                  style={{ width: `${campaign.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignsList;
