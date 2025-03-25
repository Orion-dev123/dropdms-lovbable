
import React, { useState } from 'react';
import { User, Bell, Globe, Moon, Shield, Database } from 'lucide-react';

// Setting category type
type SettingCategory = 'account' | 'notifications' | 'proxies' | 'appearance' | 'security' | 'data';

const Settings = () => {
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('account');
  
  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and app settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Categories */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveCategory('account')}
              className={`w-full px-4 py-3 flex items-center text-left ${
                activeCategory === 'account' 
                  ? 'bg-secondary/50 border-l-2 border-yellow' 
                  : 'hover:bg-secondary/30'
              } transition-colors`}
            >
              <User size={18} className="mr-3 text-muted-foreground" />
              <span>Account</span>
            </button>
            
            <button
              onClick={() => setActiveCategory('notifications')}
              className={`w-full px-4 py-3 flex items-center text-left ${
                activeCategory === 'notifications' 
                  ? 'bg-secondary/50 border-l-2 border-yellow' 
                  : 'hover:bg-secondary/30'
              } transition-colors`}
            >
              <Bell size={18} className="mr-3 text-muted-foreground" />
              <span>Notifications</span>
            </button>
            
            <button
              onClick={() => setActiveCategory('proxies')}
              className={`w-full px-4 py-3 flex items-center text-left ${
                activeCategory === 'proxies' 
                  ? 'bg-secondary/50 border-l-2 border-yellow' 
                  : 'hover:bg-secondary/30'
              } transition-colors`}
            >
              <Globe size={18} className="mr-3 text-muted-foreground" />
              <span>Proxy Settings</span>
            </button>
            
            <button
              onClick={() => setActiveCategory('appearance')}
              className={`w-full px-4 py-3 flex items-center text-left ${
                activeCategory === 'appearance' 
                  ? 'bg-secondary/50 border-l-2 border-yellow' 
                  : 'hover:bg-secondary/30'
              } transition-colors`}
            >
              <Moon size={18} className="mr-3 text-muted-foreground" />
              <span>Appearance</span>
            </button>
            
            <button
              onClick={() => setActiveCategory('security')}
              className={`w-full px-4 py-3 flex items-center text-left ${
                activeCategory === 'security' 
                  ? 'bg-secondary/50 border-l-2 border-yellow' 
                  : 'hover:bg-secondary/30'
              } transition-colors`}
            >
              <Shield size={18} className="mr-3 text-muted-foreground" />
              <span>Security</span>
            </button>
            
            <button
              onClick={() => setActiveCategory('data')}
              className={`w-full px-4 py-3 flex items-center text-left ${
                activeCategory === 'data' 
                  ? 'bg-secondary/50 border-l-2 border-yellow' 
                  : 'hover:bg-secondary/30'
              } transition-colors`}
            >
              <Database size={18} className="mr-3 text-muted-foreground" />
              <span>Data & Backup</span>
            </button>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
            {/* Account Settings */}
            {activeCategory === 'account' && (
              <div>
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-medium">Account Settings</h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-muted-foreground text-xl font-medium">
                        JD
                      </div>
                      <div>
                        <h3 className="font-medium">John Doe</h3>
                        <p className="text-sm text-muted-foreground">Pro Plan · Joined Sep 2023</p>
                      </div>
                    </div>
                    
                    <button className="px-4 py-2 bg-secondary/50 text-foreground rounded-md hover:bg-secondary transition-colors text-sm">
                      Change Avatar
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="John Doe"
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="john@example.com"
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Change Password</label>
                      <input 
                        type="password" 
                        placeholder="Current password"
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50 mb-2"
                      />
                      <input 
                        type="password" 
                        placeholder="New password"
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50 mb-2"
                      />
                      <input 
                        type="password" 
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow/50"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-yellow text-primary-foreground rounded-md hover-scale">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notification Settings */}
            {activeCategory === 'notifications' && (
              <div>
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-medium">Notification Preferences</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="flex-1 text-sm">Campaign completion alerts</label>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="flex-1 text-sm">Message delivery failures</label>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="flex-1 text-sm">Account login alerts</label>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                            <input type="checkbox" className="sr-only peer" />
                            <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="flex-1 text-sm">Weekly activity summary</label>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-sm font-medium mb-3">In-App Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="flex-1 text-sm">Show notifications for new messages</label>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="flex-1 text-sm">Campaign status updates</label>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="flex-1 text-sm">Only notify for failed messages</label>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                            <input type="checkbox" className="sr-only peer" />
                            <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-yellow text-primary-foreground rounded-md hover-scale">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Proxy Settings */}
            {activeCategory === 'proxies' && (
              <div>
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-medium">Proxy Settings</h2>
                </div>
                
                <div className="p-6">
                  <p className="mb-4 text-sm">Configure proxy settings for each social media platform to avoid rate limits and IP blocks.</p>
                  
                  <div className="space-y-6">
                    <div className="bg-secondary/30 p-4 rounded-lg border border-border">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Instagram Proxy</h3>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs mb-1">Proxy Host</label>
                          <input 
                            type="text" 
                            placeholder="e.g. proxy.example.com"
                            className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow/50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Port</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 8080"
                            className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow/50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Username</label>
                          <input 
                            type="text" 
                            placeholder="Username (if required)"
                            className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow/50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Password</label>
                          <input 
                            type="password" 
                            placeholder="Password (if required)"
                            className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow/50"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <button className="px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-secondary/70 transition-colors">
                          Test Connection
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/30 p-4 rounded-lg border border-border">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Twitter Proxy</h3>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                          <input type="checkbox" className="sr-only peer" />
                          <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs mb-1">Proxy Host</label>
                          <input 
                            type="text" 
                            placeholder="e.g. proxy.example.com"
                            className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow/50"
                            disabled
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Port</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 8080"
                            className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow/50"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/30 p-4 rounded-lg border border-border">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">LinkedIn Proxy</h3>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                          <input type="checkbox" className="sr-only peer" />
                          <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs mb-1">Proxy Host</label>
                          <input 
                            type="text" 
                            placeholder="e.g. proxy.example.com"
                            className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow/50"
                            disabled
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Port</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 8080"
                            className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow/50"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-yellow text-primary-foreground rounded-md hover-scale">
                        Save Proxy Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Appearance Settings */}
            {activeCategory === 'appearance' && (
              <div>
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-medium">Appearance</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Theme</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="border border-yellow rounded-lg p-3 bg-secondary/30">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm">Dark (Current)</span>
                            <div className="w-4 h-4 rounded-full bg-yellow"></div>
                          </div>
                          <div className="h-24 bg-background rounded-md border border-border flex items-center justify-center">
                            <div className="w-12 h-6 bg-yellow rounded-md"></div>
                          </div>
                        </div>
                        
                        <div className="border border-border rounded-lg p-3 hover:border-muted-foreground transition-colors cursor-pointer">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm">Light</span>
                            <div className="w-4 h-4 rounded-full border border-muted-foreground"></div>
                          </div>
                          <div className="h-24 bg-white rounded-md border border-gray-200 flex items-center justify-center">
                            <div className="w-12 h-6 bg-yellow rounded-md"></div>
                          </div>
                        </div>
                        
                        <div className="border border-border rounded-lg p-3 hover:border-muted-foreground transition-colors cursor-pointer">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm">System</span>
                            <div className="w-4 h-4 rounded-full border border-muted-foreground"></div>
                          </div>
                          <div className="h-24 bg-gradient-to-r from-background to-white rounded-md border border-border flex items-center justify-center">
                            <div className="w-12 h-6 bg-yellow rounded-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-sm font-medium mb-3">Accent Color</h3>
                      <div className="flex flex-wrap gap-3">
                        <button className="w-8 h-8 rounded-full bg-yellow ring-2 ring-offset-2 ring-offset-background ring-yellow"></button>
                        <button className="w-8 h-8 rounded-full bg-blue-500 hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-blue-500 transition-all"></button>
                        <button className="w-8 h-8 rounded-full bg-green-500 hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-green-500 transition-all"></button>
                        <button className="w-8 h-8 rounded-full bg-purple-500 hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-purple-500 transition-all"></button>
                        <button className="w-8 h-8 rounded-full bg-red-500 hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-red-500 transition-all"></button>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-sm font-medium mb-3">Font Size</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">A</span>
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="1"
                            defaultValue="1"
                            className="flex-1"
                          />
                          <span className="text-lg font-medium">A</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Adjust the font size used throughout the application.
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-yellow text-primary-foreground rounded-md hover-scale">
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Settings */}
            {activeCategory === 'security' && (
              <div>
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-medium">Security</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add an extra layer of security by enabling two-factor authentication.
                      </p>
                      
                      <div className="flex items-center justify-between bg-secondary/30 p-4 rounded-lg border border-border">
                        <div>
                          <p className="font-medium text-sm">2FA Status</p>
                          <p className="text-sm text-muted-foreground">Not enabled</p>
                        </div>
                        <button className="px-3 py-1.5 bg-yellow text-primary-foreground rounded text-sm hover-scale">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-sm font-medium mb-3">Login Sessions</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Manage your active login sessions.
                      </p>
                      
                      <div className="bg-secondary/30 p-4 rounded-lg border border-border space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium text-sm">Current Session</p>
                              <span className="ml-2 px-2 py-0.5 text-xs bg-yellow/10 text-yellow rounded-full">Active</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Chrome on Mac · New York, USA · Last active now</p>
                          </div>
                          <button disabled className="px-3 py-1.5 bg-secondary text-muted-foreground rounded text-sm cursor-not-allowed">
                            Current
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">Chrome on Windows</p>
                            <p className="text-xs text-muted-foreground">San Francisco, USA · Last active 2 days ago</p>
                          </div>
                          <button className="px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-secondary/70 transition-colors">
                            Log Out
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">Firefox on Mac</p>
                            <p className="text-xs text-muted-foreground">London, UK · Last active 5 days ago</p>
                          </div>
                          <button className="px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-secondary/70 transition-colors">
                            Log Out
                          </button>
                        </div>
                      </div>
                      
                      <button className="mt-3 px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors">
                        Log Out All Other Sessions
                      </button>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-sm font-medium mb-3">API Access</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Manage API keys for third-party integrations.
                      </p>
                      
                      <div className="bg-secondary/30 p-4 rounded-lg border border-border mb-3">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-medium text-sm">API Key</p>
                          <button className="px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-secondary/70 transition-colors">
                            Generate New Key
                          </button>
                        </div>
                        
                        <div className="relative">
                          <input 
                            type="text" 
                            value="••••••••••••••••••••••••••••••"
                            readOnly
                            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none"
                          />
                          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground">
                            Show
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center">
                          <input type="checkbox" id="api-readonly" className="mr-2 rounded border-border" />
                          <label htmlFor="api-readonly" className="text-sm">Read-only access</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="api-webhooks" className="mr-2 rounded border-border" />
                          <label htmlFor="api-webhooks" className="text-sm">Enable webhooks</label>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Keep your API key secure. If compromised, generate a new one immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Data & Backup Settings */}
            {activeCategory === 'data' && (
              <div>
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-medium">Data & Backup</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Export Data</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download your data in a CSV or JSON format for backup or analysis.
                      </p>
                      
                      <div className="bg-secondary/30 p-4 rounded-lg border border-border">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input type="checkbox" id="export-leads" className="mr-2 rounded border-border" defaultChecked />
                            <label htmlFor="export-leads" className="text-sm">Leads data</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="export-campaigns" className="mr-2 rounded border-border" defaultChecked />
                            <label htmlFor="export-campaigns" className="text-sm">Campaign data</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="export-messages" className="mr-2 rounded border-border" />
                            <label htmlFor="export-messages" className="text-sm">Message history</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="export-settings" className="mr-2 rounded border-border" />
                            <label htmlFor="export-settings" className="text-sm">Account settings</label>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-3">
                          <button className="px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-secondary/70 transition-colors">
                            Export as CSV
                          </button>
                          <button className="px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-secondary/70 transition-colors">
                            Export as JSON
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-sm font-medium mb-3">Clear Data</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Remove specific types of data from your account.
                      </p>
                      
                      <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 bg-secondary/30 border border-border rounded-lg flex justify-between items-center hover:bg-secondary/50 transition-colors">
                          <div>
                            <p className="text-sm font-medium">Clear Message Logs</p>
                            <p className="text-xs text-muted-foreground">Remove all message history while keeping leads and campaigns</p>
                          </div>
                          <span className="text-red-500 text-xs">Irreversible</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-3 bg-secondary/30 border border-border rounded-lg flex justify-between items-center hover:bg-secondary/50 transition-colors">
                          <div>
                            <p className="text-sm font-medium">Clear Campaign Data</p>
                            <p className="text-xs text-muted-foreground">Remove all campaign history and statistics</p>
                          </div>
                          <span className="text-red-500 text-xs">Irreversible</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-3 bg-secondary/30 border border-border rounded-lg flex justify-between items-center hover:bg-secondary/50 transition-colors">
                          <div>
                            <p className="text-sm font-medium">Reset Account</p>
                            <p className="text-xs text-muted-foreground">Remove all data and reset to defaults</p>
                          </div>
                          <span className="text-red-500 text-xs">Irreversible</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-sm font-medium mb-3">Automatic Backups</h3>
                      <div className="flex items-center justify-between bg-secondary/30 p-4 rounded-lg border border-border mb-3">
                        <div>
                          <p className="font-medium text-sm">Weekly Backups</p>
                          <p className="text-xs text-muted-foreground">Automatically backup your data every week</p>
                        </div>
                        <div className="relative inline-block w-10 h-5 rounded-full bg-secondary">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <span className="absolute inset-y-0 left-0 w-5 h-5 m-0 rounded-full bg-foreground peer-checked:bg-yellow peer-checked:left-5 transition-all duration-300"></span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between px-4 py-3 border border-border rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Last backup</p>
                            <p className="text-xs text-muted-foreground">Sep 15, 2023 at 10:30 AM</p>
                          </div>
                          <button className="px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-secondary/70 transition-colors">
                            Restore
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between px-4 py-3 border border-border rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Previous backup</p>
                            <p className="text-xs text-muted-foreground">Sep 8, 2023 at 10:30 AM</p>
                          </div>
                          <button className="px-3 py-1.5 bg-secondary text-foreground rounded text-sm hover:bg-secondary/70 transition-colors">
                            Restore
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
