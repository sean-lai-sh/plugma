import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, Users, ArrowRight, Calendar } from 'lucide-react';
import { formatDate } from 'date-fns';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import  Link  from 'next/link';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  locationDetail: string;
  attendees: number;
  imageUrl: string;
}

interface DayEvents {
  date: Date;
  events: Event[];
}

interface EventTimelineProps {
  days: DayEvents[];
}

const EventTimelineDay: React.FC<{ day: DayEvents }> = ({ day }) => {
  // Show max 2 events per day in the timeline
  const displayEvents = day.events.slice(0, 2);
  const hasMoreEvents = day.events.length > 2;
  
  return (
    <div className="timeline-day mb-8">
      <div className="flex items-start">
        <div className="timeline-date w-40 pr-6 pt-2 text-right flex-shrink-0">
          <h3 className="text-xl font-semibold text-gray-900">{formatDate(day.date, 'MMM d')}</h3>
          <p className="text-gray-500">{formatDate(day.date, 'EEEE')}</p>
        </div>
        
        <div className="timeline-connector flex flex-col items-center mx-4 flex-shrink-0">
          <div className="h-4 w-4 rounded-full bg-[#3a3a3a] mt-3"></div>
          <div className="h-full w-0.5 bg-gray-200 mt-1"></div>
        </div>
        
        <div className="timeline-events flex-grow">
          {displayEvents.map((event, index) => (
            <Link href={`/event/${event.id}`} key={event.id} className="block mb-4 hover:no-underline">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                    <div className="p-5 flex-grow">
                        <div className="text-gray-500 mb-2">{event.time}</div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h4>
                        
                        <div className="flex items-start mb-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1 mr-2" />
                        <div>
                            <div className="text-sm text-gray-700">{event.locationDetail}</div>
                        </div>
                        </div>
                        
                        <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-500">{event.attendees} guests</div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="mt-3 text-gray-600">
                        Manage Event <ArrowRight className="ml-1 w-4 h-4" />
                        </Button>
                    </div>
                    
                    {event.imageUrl && (
                        <div className="w-full md:w-48 h-40 md:h-auto">
                        <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="w-full h-full object-cover" 
                        />
                        </div>
                    )}
                    </div>
                </CardContent>
                </Card>
            </Link>
          ))}
          
          {hasMoreEvents && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="mt-1 mb-4 text-sm text-gray-500 hover:text-gray-700">
                  View all {day.events.length} events
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    Events for {formatDate(day.date, 'EEEE, MMMM d, yyyy')}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 mt-4">
                  {day.events.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-gray-500">{event.time}</div>
                          <Link href={`/event/${event.id}`}>
                            <Button variant="ghost" size="sm">
                              View details
                            </Button>
                          </Link>
                        </div>
                        
                        <h4 className="text-lg font-medium text-gray-900 mb-3">{event.title}</h4>
                        
                        <div className="flex items-start mb-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-1 mr-2" />
                          <div className="text-sm text-gray-700">{event.locationDetail}</div>
                        </div>
                        
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-500">{event.attendees} guests</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

const EventTimeline: React.FC<EventTimelineProps> = ({ days }) => {
  return (
    <div className="event-timeline mx-auto mt-8">
      {days.length > 0 ? (
        <div>
          {days.map((day, index) => (
            <React.Fragment key={day.date.toISOString()}>
              <EventTimelineDay day={day} />
              {index < days.length - 1 && (
                <div className="ml-48 mb-8">
                  <Separator />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No upcoming events</h3>
          <p className="text-gray-500 mt-2">When you create events, they'll appear here.</p>
        </div>
      )}
    </div>
  );
};

export default EventTimeline;