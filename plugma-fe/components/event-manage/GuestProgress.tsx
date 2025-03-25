import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventProgress } from './EventProgress';
import { GuestStats } from '@/lib/types';


const GuestProgress = ({attendeeStats} : {
    attendeeStats: GuestStats
}) => {
  return (
    <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-md font-medium">Guests</CardTitle>
              <div className="text-right">
                <div className="text-xl font-bold">{attendeeStats.going} <span className="text-xs font-normal text-muted-foreground">guests</span></div>
                <div className="text-xs text-muted-foreground">{attendeeStats.capacity + " cap"}</div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <EventProgress 
                  data={attendeeStats}
                  className="h-2 bg-primary rounded-full" />
                
                <div className="flex items-center gap-5">
                  {/* map all attributes from attendee Stats */}
                  {Object.entries(attendeeStats)
                    .filter(([key]) => key !== 'capacity').map(([key, value]) => {
                      let dotColor = '';
                      if (key === 'going') dotColor = 'bg-green-500';
                      else if (key === 'maybe') dotColor = 'bg-orange-400';
                      else if (key === 'notGoing') dotColor = 'bg-red-500';
    
                      let displayName = key === "notGoing" ? "not going" : key;
                  
                      return (
                        <div className="flex items-center gap-1.5" key={key}>
                          <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                          <span className="text-xs">{value} {displayName}</span>
                        </div>
                      );
                    })}
                  
                
                </div>
              </div>
            </CardContent>
          </Card>
  )
}

export default GuestProgress