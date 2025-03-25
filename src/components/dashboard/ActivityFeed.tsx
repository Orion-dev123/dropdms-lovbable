
import React from 'react';
import { Calendar, UserPlus, AlertTriangle, SendHorizontal, LogIn } from 'lucide-react';

// Activity type definition
type ActivityType = 'import' | 'campaign' | 'error' | 'message' | 'login';

// Sample activity data
const activities = [
  {
    id: 1,
    type: 'import' as ActivityType,
    message: 'Imported 35 new leads from CSV',
    time: '10 min ago',
  },
  {
    id: 2,
    type: 'campaign' as ActivityType,
    message: 'Created new campaign "Summer Outreach"',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'error' as ActivityType,
    message: 'Failed to send messages to 3 users',
    time: '2 hours ago',
  },
  {
    id: 4,
    type: 'message' as ActivityType,
    message: 'Scheduled 50 messages for tomorrow',
    time: '3 hours ago',
  },
  {
    id: 5,
    type: 'login' as ActivityType,
    message: 'New login from Chrome on Mac',
    time: '5 hours ago',
  },
];

// Activity icon mapping
const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'import':
      return <UserPlus size={16} />;
    case 'campaign':
      return <Calendar size={16} />;
    case 'error':
      return <AlertTriangle size={16} />;
    case 'message':
      return <SendHorizontal size={16} />;
    case 'login':
      return <LogIn size={16} />;
  }
};

// Activity icon background color
const getActivityIconClass = (type: ActivityType) => {
  switch (type) {
    case 'import':
      return 'bg-blue-500/10 text-blue-500';
    case 'campaign':
      return 'bg-yellow/10 text-yellow';
    case 'error':
      return 'bg-red-500/10 text-red-500';
    case 'message':
      return 'bg-green-500/10 text-green-500';
    case 'login':
      return 'bg-purple-500/10 text-purple-500';
  }
};

const ActivityFeed = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <h3 className="font-medium">Recent Activity</h3>
        <button className="text-sm text-yellow hover:underline">View All</button>
      </div>
      
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-secondary/30 transition-colors duration-200">
            <div className="flex items-start">
              <div className={`p-2 rounded-md mr-3 ${getActivityIconClass(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
