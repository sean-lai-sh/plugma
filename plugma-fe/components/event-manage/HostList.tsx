import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Plus, ExternalLink } from 'lucide-react';
import { HostInfo } from '@/lib/utils';
const HostList = ({hosts} : {hosts:HostInfo[]}) => {
  return (
    <Card className="bg-white shadow-sm rounded-xl border animate-zoom-in">
      <CardHeader className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">Hosts</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Edit who controls your event</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Host?</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="rounded-lg overflow-hidden">
          <div className="divide-y divide-border">
            {hosts.map((host) => (
              <div key={host.host_name + host.profile_image} className="flex items-center justify-between py-3 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={host.profile_image} alt={host.host_name} />
                    <AvatarFallback className="text-xs">{host.host_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{host.host_name}</p>
                        {/* <span className="badge-creator">Creator</span> */}
                        {/* <span className="badge-manager">Host</span> */}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* <span className="text-sm text-muted-foreground hidden md:block">{host.email}</span> */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Button 
            variant="link" 
            size="sm" 
            className="text-sm flex items-center gap-1 text-muted-foreground hover:text-primary p-0"
          >
            <span>Learn More</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HostList;