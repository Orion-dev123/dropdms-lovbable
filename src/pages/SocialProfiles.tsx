import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Instagram, Twitter, Facebook, Linkedin, Plus, Trash2, ExternalLink, Check, Globe, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for proxy profiles
const proxyProfiles = [{
  id: '1',
  name: 'United States',
  location: 'US'
}, {
  id: '2',
  name: 'Europe',
  location: 'EU'
}, {
  id: '3',
  name: 'Asia',
  location: 'ASIA'
}, {
  id: '4',
  name: 'Germany',
  location: 'DE'
}, {
  id: '5',
  name: 'France',
  location: 'FR'
}, {
  id: '6',
  name: 'United Kingdom',
  location: 'UK'
}];

// Schema for form validation
const socialProfileSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  username: z.string().min(1, "Username is required"),
  apiKey: z.string().min(1, "API key is required"),
  proxyProfileId: z.string().min(1, "Proxy profile is required")
});
type SocialProfileFormValues = z.infer<typeof socialProfileSchema>;

// Social platform options with icons
const socialPlatforms = [{
  id: 'instagram',
  name: 'Instagram',
  icon: Instagram
}, {
  id: 'twitter',
  name: 'Twitter',
  icon: Twitter
}, {
  id: 'facebook',
  name: 'Facebook',
  icon: Facebook
}, {
  id: 'linkedin',
  name: 'LinkedIn',
  icon: Linkedin
}];

