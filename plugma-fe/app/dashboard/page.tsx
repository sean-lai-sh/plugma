"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Currency, Plus, Sparkles, Tickets } from "lucide-react";
import EmptyState from "../../components/ui/EmptyState";
import DashboardNavbar from "@/components/dashboardnavbar";
import EventTimeline from "@/components/eventTimeline";
import Link from "next/link";
import { getMockEvents } from "@/lib/consts";
import { mock } from "node:test";
import { User } from "@supabase/supabase-js";
import { EventData } from "@/lib/types";
import { set } from "date-fns";


type UserCTA = {
  button_text: string;
  link: string;
};



export default function Dashboard() {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<EventData[]>([]);
    const [currEvents , setCurrEvents] = useState<EventData[]>([]);
    const [pastEventDays, setPastEventDays] = useState<EventData[]>([]);
    const router = useRouter();
    useEffect(() => {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 20;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scrolled]);
      useEffect(() => {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            router.push("/sign-in"); // Redirect if not signed in
            return;
          }
    
          // Set user state only once
          setUser(user);
    
          // Fetch events using the user's ID
          const param = new URLSearchParams({ user_id: user.id });
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/ds/getallevents/?${param.toString()}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch events');
          }
          
          const data = await response.json();
          setData(data);
          console.log(data);
          // setData(getMockEvents());
          if(data.length === 0) setHasEvents(false);
          else{
              console.log("Data is not empty");
              setPastEventDays(splitEventsByDate(data).pastEvents);
              console.log("Past Event",pastEventDays);
              setCurrEvents(splitEventsByDate(data).currentAndFutureEvents);
              console.log("Current Event",currEvents);
          }
        } catch (error) {
          console.error('Error fetching user or events:', error);
          // Optionally handle error (e.g., show error message, redirect)
        } finally {
          setLoading(false);
        }
      };
    
      fetchUser();
    }, []); // Empty dependency array to run only once on mount
    const [activeTab, setActiveTab] = useState<string>("upcoming");
    const [hasEvents, setHasEvents] = useState<boolean>(true); // For demonstration, toggle to false to see empty state
    // Simulating past events by reversing the array and changing dates
    // Fetch some example data from Supabase
    function splitEventsByDate(events: EventData[]): { pastEvents: EventData[]; currentAndFutureEvents: EventData[] } {
      // Get today's date in UTC (year, month, and day only)
      const now = new Date();
      const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    
      const pastEvents: EventData[] = [];
      const currentAndFutureEvents: EventData[] = [];
    
      events.forEach(event => {
        const eventDate = new Date(event.event_date);
        // Get the UTC timestamp for the event's date (ignoring the time part)
        const eventUTC = Date.UTC(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate());
    
        if (eventUTC < todayUTC) {
          pastEvents.push(event);
        } else {
          currentAndFutureEvents.push(event);
        }
      });
    
      return { pastEvents, currentAndFutureEvents };
    }
    
    
    
    

  return (
    <div className="min-h-screen w-full bg-[#F1F0FB]">
      {/* Top Navigation */}
      
      <DashboardNavbar/>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Events</h1>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-auto"
          >
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {hasEvents ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mt-8">
              <Link href="/create">
                <Button className="bg-primary text-white" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Event
                </Button>
              </Link>
            </div>
            <EventTimeline events={activeTab === "upcoming" ? currEvents : pastEventDays} />
            
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center">
            <EmptyState />
            <h2 className="mt-8 text-2xl font-medium text-slate-600">No Upcoming Events</h2>
            <p className="mt-2 text-slate-500">You have no upcoming events. Why not host one?</p>
            <Link href="/create">
              <Button className="mt-8 bg-white text-black hover:bg-slate-100" size="lg">
                <Plus className="mr-1 h-4 w-4" />
                Create Event
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              {/* <a href="#" className="hover:text-slate-700">What's New</a>
              <a href="#" className="hover:text-slate-700">Discover</a>
              <a href="#" className="hover:text-slate-700">Pricing</a>
              <a href="#" className="hover:text-slate-700">Help</a> */}
            </div>
            <div className="flex items-center space-x-4">
              {/* <a href="#" className="text-slate-500 hover:text-slate-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a> */}
            </div>
          </div>
          <div className=" text-center">
            <a href="#" className="text-luma-600 hover:text-luma-700 flex items-center justify-center">
              Thanks so much for the support!
              {/* <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg> */}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
