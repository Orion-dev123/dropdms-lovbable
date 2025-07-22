
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";

import { LayoutGrid, Instagram, Twitter, Facebook, Linkedin, Plus, Star, Users, Activity, Globe } from 'lucide-react';

// Social platforms tab config
const socialPlatforms = [
  { id: 'all', name: 'All Profiles', icon: null },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'twitter', name: 'Twitter', icon: Twitter },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  { id: 'proxy-profiles', name: 'Proxy Profiles', icon: null },
];

// Social Profiles mock
const mockProfiles = [
  {
    id: '1',
    platform: 'instagram',
    platformName: 'Instagram',
    icon: Instagram,
    username: 'design_masters',
    description: 'Digital design and UI/UX inspiration',
    status: 'active',
    name: 'Design Masters'
  },
  {
    id: '2',
    platform: 'twitter',
    platformName: 'Twitter',
    icon: Twitter,
    username: 'tech_updates',
    description: 'Latest tech news and updates',
    status: 'active',
    name: 'Tech Updates'
  },
  {
    id: '3',
    platform: 'linkedin',
    platformName: 'LinkedIn',
    icon: Linkedin,
    username: 'professional_network',
    description: 'Professional networking and business insights',
    status: 'pending',
    name: 'Professional Network'
  }
];

// Proxy Profiles mock (copied from ProxyProfiles for integration)
const mockProxyProfiles = [
  {
    id: 1,
    name: 'US Marketing Profile',
    location: 'New York, US',
    os: 'Windows',
    browser: 'Chrome',
    active: true,
    ipAddress: '192.168.1.1',
    port: 8080,
  },
  {
    id: 2,
    name: 'UK Research Team',
    location: 'London, UK',
    os: 'MacOS',
    browser: 'Firefox',
    active: true,
    ipAddress: '192.168.2.2',
    port: 1080,
  },
  {
    id: 3,
    name: 'Asia Pacific Sales',
    location: 'Singapore',
    os: 'Linux',
    browser: 'Chrome',
    active: false,
    ipAddress: '192.168.3.3',
    port: 1080,
  }
];

// Status badge with enhanced styling
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse"></div>
          Active
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow/20 text-yellow border-yellow/30 hover:bg-yellow/30 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow mr-1.5"></div>
          Pending
        </Badge>
      );
    case 'inactive':
    default:
      return (
        <Badge variant="secondary" className="bg-muted/50 text-muted-foreground border-muted hover:bg-muted transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-1.5"></div>
          Inactive
        </Badge>
      );
  }
};

type PlatformType = 'all' | 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'proxy-profiles';

