
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Instagram, Twitter, Facebook, Linkedin, Plus, Trash2 } from 'lucide-react';

// Sample data for proxy profiles
const proxyProfiles = [
  { id: '1', name: 'United States' },
  { id: '2', name: 'Europe' },
  { id: '3', name: 'Asia' },
];

// Schema for form validation
const socialProfileSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  username: z.string().min(1, "Username is required"),
  apiKey: z.string().min(1, "API key is required"),
  proxyProfileId: z.string().min(1, "Proxy profile is required"),
});

type SocialProfileFormValues = z.infer<typeof socialProfileSchema>;

// Social platform options with icons
const socialPlatforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'twitter', name: 'Twitter', icon: Twitter },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
];

const SocialProfiles = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Initialize the form
  const form = useForm<SocialProfileFormValues>({
    resolver: zodResolver(socialProfileSchema),
    defaultValues: {
      platform: '',
      username: '',
      apiKey: '',
      proxyProfileId: '',
    },
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
    };

    setProfiles([...profiles, newProfile]);
    setIsAddingNew(false);
    form.reset();
  };

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Social Profiles</h1>
        <Button 
          onClick={() => setIsAddingNew(true)} 
          className="flex items-center gap-2"
          disabled={isAddingNew}
        >
          <Plus size={16} />
          Add Social Profile
        </Button>
      </div>

      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Social Profile</CardTitle>
            <CardDescription>
              Connect a social media account and link it to a proxy profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {socialPlatforms.map((platform) => (
                              <SelectItem key={platform.id} value={platform.id}>
                                <div className="flex items-center gap-2">
                                  <platform.icon size={16} />
                                  {platform.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="proxyProfileId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proxy Profile</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select proxy profile" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {proxyProfiles.map((profile) => (
                              <SelectItem key={profile.id} value={profile.id}>
                                {profile.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input placeholder="API Key" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddingNew(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Profile</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {profiles.length === 0 && !isAddingNew ? (
        <Card className="border-dashed border-2 p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="p-3 bg-secondary rounded-full">
              <Plus className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Social Profiles</h3>
            <p className="text-muted-foreground">
              You haven't added any social profiles yet. Add one to get started.
            </p>
            <Button onClick={() => setIsAddingNew(true)}>
              Add Social Profile
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile) => {
            const PlatformIcon = profile.icon;
            return (
              <Card key={profile.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <PlatformIcon size={20} />
                    {profile.platformName}
                  </CardTitle>
                  <CardDescription>
                    @{profile.username}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="mb-1">
                      <span className="font-medium">Proxy Profile:</span> {profile.proxyProfileName}
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">API Key:</span> ••••••••••••{profile.apiKey.slice(-4)}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button variant="outline" size="sm" onClick={() => deleteProfile(profile.id)}>
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SocialProfiles;
