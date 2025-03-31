import React, { useState } from 'react';
import { UserPlus, Filter, MoreHorizontal, Edit, Send, Trash2, Download, Tag, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Sample leads data
const leadsData = [
  {
    id: 1,
    platform: 'Instagram',
    username: '@johndoe',
    fullName: 'John Doe',
    lastContacted: '2023-09-10T10:30:00',
    status: 'New',
  },
  {
    id: 2,
    platform: 'Twitter',
    username: '@janesmith',
    fullName: 'Jane Smith',
    lastContacted: '2023-09-08T14:45:00',
    status: 'Contacted',
  },
  {
    id: 3,
    platform: 'LinkedIn',
    username: '@robertjohnson',
    fullName: 'Robert Johnson',
    lastContacted: '2023-09-05T09:15:00',
    status: 'Unresponsive',
  },
  {
    id: 4,
    platform: 'Instagram',
    username: '@sarahwilson',
    fullName: 'Sarah Wilson',
    lastContacted: '2023-09-01T16:20:00',
    status: 'Contacted',
  },
  {
    id: 5,
    platform: 'Twitter',
    username: '@michaelbrown',
    fullName: 'Michael Brown',
    lastContacted: null,
    status: 'New',
  },
];

// Helper for status badge colors
const getStatusClass = (status: string) => {
  switch (status) {
    case 'New':
      return 'bg-blue-500/10 text-blue-500';
    case 'Contacted':
      return 'bg-yellow/10 text-yellow';
    case 'Unresponsive':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

// Format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
};

// Get platform icon component
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'Instagram':
      return <Instagram size={16} className="text-pink-500" />;
    case 'Twitter':
      return <Twitter size={16} className="text-blue-400" />;
    case 'LinkedIn':
      return <Linkedin size={16} className="text-blue-700" />;
    default:
      return null;
  }
};

// Get avatar fallback (first letter of full name)
const getAvatarFallback = (name: string) => {
  return name.charAt(0);
};

const Leads = () => {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  
  // Toggle lead selection
  const toggleLeadSelection = (id: number) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };
  
  // Toggle all leads
  const toggleAllLeads = () => {
    if (selectedLeads.length === leadsData.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leadsData.map(lead => lead.id));
    }
  };
  
  return (
    <div className="p-6 animate-fade-in">
      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search leads..."
              className="w-full px-4 py-2 pl-10 bg-card border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Filter size={16} />
            </div>
          </div>
          <Button variant="default" className="flex items-center gap-2">
            <UserPlus size={16} />
            <span>Import Leads</span>
          </Button>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-secondary/70 transition-colors">
            <Download size={16} />
          </button>
          <button className="px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-secondary/70 transition-colors">
            <Tag size={16} />
          </button>
        </div>
      </div>
      
      {/* Leads Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/50 border-b border-border">
              <TableRow>
                <TableHead className="px-6 py-3 text-left">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    checked={selectedLeads.length === leadsData.length}
                    onChange={toggleAllLeads}
                  />
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium">User</TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium">Platform</TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium">Username</TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium">Last Contacted</TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium">Status</TableHead>
                <TableHead className="px-6 py-3 text-right text-sm font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
              {leadsData.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-secondary/30 transition-colors">
                  <TableCell className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-border"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleLeadSelection(lead.id)}
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${lead.id}`} alt={lead.fullName} />
                        <AvatarFallback>{getAvatarFallback(lead.fullName)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{lead.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(lead.platform)}
                      <span>{lead.platform}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">{lead.username}</TableCell>
                  <TableCell className="px-6 py-4 text-sm">{formatDate(lead.lastContacted)}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${getStatusClass(lead.status)}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 rounded hover:bg-secondary transition-colors">
                        <Edit size={16} className="text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-1 rounded hover:bg-secondary transition-colors">
                        <Send size={16} className="text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-1 rounded hover:bg-secondary transition-colors">
                        <Trash2 size={16} className="text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1</span> to <span className="font-medium text-foreground">5</span> of <span className="font-medium text-foreground">5</span> entries
          </p>
          
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-yellow/10 text-yellow border border-yellow/30 rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
