import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ExternalLink, MessageSquare, Edit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { manageEventType } from '@/lib/utils';
import { GuestStats } from '@/lib/types';
import { EventProgress } from './EventProgress';
import { testGuestStats } from '@/lib/consts';
import Link from 'next/link';
import { Separator } from '@radix-ui/react-dropdown-menu';
import GuestProgress from './GuestProgress';
import { Skeleton } from '../ui/skeleton';

interface EventOverviewProps {
  eventEnded?: boolean;
  eventData: manageEventType;
}



const EventOverview: React.FC<EventOverviewProps> = ({ eventEnded = true, eventData }) => {
  if(eventData === null) return EventOverviewSkeleton();
  const checkedIn = eventData.attendees !== null ? eventData.attendees.filter((attendee) => attendee.attended === true).length : 0;
  return (
    <div className="space-y-6 animate-slide-in">
      {eventEnded && (
        <Card className="overflow-hidden border-orange-400 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-md font-semibold mb-1">{eventData.event_name}</h3>
                <p className="text-sm text-muted-foreground">Has ended</p>
              </div>
              <Link href={`/dashboard/analytics`}>
                <Button variant="outline" size="sm" className="mt-2 md:mt-0 flex items-center gap-2">
                  <span>Community Insights</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="overflow-hidden glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardTitle className="text-md font-medium ">Event Recap</CardTitle>
            {/* <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button> */}
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                {/* show month day year */}
                <p className="text-sm">{
                    new Date(eventData.end_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    }</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">{eventData.event_date}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">{ eventData.location_name + ", (" + eventData.location_address + ")"}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">{checkedIn + " "}

               Checked-In Guests</p> 
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardTitle className="text-md font-medium">Feedback</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-4 py-6">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-2 rounded-full bg-secondary">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              <h4 className="text-sm font-medium mt-2">Coming Soon!</h4>
              <p className="text-xs text-muted-foreground">Push an issue to github if you want this soon</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs">
                In the works!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-md font-medium">Invites</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <span>Invite Guests</span>
            <Users className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground mb-4">Coming Soon!</p>
          
          <div className="flex flex-col items-center justify-center text-center py-6 border border-dashed rounded-md">
            <div className="p-2 rounded-full bg-secondary">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            {/* <h4 className="text-sm font-medium mt-3">{eventData.invitesTitle}</h4>
            <p className="text-xs text-muted-foreground mt-1">{eventData.invitesDesc}</p> 
          </div>
        </CardContent>
      </Card> */}
    </div>
    );
}
export default EventOverview;

const EventOverviewSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-orange-200 bg-orange-50/40">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-8 w-36" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="overflow-hidden glass-card">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-md font-medium">Event Recap</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div className="flex items-start gap-3" key={i}>
                <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden glass-card">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-md font-medium">Feedback</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-4 py-6 space-y-3">
            <Skeleton className="h-10 w-10 rounded-full mx-auto" />
            <Skeleton className="h-4 w-24 mx-auto" />
            <Skeleton className="h-3 w-36 mx-auto" />
            <Skeleton className="h-8 w-24 mx-auto" />
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-md font-medium">Invites</CardTitle>
          <Skeleton className="h-8 w-28" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Skeleton className="h-4 w-40 mb-4" />
          <div className="flex flex-col items-center justify-center text-center py-6 border border-dashed rounded-md">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>);
}