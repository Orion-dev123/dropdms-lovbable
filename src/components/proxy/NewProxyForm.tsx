
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NewProxyForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    // Basic info
    name: '',
    location: '',
    userAgent: '',
    disableWebRTC: true,
    enableCookies: true,
    enableLocalStorage: true,
    
    // Proxy settings
    proxyType: 'HTTP',
    proxyUrl: '',
    proxyPort: '',
    username: '',
    password: '',
    
    // Browser config
    os: 'Windows',
    osVersion: '10',
    browser: 'Chrome',
    browserVersion: '120',
    screenResolution: '1920x1080',
    timezone: 'UTC',
    language: 'en-US'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <Tabs defaultValue="basicInfo" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="basicInfo">Basic Information</TabsTrigger>
          <TabsTrigger value="proxySettings">Proxy Settings</TabsTrigger>
          <TabsTrigger value="browserConfig">Browser Configuration</TabsTrigger>
        </TabsList>
        
        {/* Basic Information */}
        <TabsContent value="basicInfo" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Profile Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Marketing Profile US"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                placeholder="New York, US"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="userAgent">Custom User Agent (Optional)</Label>
            <Input 
              id="userAgent" 
              name="userAgent" 
              value={formData.userAgent} 
              onChange={handleChange}
              placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
            />
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="disableWebRTC">Disable WebRTC</Label>
                <p className="text-xs text-muted-foreground">Prevents IP leaks through WebRTC</p>
              </div>
              <Switch 
                id="disableWebRTC" 
                name="disableWebRTC" 
                checked={formData.disableWebRTC} 
                onCheckedChange={(checked) => handleSelectChange('disableWebRTC', checked)}
                className="data-[state=checked]:bg-yellow"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableCookies">Enable Cookies</Label>
                <p className="text-xs text-muted-foreground">Store cookies for this profile</p>
              </div>
              <Switch 
                id="enableCookies" 
                name="enableCookies" 
                checked={formData.enableCookies} 
                onCheckedChange={(checked) => handleSelectChange('enableCookies', checked)}
                className="data-[state=checked]:bg-yellow"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableLocalStorage">Enable Local Storage</Label>
                <p className="text-xs text-muted-foreground">Store local data for this profile</p>
              </div>
              <Switch 
                id="enableLocalStorage" 
                name="enableLocalStorage" 
                checked={formData.enableLocalStorage} 
                onCheckedChange={(checked) => handleSelectChange('enableLocalStorage', checked)}
                className="data-[state=checked]:bg-yellow"
              />
            </div>
          </div>
        </TabsContent>
        
        {/* Proxy Settings */}
        <TabsContent value="proxySettings" className="space-y-4">
          <div className="space-y-3">
            <Label>Proxy Type</Label>
            <RadioGroup 
              defaultValue={formData.proxyType} 
              onValueChange={(value) => handleSelectChange('proxyType', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HTTP" id="http" className="border-yellow text-yellow" />
                <Label htmlFor="http">HTTP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SOCKS4" id="socks4" className="border-yellow text-yellow" />
                <Label htmlFor="socks4">SOCKS4</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SOCKS5" id="socks5" className="border-yellow text-yellow" />
                <Label htmlFor="socks5">SOCKS5</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proxyUrl">Proxy URL/IP</Label>
              <Input 
                id="proxyUrl" 
                name="proxyUrl" 
                value={formData.proxyUrl} 
                onChange={handleChange}
                placeholder="proxy.example.com or 192.168.1.1" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="proxyPort">Port</Label>
              <Input 
                id="proxyPort" 
                name="proxyPort" 
                value={formData.proxyPort} 
                onChange={handleChange}
                placeholder="8080" 
              />
            </div>
          </div>
          
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="text-sm font-medium mb-4">Authentication (Optional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange}
                  placeholder="username" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  placeholder="••••••••" 
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Browser Configuration */}
        <TabsContent value="browserConfig" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="os">Operating System</Label>
              <Select 
                defaultValue={formData.os} 
                onValueChange={(value) => handleSelectChange('os', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select OS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Windows">Windows</SelectItem>
                  <SelectItem value="MacOS">MacOS</SelectItem>
                  <SelectItem value="Linux">Linux</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="osVersion">OS Version</Label>
              <Select 
                defaultValue={formData.osVersion} 
                onValueChange={(value) => handleSelectChange('osVersion', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Windows 10</SelectItem>
                  <SelectItem value="11">Windows 11</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="browser">Browser</Label>
              <Select 
                defaultValue={formData.browser} 
                onValueChange={(value) => handleSelectChange('browser', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select browser" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chrome">Chrome</SelectItem>
                  <SelectItem value="Firefox">Firefox</SelectItem>
                  <SelectItem value="Edge">Edge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="browserVersion">Version</Label>
              <Select 
                defaultValue={formData.browserVersion} 
                onValueChange={(value) => handleSelectChange('browserVersion', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="118">118</SelectItem>
                  <SelectItem value="119">119</SelectItem>
                  <SelectItem value="120">120</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="screenResolution">Screen Resolution</Label>
              <Select 
                defaultValue={formData.screenResolution} 
                onValueChange={(value) => handleSelectChange('screenResolution', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1366x768">1366x768</SelectItem>
                  <SelectItem value="1920x1080">1920x1080 (FHD)</SelectItem>
                  <SelectItem value="2560x1440">2560x1440 (QHD)</SelectItem>
                  <SelectItem value="3840x2160">3840x2160 (4K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select 
                defaultValue={formData.timezone} 
                onValueChange={(value) => handleSelectChange('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Central European (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">System Language</Label>
            <Select 
              defaultValue={formData.language} 
              onValueChange={(value) => handleSelectChange('language', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="es-ES">Spanish</SelectItem>
                <SelectItem value="fr-FR">French</SelectItem>
                <SelectItem value="de-DE">German</SelectItem>
                <SelectItem value="ja-JP">Japanese</SelectItem>
                <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        <Button type="submit" className="bg-yellow text-yellow-foreground hover:bg-yellow/90">Create Profile</Button>
      </div>
    </form>
  );
};

export default NewProxyForm;
