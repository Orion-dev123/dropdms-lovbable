
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Send, 
  Inbox, 
  Settings, 
  Globe
} from 'lucide-react';

const sidebarItems = [
  { 
    path: '/', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    exact: true
  },
  { 
    path: '/leads', 
    icon: Users, 
    label: 'Leads'
  },
  { 
    path: '/campaigns', 
    icon: Send, 
    label: 'Campaigns'
  },
  { 
    path: '/automation', 
    icon: Inbox, 
    label: 'Inbox'
  },
  { 
    path: '/proxy-profiles', 
    icon: Globe, 
    label: 'Proxy Profiles'
  },
  { 
    path: '/settings', 
    icon: Settings, 
    label: 'Settings'
  }
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-[65px] bg-card border-r border-border z-40 flex flex-col items-center py-6">
      <div className="mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow text-black font-bold">
          D
        </div>
      </div>
      
      <nav className="flex flex-col items-center space-y-6 flex-1">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `hover-tooltip relative w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 ${
                isActive 
                  ? 'bg-secondary text-yellow' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`
            }
          >
            <item.icon size={20} />
            <span className="tooltip">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