const SocialProfiles = () => {
  const [selectedTab, setSelectedTab] = useState<PlatformType>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    platform: 'instagram',
    apiKey: '',
    proxyProfileId: ''
  });
  const { toast } = useToast();

  // Filtering logic for each platform tab
  const filteredProfiles =
    selectedTab === 'all'
      ? mockProfiles
      : selectedTab === 'proxy-profiles'
        ? []
        : mockProfiles.filter(profile => profile.platform === selectedTab);

  // Handler for new account dialog submission
  const handleCreateAccount = () => {
    if (!newAccount.name) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    // For demo, just show toast and close
    toast({ title: "Account created!", description: `${newAccount.name} (${newAccount.platform}) added.` });
    setIsDialogOpen(false);
    setNewAccount({ name: '', platform: 'instagram', apiKey: '', proxyProfileId: '' });
  };

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-yellow/10 border border-yellow/20">
            <Globe className="w-8 h-8 text-yellow" />
          </div>
          <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Social Profiles
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage and monitor your social media accounts across multiple platforms with advanced analytics and automation
        </p>
      </div>

      {/* Enhanced Navbar and +New Account */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="w-full lg:w-auto">
          <Tabs defaultValue="all" value={selectedTab} onValueChange={v => setSelectedTab(v as PlatformType)}>
            <TabsList className="glass-morphism rounded-2xl p-1.5 h-14 gap-1 overflow-x-auto">
              {socialPlatforms.map(platform => (
                <TabsTrigger
                  key={platform.id}
                  value={platform.id}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 data-[state=active]:bg-yellow data-[state=active]:text-yellow-foreground data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-muted/50 whitespace-nowrap"
                >
                  {platform.icon && <platform.icon size={18} />}
                  <span>{platform.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <Button 
          className="gap-3 bg-yellow text-yellow-foreground hover:bg-yellow/90 px-6 py-3 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium" 
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus size={20} /> 
          <span>New Account</span>
        </Button>
      </div>

      {/* Enhanced Profiles Display */}
      {selectedTab !== 'proxy-profiles' ? (
        <div className="space-y-6">
          {filteredProfiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">No profiles available for this platform</p>
              <p className="text-sm text-muted-foreground/60">Add your first social account to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProfiles.map(profile => {
                const PlatformIcon = profile.icon;
                return (
                  <Card key={profile.id} className="group relative overflow-hidden backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-[1.02] hover:bg-black/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <CardHeader className="relative z-10 pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        {PlatformIcon && (
                          <div className="p-2.5 rounded-xl bg-gradient-to-br from-yellow/20 to-yellow/10 border border-yellow/20 group-hover:scale-110 transition-transform duration-300">
                            <PlatformIcon size={24} className="text-yellow" />
                          </div>
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-gradient">{profile.name}</CardTitle>
                          <p className="text-sm text-yellow/80 font-medium">@{profile.username}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow" />
                          <span className="text-sm font-medium text-yellow">4.8</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{profile.description}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-yellow/30 text-yellow/80">
                            {profile.platformName}
                          </Badge>
                        </div>
                        {getStatusBadge(profile.status)}
                      </div>
                      
                      <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>2.4k</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          <span>89%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        // Enhanced Proxy Profiles Tab Content
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gradient mb-2">Available Proxy Profiles</h3>
            <p className="text-muted-foreground">Manage your proxy configurations for enhanced privacy and geo-targeting</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProxyProfiles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">No proxy profiles available</p>
              </div>
            ) : (
              mockProxyProfiles.map(proxy => (
                <Card key={proxy.id} className="group relative overflow-hidden backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-[1.02] hover:bg-black/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Globe className="w-6 h-6 text-blue-400" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gradient flex-1">{proxy.name}</CardTitle>
                      <div className={`w-3 h-3 rounded-full ${proxy.active ? 'bg-green-500' : 'bg-red-500'} ${proxy.active ? 'animate-pulse' : ''}`} />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-yellow"></span>
                          <span>Location</span>
                        </div>
                        <p className="font-medium text-foreground">{proxy.location}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-yellow"></span>
                          <span>OS</span>
                        </div>
                        <p className="font-medium text-foreground">{proxy.os}</p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Browser:</span>
                        <span className="font-medium">{proxy.browser}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Endpoint:</span>
                        <span className="font-mono text-xs bg-muted/30 px-2 py-1 rounded">{proxy.ipAddress}:{proxy.port}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3">
                      <Badge className={`${proxy.active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                        {proxy.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* Enhanced New Account Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg backdrop-blur-xl bg-black/60 border border-white/20 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)]">
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-yellow/20 border border-yellow/30">
                <Plus className="w-6 h-6 text-yellow" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gradient">Add New Social Account</DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  Connect your social media account with advanced configuration options.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Account Name</label>
              <Input
                placeholder="Enter a memorable name for this account"
                value={newAccount.name}
                onChange={e => setNewAccount(n => ({ ...n, name: e.target.value }))}
                className="bg-black/40 border-white/20 focus:border-yellow/50 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Platform</label>
              <select
                className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2.5 text-foreground focus:border-yellow/50 focus:outline-none transition-colors"
                value={newAccount.platform}
                onChange={e => setNewAccount(n => ({ ...n, platform: e.target.value }))}
              >
                <option value="instagram">📸 Instagram</option>
                <option value="twitter">🐦 Twitter</option>
                <option value="facebook">📘 Facebook</option>
                <option value="linkedin">💼 LinkedIn</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">API Key <span className="text-muted-foreground">(Optional)</span></label>
              <Input
                placeholder="Your platform API key for advanced features"
                type="password"
                value={newAccount.apiKey}
                onChange={e => setNewAccount(n => ({ ...n, apiKey: e.target.value }))}
                className="bg-black/40 border-white/20 focus:border-yellow/50 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Proxy Profile <span className="text-muted-foreground">(Optional)</span></label>
              <select
                className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2.5 text-foreground focus:border-yellow/50 focus:outline-none transition-colors"
                value={newAccount.proxyProfileId}
                onChange={e => setNewAccount(n => ({ ...n, proxyProfileId: e.target.value }))}
              >
                <option value="">🌐 No proxy configuration</option>
                {mockProxyProfiles.map(proxy => (
                  <option key={proxy.id} value={proxy.id}>🔒 {proxy.name} ({proxy.location})</option>
                ))}
              </select>
            </div>
          </div>
          
          <DialogFooter className="gap-3 pt-4 border-t border-white/10">
            <DialogClose asChild>
              <Button variant="outline" className="border-white/20 hover:bg-muted/50">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              onClick={handleCreateAccount} 
              className="bg-yellow text-yellow-foreground hover:bg-yellow/90 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialProfiles;
