
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import { LayoutGrid, Instagram, Twitter, Facebook, Linkedin, Plus } from 'lucide-react';

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

// Status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"><span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500"></span>Active</span>;
    case 'pending':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"><span className="mr-1 h-1.5 w-1.5 rounded-full bg-yellow-500"></span>Pending</span>;
    case 'inactive':
    default:
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"><span className="mr-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>Inactive</span>;
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
    <div className="p-6 space-y-6">
      {/* Navbar and +New Account */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="w-full md:w-auto">
          <Tabs defaultValue="all" value={selectedTab} onValueChange={v => setSelectedTab(v as PlatformType)}>
            <TabsList className="rounded-2xl bg-muted px-2 py-1 h-12 space-x-1">
              {socialPlatforms.map(platform => (
                <TabsTrigger
                  key={platform.id}
                  value={platform.id}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-black data-[state=active]:text-yellow"
                >
                  {platform.icon && <platform.icon size={18} className="mr-1" />}
                  <span>{platform.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <Button className="gap-2 bg-yellow text-yellow-foreground hover:bg-yellow/90 ml-auto" onClick={() => setIsDialogOpen(true)}>
          <Plus size={18} /> New Account
        </Button>
      </div>

      {/* Profiles display section (All, Instagram, etc tabs) */}
      {selectedTab !== 'proxy-profiles' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.length === 0 && <p className="col-span-full text-muted-foreground">No profiles available.</p>}
          {filteredProfiles.map(profile => {
            const PlatformIcon = profile.icon;
            return (
              <Card key={profile.id} className="overflow-hidden border hover:shadow-md transition-shadow bg-card">
                <CardHeader className="pb-2 flex-row flex items-center gap-2">
                  {PlatformIcon && <PlatformIcon size={22} />}
                  <CardTitle className="text-lg font-semibold">{profile.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{profile.description}</p>
                  <div className="flex items-center mt-2 gap-6">
                    <span className="text-xs font-medium">{profile.platformName}</span>
                    {getStatusBadge(profile.status)}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        // Proxy Profiles Tab Content
        <div>
          <h3 className="mb-2 text-lg font-medium">Available Proxy Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProxyProfiles.length === 0 && <p className="col-span-full text-muted-foreground">No proxy profiles available.</p>}
            {mockProxyProfiles.map(proxy => (
              <Card key={proxy.id} className="overflow-hidden border hover:shadow-md transition-shadow relative bg-card">
                <CardHeader className="pb-2 flex-row flex items-center gap-2">
                  <CardTitle className="text-base font-semibold">{proxy.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    <div>Location: {proxy.location}</div>
                    <div>OS: {proxy.os}</div>
                    <div>Browser: {proxy.browser}</div>
                    <div>IP: {proxy.ipAddress}:{proxy.port}</div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex h-2 w-2 rounded-full ${proxy.active ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                    {proxy.active ? "Active" : "Inactive"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* New Account Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Social Account</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new social account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Account name"
              value={newAccount.name}
              onChange={e => setNewAccount(n => ({ ...n, name: e.target.value }))}
            />
            <div>
              <label className="block text-sm mb-1">Platform</label>
              <select
                className="w-full border bg-background rounded px-3 py-2"
                value={newAccount.platform}
                onChange={e => setNewAccount(n => ({ ...n, platform: e.target.value }))}
              >
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            <Input
              placeholder="API Key (optional)"
              value={newAccount.apiKey}
              onChange={e => setNewAccount(n => ({ ...n, apiKey: e.target.value }))}
            />
            <div>
              <label className="block text-sm mb-1">Proxy Profile (optional)</label>
              <select
                className="w-full border bg-background rounded px-3 py-2"
                value={newAccount.proxyProfileId}
                onChange={e => setNewAccount(n => ({ ...n, proxyProfileId: e.target.value }))}
              >
                <option value="">None</option>
                {mockProxyProfiles.map(proxy => (
                  <option key={proxy.id} value={proxy.id}>{proxy.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button onClick={handleCreateAccount} className="bg-yellow text-yellow-foreground hover:bg-yellow/90">Create</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialProfiles;
