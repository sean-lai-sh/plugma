'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { manageEventType } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import EventNavbar from '@/components/eventNavbar';
import EventHeader from '@/components/event-manage/EventHeader';
import { defaultManagerEvent } from '@/lib/consts';
import GuestList from '@/components/event-manage/GuestList';
import HostList from '@/components/event-manage/HostList';
import EventOverview from '@/components/event-manage/EventOverview';
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';
import VisibilitySection from '@/components/event-manage/VisibilitySection';

export default function EventPageClient({ params }: { params: { slug: string } }) {
    const [event, setEvent] = useState<manageEventType>(defaultManagerEvent);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingSteps, setLoadingSteps] = useState<{ label: string; progress: number }[]>([]);
    const router = useRouter();
    const { slug } = params;
    const fetchEvent = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("User not found, redirecting...");
        setTimeout(() => router.push("/"), 5000);
        return;
      }
        
      const userID = user.id;
      const params = new URLSearchParams({ slug, userID })
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/events/manageEvent/?${params.toString()}`,
      );

      if (res.status === 404) {
          router.push("/");
          return;
      }

      const data = await res.json();
      setEvent(Array.isArray(data) ? data[0] : data);
      setIsLoading(false);
    };
    useEffect(() => {
      fetchEvent();
    }, [params.slug, isLoading]);

  const handleEdit = async (id:string) => {
    // console.log("Edit", id);
    const params = new URLSearchParams({ event_id: slug, user_id: id });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/update_check_in/?${params.toString()}`);
    console.log('Response status:', response);
    const data = await response.json();
    if(data){
      console.log('Data:', data);
      fetchEvent();
    }
  }


  return (
    <div>
        {/* {event ? <>
        <h1>{event.event_name}</h1>
      <p>{event.event_description}</p>
        </> :
        <LoadingOverlay 
        isLoading={isLoading} 
        loadingSteps={loadingSteps} 
        message="Preparing your event preview..." 
      />} */}
    
      <div className="min-h-screen bg-gray-50">
        <EventNavbar />
        <EventHeader 
          title={event.event_name} 
          category={"Personal"}
          slug={params.slug}
        />
        
        <main className="container mx-auto pb-16 px-4 md:px-6">
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="w-full grid grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="hosts">Hosts</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className='space-y-4'>
            <EventOverview eventEnded={new Date(event.end_date) <= new Date()} 
              eventData={event}
            />
            <GuestList eventData={event} 
              onEdit={handleEdit}             
            />
            <HostList hosts={event.hosts_info}/>
          </TabsContent>
          
          <TabsContent value="guests">
            <GuestList eventData={event}   
            onEdit={handleEdit}           
            />
            
          </TabsContent>
          
          <TabsContent value="hosts">
            <HostList hosts={event.hosts_info}/>
          </TabsContent>
          
          <TabsContent value="visibility">
            <VisibilitySection 
            eventData={event}
            slug={params.slug}
            />
          </TabsContent>
        </Tabs>
      </main>


    </div>
  </div>
  );
}
