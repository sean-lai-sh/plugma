
import React, { useState, useEffect}from 'react'
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabaseClient';
import { HostInfo, EventType } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default async function EventPage({ params }: { params: { slug: string } }) {
    // const slug = params.slug as string;
    // const [event, setEvent] = useState<EventType>();
    // const router = useRouter();

    // useEffect(() => {
    //     const fetchEvent = async () => {
    //         const response = await fetch(`http://localhost:8000/api/event/getEvent/${slug}`);
    //         console.log(response)
    //         const eventTemp = await response.json();
    //         setEvent(eventTemp);
    //         console.log(eventTemp)
    //     };
    
    //     fetchEvent();
    // }, []);

    const res = await fetch(`http://localhost:8000/api/events/getEvent/${params.slug}`, {
        cache: "no-store" // Optional: skip caching for fresh data
      });
    
      if (!res.ok) {
        return <div>Event not found.</div>;
      }
    
    const event: EventType = await res.json();
    console.log(event)
    console.log(event.hosts_info)
    return (
      <div>
        test
      </div>
    );
  }