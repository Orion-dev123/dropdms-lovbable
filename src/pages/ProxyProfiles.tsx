import React, { useState } from 'react';
import { Search, Plus, ChevronRight, Chrome, Monitor, Shield, Server, Settings, Eye, Network } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProxyDetails from '@/components/proxy/ProxyDetails';
import NewProxyForm from '@/components/proxy/NewProxyForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const proxyTypes = {
  HTTP: 'bg-blue-500/20 text-blue-400',
  SOCKS4: 'bg-purple-500/20 text-purple-400',
  SOCKS5: 'bg-green-500/20 text-green-400'
};

const osPlatforms = {
  Windows: { name: 'Windows', icon: 'windows' },
  MacOS: { name: 'MacOS', icon: 'apple' },
  Linux: { name: 'Linux', icon: 'linux' }
};

const getBrowserIcon = (browser) => {
  switch(browser) {
    case 'Chrome': return <Chrome size={16} />;
    case 'Firefox': return <Monitor size={16} />;
    case 'Edge': return <Monitor size={16} />;
    default: return <Chrome size={16} />;
  }
};

const sampleProxies = [
  {
    id: 1,
    name: 'US Marketing Profile',
    type: 'HTTP',
    location: 'New York, US',
    os: 'Windows',
    browser: 'Chrome',
    version: '120',
    active: true,
    responseTime: 320,
    uptime: 99.8,
    ipAddress: '192.168.1.1',
    port: 8080,
    lastUsed: '2023-08-29T14:22:00Z'
  },
  {
    id: 2,
    name: 'UK Research Team',
    type: 'SOCKS5',
    location: 'London, UK',
    os: 'MacOS',
    browser: 'Firefox',
    version: '119',
    active: true,
    responseTime: 280,
    uptime: 99.9,
    ipAddress: '192.168.2.2',
    port: 1080,
    lastUsed: '2023-08-30T09:15:00Z'
  },
  {
    id: 3,
    name: 'Asia Pacific Sales',
    type: 'SOCKS4',
    location: 'Singapore',
    os: 'Linux',
    browser: 'Chrome',
    version: '118',
    active: false,
    responseTime: 450,
    uptime: 97.2,
    ipAddress: '192.168.3.3',
    port: 1080,
    lastUsed: '2023-08-28T11:40:00Z'
  },
  {
    id: 4,
    name: 'Europe Support',
    type: 'HTTP',
    location: 'Berlin, DE',
    os: 'Windows',
    browser: 'Edge',
    version: '120',
    active: true,
    responseTime: 310,
    uptime: 99.5,
    ipAddress: '192.168.4.4',
    port: 8080,
    lastUsed: '2023-08-30T15:10:00Z'
  },
  {
    id: 5,
    name: 'South America Team',
    type: 'SOCKS5',
    location: 'Sao Paulo, BR',
    os: 'MacOS',
    browser: 'Chrome',
    version: '119',
    active: false,
    responseTime: 520,
    uptime: 96.8,
    ipAddress: '192.168.5.5',
    port: 1080,
    lastUsed: '2023-08-27T18:30:00Z'
  }
];

const ProxyProfiles = () => {
  const [selectedProxy, setSelectedProxy] = useState(sampleProxies[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredProxies = sampleProxies.filter(proxy => {
    const matchesSearch = proxy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proxy.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proxy.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && proxy.active) ||
      (statusFilter === 'inactive' && !proxy.active);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search profiles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow text-yellow-foreground hover:bg-yellow/90">
              <Plus className="mr-2 h-4 w-4" /> New Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Proxy Profile</DialogTitle>
              <DialogDescription>
                Configure your proxy settings, browser fingerprint, and location preferences.
              </DialogDescription>
            </DialogHeader>
            <NewProxyForm onClose={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {filteredProxies.map((proxy) => (
          <div 
            key={proxy.id}
            className={`
              p-4 rounded-lg border border-border bg-card hover:bg-card/80 cursor-pointer
              transition-all duration-200 relative overflow-hidden
              ${selectedProxy.id === proxy.id ? 'ring-1 ring-gray-500 bg-gray-100/10 dark:bg-gray-800/30' : ''}
            `}
            onClick={() => setSelectedProxy(proxy)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{proxy.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${proxyTypes[proxy.type]}`}>
                    {proxy.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{proxy.location}</span>
                </div>
                <div className="flex items-center mt-2 text-xs text-muted-foreground space-x-3">
                  <span className="flex items-center space-x-1">
                    <Shield size={14} />
                    <span>{proxy.os}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    {getBrowserIcon(proxy.browser)}
                    <span>{proxy.browser} {proxy.version}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Server size={14} />
                    <span>{proxy.ipAddress}:{proxy.port}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Settings size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Network size={14} />
                  </Button>
                </div>
                <span className={`inline-flex h-2 w-2 rounded-full ${proxy.active ? 'bg-green-500' : 'bg-red-500'}`} />
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            </div>
            <div className={`absolute h-full w-1 left-0 top-0 ${proxy.active ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProxyProfiles;
