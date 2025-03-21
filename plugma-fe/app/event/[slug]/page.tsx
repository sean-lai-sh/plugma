import { EventType, HostInfo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { formatDate } from 'date-fns';
import { Separator } from "@/components/ui/separator";


export default async function EventPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`http://localhost:8000/api/events/getEvent/${params.slug}`, {
    cache: "no-store", // ensures fresh fetch
  });
  console.log("Response", res.status);
  
  if (!res.ok) {
    return <div className="p-6 text-red-500">Event not found.</div>;
  }

  const data = await res.json();
  const event: EventType = data?.[0];

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
      <div className="container mx-auto px-4 max-w-4xl -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Event preview card */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-6 gap-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{formatDate(event.event_date, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{formatDate(event.event_date, 'h:mm a')} - {formatDate(event.end_date, 'h:mm a')}</span>
              </div>
            </div>
            <Separator className="my-3"/>
              <div className="mt-6 text-start">
                  <p className="text-gray-500 mt-2">Hosted by:</p>
                  {hostsPfpGeneration(event.hosts_info)}
                </div>
            <Separator className="my-3"/>
            <div className="">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-8">{event.event_description}</p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{event.location_name}</h3>
                    <p className="text-gray-600">{event.location_address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="mr-4 h-6 w-6 text-gray-400 mt-0.5" />
                  {event.capacity ?(<div>
                    <h3 className="font-medium">Capacity</h3>
                    <p className="text-gray-600">{event.capacity}</p>
                  </div>) :<p className="text-gray-600">
                    Unlimited Entry
                  </p> }
                  
                </div>
              </div>

              <Button className="w-full py-6 text-lg">RSVP to this event</Button>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const hostsPfpGeneration = (host_info: HostInfo[]) => {
  return (
    <div className="flex items-center space-x-4">
      {host_info.map((host) => (
        <div key={host.profile_image} className="flex items-center">
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