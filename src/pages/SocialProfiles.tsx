
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { layoutGrid, layoutList } from 'lucide-react/icons';
import { Instagram, Twitter, Facebook, Linkedin, Check, Trash2, AlertCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const mockProfiles = [{
  id: '1',
  platform: 'instagram',
  platformName: 'Instagram',
  icon: Instagram,
  username: 'design_masters',
  description: 'Digital design and UI/UX inspiration',
  status: 'active'
}, {
  id: '2',
  platform: 'twitter',
  platformName: 'Twitter',
  icon: Twitter,
  username: 'tech_updates',
  description: 'Latest tech news and updates',
  status: 'active'
}, {
  id: '3',
  platform: 'linkedin',
  platformName: 'LinkedIn',
  icon: Linkedin,
  username: 'professional_network',
  description: 'Professional networking and business insights',
  status: 'pending'
}];

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
        Pending
      </span>;
    case 'inactive':
    default:
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
        Inactive
      </span>;
  }
};

// Use 'cards' (default) or 'table'
type ViewType = 'cards' | 'table';

const SocialProfiles = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [viewType, setViewType] = useState<ViewType>('cards');
  const { toast } = useToast();

  useEffect(() => {
    setProfiles(mockProfiles);
  }, []);

  // Add a view toggle UI
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h2 className="text-2xl font-semibold mb-2">Social Profiles</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={viewType === 'cards' ? "default" : "outline"}
            size="icon"
            aria-label="Card View"
            onClick={() => setViewType('cards')}
          >
            <layoutGrid size={20} />
          </Button>
          <Button
            variant={viewType === 'table' ? "default" : "outline"}
            size="icon"
            aria-label="Table View"
            onClick={() => setViewType('table')}
          >
            <layoutList size={20} />
          </Button>
        </div>
      </div>

      {/* CARD VIEW */}
      {viewType === 'cards' &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {profiles.map(profile => {
            const PlatformIcon = profile.icon;
            return (
              <Card key={profile.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 mb-1 text-lg">
                    <PlatformIcon size={20} />
                    {profile.platformName}
                  </CardTitle>
                  <CardDescription>
                    {profile.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-base font-medium">
                      <span>@{profile.username}</span>
                      {getStatusBadge(profile.status)}
                    </div>
                    {/* No other details shown */}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      }

      {/* TABLE VIEW */}
      {viewType === 'table' &&
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map(profile => {
                const PlatformIcon = profile.icon;
                return (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">@{profile.username}</TableCell>
                    <TableCell>{profile.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <PlatformIcon size={18} />
                        {profile.platformName}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(profile.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      }
    </div>
  );
};

export default SocialProfiles;

