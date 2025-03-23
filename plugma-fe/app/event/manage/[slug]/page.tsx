'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { EventType } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default function EventPageClient({ params }: { params: { slug: string } }) {
    const [event, setEvent] = useState<EventType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingSteps, setLoadingSteps] = useState<{ label: string; progress: number }[]>([]);
    const router = useRouter();
    const { slug } = params;
    useEffect(() => {
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

    fetchEvent();
  }, [params.slug, router]);

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
      
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardContent className="p-6 relative">
          {/* Content with blur */}
          <div className={`transition-all ${isLoading ? "blur-sm select-none" : ""}`}>
            <h2 className="text-xl font-bold mb-2">Premium Event Details</h2>
            <p className="text-muted-foreground">
              This content is only visible to approved users or after unlocking.
            </p>
          </div>

          {/* Overlay (optional)
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-10 rounded-md">
              <Button onClick={() => setIsLoading(false)}>Unlock</Button>
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>



    </div>
  );
}
