
import React from 'react';
import { Globe, Clock, Server, Shield } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProxyDetails = ({ proxy }) => {
  const lastUsed = new Date(proxy.lastUsed);
  const formattedLastUsed = formatDistanceToNow(lastUsed, { addSuffix: true });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Proxy Details</span>
          <span className={`text-xs px-2 py-1 rounded-full ${proxy.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {proxy.active ? 'Active' : 'Inactive'}
          </span>
        </CardTitle>
        <CardDescription>{proxy.name}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground">Location</p>
            <p className="font-medium">{proxy.location}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground">Browser</p>
            <p className="font-medium">{proxy.browser} {proxy.version}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground">Protocol</p>
            <p className="font-medium">{proxy.type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground">Last Used</p>
            <p className="font-medium">{formattedLastUsed}</p>
          </div>
        </div>
        
        <div className="col-span-2 flex items-center space-x-2 border-t border-border pt-2 mt-2">
          <div>
            <p className="text-muted-foreground">Connection</p>
            <p className="font-medium">{proxy.ipAddress}:{proxy.port}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProxyDetails;
