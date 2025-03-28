import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HostInfo } from '@/lib/utils';
const PubHost = ({hosts} : {hosts:HostInfo[]}) => {
  return (
    <Card className="bg-white shadow-sm rounded-xl border animate-zoom-in">
      <CardHeader className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">Hosts</CardTitle>
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
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PubHost;