// Mock data for pre-populated social profiles
const mockProfiles = [{
  id: '1',
  platform: 'instagram',
  platformName: 'Instagram',
  icon: Instagram,
  username: 'design_masters',
  apiKey: 'insta123456789',
  proxyProfileId: '1',
  proxyProfileName: 'United States',
  stats: {
    followers: 5678,
    following: 234,
    posts: 127
  },
  status: 'active',
  lastUpdated: '2023-10-15T09:43:00Z'
}, {
  id: '2',
  platform: 'twitter',
  platformName: 'Twitter',
  icon: Twitter,
  username: 'tech_updates',
  apiKey: 'twtr987654321',
  proxyProfileId: '2',
  proxyProfileName: 'Europe',
  stats: {
    followers: 10243,
    following: 521,
    tweets: 1503
  },
  status: 'active',
  lastUpdated: '2023-09-28T14:22:00Z'
}, {
  id: '3',
  platform: 'linkedin',
  platformName: 'LinkedIn',
  icon: Linkedin,
  username: 'professional_network',
  apiKey: 'lkdn123456789',
  proxyProfileId: '3',
  proxyProfileName: 'Asia',
  stats: {
    connections: 2456,
    posts: 78
  },
  status: 'pending',
  lastUpdated: '2023-10-12T11:05:00Z'
}];
const SocialProfiles = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const {
    toast
  } = useToast();

  // Initialize with mock data
  useEffect(() => {
    setProfiles(mockProfiles);
  }, []);

  // Initialize the form
  const form = useForm<SocialProfileFormValues>({
    resolver: zodResolver(socialProfileSchema),
    defaultValues: {
      platform: '',
      username: '',
      apiKey: '',
      proxyProfileId: ''
    }
  });
  const onSubmit = (data: SocialProfileFormValues) => {
    const platform = socialPlatforms.find(p => p.id === data.platform);
    const proxyProfile = proxyProfiles.find(p => p.id === data.proxyProfileId);
    const newProfile = {
      id: Date.now().toString(),
      platform: data.platform,
      platformName: platform?.name,
      icon: platform?.icon,
      username: data.username,
      apiKey: data.apiKey,
      proxyProfileId: data.proxyProfileId,
      proxyProfileName: proxyProfile?.name,
      stats: generateMockStats(data.platform),
      status: 'pending',
      lastUpdated: new Date().toISOString()
    };
    setProfiles([...profiles, newProfile]);
    setIsAddingNew(false);
    form.reset();
    toast({
      title: "Profile Added",
      description: `${platform?.name} profile for @${data.username} has been successfully added.`
    });
  };
  const deleteProfile = (id: string) => {
    const profileToDelete = profiles.find(profile => profile.id === id);
    setProfiles(profiles.filter(profile => profile.id !== id));
    toast({
      title: "Profile Deleted",
      description: `${profileToDelete?.platformName} profile for @${profileToDelete?.username} has been removed.`,
      variant: "destructive"
    });
  };
  const verifyProfile = (id: string) => {
    setProfiles(profiles.map(profile => profile.id === id ? {
      ...profile,
      status: 'active'
    } : profile));
    const profileToVerify = profiles.find(profile => profile.id === id);
    toast({
      title: "Profile Verified",
      description: `${profileToVerify?.platformName} profile for @${profileToVerify?.username} has been verified.`
    });
  };
  const navigateToProxyProfile = (proxyProfileId: string) => {
    navigate(`/proxy-profiles?id=${proxyProfileId}`);
  };

  // Generate random mock stats based on platform
  const generateMockStats = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return {
          followers: Math.floor(Math.random() * 10000),
          following: Math.floor(Math.random() * 1000),
          posts: Math.floor(Math.random() * 500)
        };
      case 'twitter':
        return {
          followers: Math.floor(Math.random() * 15000),
          following: Math.floor(Math.random() * 2000),
          tweets: Math.floor(Math.random() * 3000)
        };
      case 'facebook':
        return {
          friends: Math.floor(Math.random() * 5000),
          likes: Math.floor(Math.random() * 10000)
        };
      case 'linkedin':
        return {
          connections: Math.floor(Math.random() * 3000),
          posts: Math.floor(Math.random() * 200)
        };
      default:
        return {};
    }
  };
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'bg-gradient-to-r from-pink-500 to-purple-500';
      case 'twitter':
        return 'bg-blue-400';
      case 'facebook':
        return 'bg-blue-600';
      case 'linkedin':
        return 'bg-blue-800';
      default:
        return 'bg-slate-500';
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500"></span>
          Active
        </span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
          <span className="mr-1 h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
          Pending Verification
        </span>;
      default:
        return null;
    }
  };
  const filteredProfiles = activeTab === 'all' ? profiles : profiles.filter(profile => profile.platform === activeTab);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  return <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <div>
          
          
        </div>
        <Button onClick={() => setIsAddingNew(true)} className="flex items-center gap-2" disabled={isAddingNew}>
          <Plus size={16} />
          Add Social Profile
        </Button>
      </div>

      {isAddingNew && <Card className="border-2 border-border animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle>Add New Social Profile</CardTitle>
            <CardDescription>
              Connect a social media account and link it to a proxy profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="platform" render={({
                field
              }) => <FormItem>
                        <FormLabel>Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {socialPlatforms.map(platform => <SelectItem key={platform.id} value={platform.id}>
                                <div className="flex items-center gap-2">
                                  <platform.icon size={16} />
                                  {platform.name}
                                </div>
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="proxyProfileId" render={({
                field
              }) => <FormItem>
                        <FormLabel>Proxy Profile</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select proxy profile" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[200px]">
                            {proxyProfiles.map(profile => <SelectItem key={profile.id} value={profile.id}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{profile.name}</span>
                                  <span className="text-xs bg-muted px-1 rounded">{profile.location}</span>
                                </div>
                              </SelectItem>)}
                            <div className="p-2 border-t">
                              <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-2" onClick={() => navigate('/proxy-profiles')}>
                                <Plus size={14} />
                                <span>Add New Proxy Profile</span>
                              </Button>
                            </div>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="username" render={({
                field
              }) => <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="apiKey" render={({
                field
              }) => <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input placeholder="API Key" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Profile</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>}

      {profiles.length === 0 && !isAddingNew ? <Card className="border-dashed border-2 p-8 mt-8">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="p-3 bg-secondary rounded-full">
              <Plus className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Social Profiles</h3>
            <p className="text-muted-foreground">
              You haven't added any social media profiles yet. Add one to get started.
            </p>
            <Button onClick={() => setIsAddingNew(true)}>
              Add Social Profile
            </Button>
          </div>
        </Card> : profiles.length > 0 && <div className="space-y-4">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Profiles</TabsTrigger>
              <TabsTrigger value="instagram" className="flex items-center gap-1">
                <Instagram size={14} /> Instagram
              </TabsTrigger>
              <TabsTrigger value="twitter" className="flex items-center gap-1">
                <Twitter size={14} /> Twitter
              </TabsTrigger>
              <TabsTrigger value="facebook" className="flex items-center gap-1">
                <Facebook size={14} /> Facebook
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-1">
                <Linkedin size={14} /> LinkedIn
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfiles.map(profile => {
              const PlatformIcon = profile.icon;
              const platformColorClass = getPlatformColor(profile.platform);
              return <Card key={profile.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                      <div className={`h-2 w-full ${platformColorClass}`}></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2 mb-1">
                              <PlatformIcon size={20} />
                              {profile.platformName}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">@{profile.username}</p>
                              {getStatusBadge(profile.status)}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              {profile.status === 'pending' && <DropdownMenuItem onClick={() => verifyProfile(profile.id)}>
                                  <Check className="mr-2 h-4 w-4" /> Verify Account
                                </DropdownMenuItem>}
                              <DropdownMenuItem onClick={() => console.log('View Stats')}>
                                <Globe className="mr-2 h-4 w-4" /> View Profile Page
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => deleteProfile(profile.id)} className="text-red-500">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Profile
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="text-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-muted-foreground">Proxy Profile:</span> 
                            <Button variant="link" className="p-0 h-auto flex items-center gap-1 text-sm" onClick={() => navigateToProxyProfile(profile.proxyProfileId)}>
                              {profile.proxyProfileName}
                              <ExternalLink size={12} />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-muted-foreground">API Key:</span>
                            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">••••••{profile.apiKey.slice(-4)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-muted-foreground">Last Updated:</span>
                            <span className="text-xs">{formatDate(profile.lastUpdated)}</span>
                          </div>
                          
                          {/* Platform-specific stats */}
                          {profile.stats && <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                              {profile.platform === 'instagram' && <>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.followers.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Followers</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.following.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Following</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.posts.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Posts</div>
                                  </div>
                                </>}
                              {profile.platform === 'twitter' && <>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.followers.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Followers</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.following.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Following</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.tweets.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Tweets</div>
                                  </div>
                                </>}
                              {profile.platform === 'facebook' && <>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.friends.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Friends</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.likes.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Likes</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold">-</div>
                                    <div className="text-xs text-muted-foreground">-</div>
                                  </div>
                                </>}
                              {profile.platform === 'linkedin' && <>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.connections.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Connections</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold">{profile.stats.posts.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Posts</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold">-</div>
                                    <div className="text-xs text-muted-foreground">-</div>
                                  </div>
                                </>}
                            </div>}
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between border-t pt-3 pb-3">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Activity
                        </Button>
                        {profile.status === 'pending' ? <Button variant="outline" size="sm" className="text-xs bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/20" onClick={() => verifyProfile(profile.id)}>
                            <AlertCircle size={14} className="mr-1" /> Verify
                          </Button> : <Button variant="outline" size="sm" className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => deleteProfile(profile.id)}>
                            <Trash2 size={14} className="mr-1" /> Delete
                          </Button>}
                      </CardFooter>
                    </Card>;
            })}
              </div>
            </TabsContent>
          </Tabs>
        </div>}
    </div>;
};
export default SocialProfiles;