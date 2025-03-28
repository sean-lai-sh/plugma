import { EventType, generateScrambledKey, HostInfo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { formatDate } from 'date-fns';
import { Separator } from "@/components/ui/separator";
import LocationMap from "@/components/locationMap";
import EventNavbar from "@/components/eventNavbar";
import RsvpButton from "@/components/general-event/rsvpbutton";
import HostList from "@/components/event-manage/HostList";
import PubHost from "@/components/pubHost";
import CheckInButton from "@/components/general-event/checkInButton";


export default async function EventPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/getEvent/${params.slug}`, {
    cache: "no-store", // ensures fresh fetch
  });
  console.log("Response", res.status);
  console.log("res", res);
  
  if (res == null || !res.ok) {
    return null;
  }

  const data = await res.json();
  const event: EventType = data?.[0];
  console.log(event.hosts_info);
  console.log("Event", event);
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-8 w-1/2 mb-6" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
        <EventNavbar slug={params.slug} />
      {/* Header with image */}
      <div className="w-full bg-gray-900 h-[40vh] relative overflow-hidden">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.event_name}
            className="w-full h-full object-cover opacity-70"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-40 relative z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Event preview card */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-6 gap-4">
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <Calendar className="mr-2 h-5 w-5" />
                        <span>{formatDate(event.event_date, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        <span>{formatDate(event.event_date, 'h:mm a')} - {formatDate(event.end_date, 'h:mm a')}</span>
                    </div>
                </div>
                <Separator orientation="vertical" className="md:mx-4 md:h-12  text-gray-600" />
                <div className="flex items-end">
                    <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-gray-800 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-gray-800">{event.location_name}</h3>
                                <p className="text-sm text-gray-600">{event.location_address}</p>
                            </div>
                    </div>
                </div>
            </div>
            {event && (
              <>
                <RsvpButton
                    eventId={params.slug}
                    eventName={event.event_name}
                />
                <CheckInButton
                    eventId={params.slug}
                    eventName={event.event_name}
                /></>
            )}
            <Separator className="my-3"/>
            <PubHost 
            
                hosts={event.hosts_info}/>
            
            {/* Location section */}
            
            
            <div className="">
              <div className=" max-w-none">
                <h2 className="text-gray-600 mt-4 font-medium">About the Event</h2>
                <Separator className="mb-3"/>
                <p className="text-gray-700 mb-8">{event.event_description}</p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Users className="mr-4 h-6 w-6 text-gray-400 mt-0.5" />
                  {event.capacity ?(<div>
                    <h3 className="font-medium">Capacity</h3>
                    <p className="text-gray-600">{event.capacity}</p>
                  </div>) :
                  <p className="text-gray-600">
                    Unlimited Entry
                  </p> }
                  
                </div>
                <div className="space-y-6 mb-8">
                    {/* <MapPin className="mr-4 h-6 w-6 text-gray-400 mt-0.5" />
                    <div>
                        <h3 className="font-medium">{event.location_name}</h3>
                        <p className="text-gray-600">{event.location_address}</p>
                    </div> */}
                    {/* Location Map */}
                    <LocationMap 
                        locationName={event.location_name}
                        address={event.location_address}
                        mapHeight="300px"
                    />
                </div>   
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const hostsPfpGeneration = (host_info: HostInfo[]) => {
  console.log("Host Info", host_info);
  return (
    <div className="flex items-center space-x-4">
      {host_info.map((host) => (
        <div key={generateScrambledKey()} className="flex items-center">
          <img
            src={host.profile_image}
            alt={host.host_name}
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2 text-sm font-medium">{host.host_name}</span>
        </div>
      ))}
    </div>
  );
}