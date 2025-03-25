import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { manageEventType, AttendeeInfo } from '@/lib/utils';
import { Separator } from '@radix-ui/react-dropdown-menu';
import GuestProgress from './GuestProgress';
import { GuestStats } from '@/lib/types';
import { testGuestStats } from '@/lib/consts';

const GuestList = ({eventData} : {eventData:manageEventType}) => {
  const attendeeStats: GuestStats = testGuestStats;
      // {
      //   going: eventData.attendees.filter((attendee) => attendee.rsvp_status === 'going').length,
      //   maybe: eventData.attendees.filter((attendee) => attendee.rsvp_status === 'maybe').length,
      //   notGoing: eventData.attendees.filter((attendee) => attendee.rsvp_status === 'no').length,
      //   capacity: eventData.capacity || null
      // }
  return (
    <div className='div className="grid grid-cols-1 md:grid-cols-2 gap-4"'>
    <GuestProgress attendeeStats={attendeeStats}/>
    <Card className="bg-white shadow-sm rounded-xl border animate-zoom-in mt-4">
      <CardHeader className="px-4 pt-4 text-start">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-xl font-medium text-start">Guest List</CardTitle>
          {/* TODO: <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm flex items-center"
          >
            <span>All Guests</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button> */}
        </div>
        
      </CardHeader>
      {/* <Separator className=" h-[0.1rem] bg-gray-400" /> */}
      <CardContent className="px-4 py-2">
        <div className="rounded-lg overflow-hidden">
          <div className="divide-y divide-border">
            {eventData.attendees.map((attendee) => (
              <div key={attendee.attendee_name + attendee.profile_image} className="flex items-center justify-between py-3 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={attendee.profile_image} alt={attendee.attendee_name} />
                    <AvatarFallback className="text-xs">{attendee.attendee_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-normal text-sm">{attendee.attendee_name}</p>
                    <p className="text-xs text-muted-foreground">{attendee.attendee_email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="badge-going font-normal text-sm text-gray-700">{attendee.rsvp_status}</span>
                  <span className="text-sm text-muted-foreground">{eventData.event_date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default GuestList;