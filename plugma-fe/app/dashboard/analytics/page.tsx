'use client';
import { use, useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, Users, CalendarDays, Sparkles, ChevronRight, Laugh, ChevronDown, Check } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { RecommendationsBox } from "@/components/dashboard/RecommendationBox";
import { ChartToggle } from "@/components/dashboard/ChartToggle";
import AnalyticNavBar from "@/components/dashboard/AnalyticNavBar";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import { SkeletonAnalyticsCard, SkeletonChart, SkeletonRecommendationsBox, SkeletonTable, SkeletonPieChart } from "@/components/dashboard/AnalyticSkeletons";
import { loadingStepsArr } from "@/lib/consts";
import { Step } from '@/lib/types';
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Event, CommunityGroupedEvents } from "@/lib/utils";
type eStats = {
  label: string;
  value: number | string;
  change: string;
  icon: any;
  color: string;
};
const EventDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState<'attendees' | 'engagement'>('attendees'); // add back revenue after MVP
  const [isLoading, setIsLoading] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState<Step[]>(loadingStepsArr);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [groupedEvent, setGroupedEvents] = useState<CommunityGroupedEvents>({});
  const [communityList, setCommunityList] = useState<any[]>([]);
  const [currCommName, setCurrCommName] = useState<string>('');
  const router = useRouter();
  const [eventStats, setEventStats] = useState<eStats[]>([]);
  const mockEStats = [
    { label: "Total Attendees", value: 247, change: "+12.5%", icon: Users, color: "bg-blue-500" },
    { label: "VIP Attendees", value: 20, change: "+8.2%", icon: Laugh, color: "bg-orange-500" },
    { label: "Events Hosted", value: 12, change: "+3.1%", icon: CalendarDays, color: "bg-violet-500" },
    { label: "Avg. Engagement", value: "87%", change: "+5.3%", icon: Sparkles, color: "bg-amber-500" },
  ];

  const attendeeData = [
    { month: "Jan", attendees: 120 },
    { month: "Feb", attendees: 145 },
    { month: "Mar", attendees: 160 },
    { month: "Apr", attendees: 185 },
    { month: "May", attendees: 210 },
    { month: "Jun", attendees: 247 },
  ];

  const engagementData = [
    { month: "Jan", engagement: 72 },
    { month: "Feb", engagement: 75 },
    { month: "Mar", engagement: 79 },
    { month: "Apr", engagement: 82 },
    { month: "May", engagement: 85 },
    { month: "Jun", engagement: 87 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 2100 },
    { month: "Feb", revenue: 2450 },
    { month: "Mar", revenue: 2800 },
    { month: "Apr", revenue: 3200 },
    { month: "May", revenue: 3750 },
    { month: "Jun", revenue: 4320 },
  ];

  const audienceData = [
    { name: "First-time", value: 30, color: "#8B5CF6" },
    { name: "Returning", value: 45, color: "#22C55E" },
    { name: "VIP", value: 25, color: "#F97316" },
  ];

  function groupEventsByCommunity(events: Event[]): CommunityGroupedEvents {
    return events.reduce((acc, event) => {
      if (!acc[event.community_name]) {
        acc[event.community_name] = [];
      }
      acc[event.community_name].push(event);
      
      return acc;
    }, {} as CommunityGroupedEvents);
  }
  const handleCommunityChange = useCallback((value: string) => {
    setCurrCommName(value);
    
    // Directly update recent events based on the selected community
    if (groupedEvent[value]) {
      setRecentEvents(groupedEvent[value]);
    }
  }, [recentEvents]);
  
  function processForCharts(events: Event[]): {
    attendeeData: { month: string; attendees: number }[];
    engagementData: { month: string; engagement: number }[];
  } {
    // Mapping of month indexes to month abbreviations.
    const monthMap = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Group data per month.
    // For each month we keep a running total of attendees, engagement, and event count.
    const groups: Record<string, { totalAttendees: number; totalEngagement: number; count: number }> = {};
  
    events.forEach(event => {
      // Parse the event date
      const date = new Date(event.event_date);
      // Get the month abbreviation from the month index (0-indexed)
      const month = monthMap[date.getMonth()];
  
      if (!groups[month]) {
        groups[month] = { totalAttendees: 0, totalEngagement: 0, count: 0 };
      }
      groups[month].totalAttendees += event.total_attendees;
      // Assume engagement is the total RSVPs for the event.
      groups[month].totalEngagement += event.total_rsvps;
      groups[month].count += 1;
    });
  
    // Create arrays for chart data.
    const attendeeData: { month: string; attendees: number }[] = [];
    const engagementData: { month: string; engagement: number }[] = [];
  
    // Calculate averages for each month.
    Object.keys(groups).forEach(month => {
      const { totalAttendees, totalEngagement, count } = groups[month];
      // Calculate average and round if desired.
      const avgAttendees = Math.round(totalAttendees / count);
      const avgEngagement = Math.round(totalEngagement / count);
  
      attendeeData.push({ month, attendees: avgAttendees });
      engagementData.push({ month, engagement: avgEngagement });
    });
  
    // Sort data arrays based on month order (using monthMap)
    attendeeData.sort((a, b) => monthMap.indexOf(a.month) - monthMap.indexOf(b.month));
    engagementData.sort((a, b) => monthMap.indexOf(a.month) - monthMap.indexOf(b.month));
  
    return { attendeeData, engagementData };
  }

  // fill out the eventStats array
  function processEStats(events: Event[]): eStats[] {
    const totalAttendees = events.reduce((acc, event) => acc + event.total_attendees, 0);
    const totalRSVPs = events.filter(event => event.total_rsvps).reduce((acc, event) => acc + event.total_rsvps, 0);
    const totalEvents = events.length;
    const totalEngagement = Math.round(events.reduce((acc, event) => acc + event.total_rsvps, 0) / events.length);

    function formatPercentageChange(value: number): string {
      const sign = value > 0 ? "+" : value < 0 ? "−" : "";
      return `${sign}${Math.abs(value).toFixed(1)}%`; 
    }
    
    return [
      { label: "Total Attendees", value: totalAttendees, change: formatPercentageChange(totalAttendees), icon: Users, color: "bg-blue-500" },
      { label: "Total RSVPs", value: totalRSVPs, change: formatPercentageChange(totalRSVPs), icon: Laugh, color: "bg-orange-500" },
      { label: "Events Hosted", value: totalEvents, change: totalEvents.toString(), icon: CalendarDays, color: "bg-violet-500" },
      { label: "Avg. Engagement", value: `${totalEngagement}%`, change: "+5.3%", icon: Sparkles, color: "bg-amber-500" },
    ]
  }

  // Fetch user using Supabase
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error("Error fetching user:", error);
          setLoading(false);
          return;
        }

        if (data.user) {
          setUser(data.user);
          setLoading(false);
        }
      } catch (error) {
        console.error("Unexpected error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserAndCommunityData = async () => {
      try {
        if(!user) return;
        
        const params = new URLSearchParams({ user_id: user.id });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/ds/getallcomms/?${params.toString()}`
        );
        
        if (res.ok) {
          const data = await res.json();
          setCommunityList(data);
          
          if (data && data.length > 0) {
            const initialCommunityName = data[0].name;
            setCurrCommName(initialCommunityName);
            
            // Fetch events for the initial community
            const eventsParams = new URLSearchParams({ user_id: user.id });
            const eventsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/ds/getallevents/?${eventsParams.toString()}`);
            
            if (eventsResponse.ok) {
              const eventsData = await eventsResponse.json();
              const groupedEvents = groupEventsByCommunity(eventsData);
              setGroupedEvents(groupedEvents);
              
              // Set recent events for the initial community
              if (groupedEvents[initialCommunityName]) {
                setRecentEvents(groupedEvents[initialCommunityName]);
                console.log("All data fetched:", data, eventsData);
              }
            }
          }
          
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user and community data:", error);
        setIsLoading(false);
      }
    };
  
    if (user) {
      fetchUserAndCommunityData();
    }
  }, [user]); // Depend on user now
  
  useEffect(() => {
    const fetchEventsByCommunity = async () => {
      // Run this after mounting and when the user ID and current community name are set
      if (!user || !currCommName) return;
  
      try {
        const groupedEventsForCommunity = groupedEvent[currCommName];
        
        if (groupedEventsForCommunity) {
          setRecentEvents(groupedEventsForCommunity);
          setEventStats(processEStats(groupedEventsForCommunity));
          /// TODO: CREATE FUNCTIONS THAT AGGREGATE DATA FOR THE CHARTS AND DATA POINTS
        }
      } catch (error) {
        console.error("Error fetching events by community:", error);
      }
    };
  
    fetchEventsByCommunity();
  }, [currCommName, groupedEvent, user]);
  
    return (
      <>
      <div className={`min-h-screen bg-[#F1F0FB] pb-12`}>
        <LoadingOverlay 
          isLoading={isLoading} 
          steps={loadingSteps} 
          message="Preparing your event preview..." 
          onComplete={() => setIsLoading(false)}
        />
        
        {/* Top Navigation */}
        <AnalyticNavBar />
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900">Event Analytics</h1>
            {/* Community Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[250px] justify-between">
                    {currCommName || "Select Community"}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px]">
                  <DropdownMenuLabel>Your Communities</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {communityList.map((comm) => (
                    <DropdownMenuItem 
                      key={comm.community_id}
                      onSelect={() => handleCommunityChange(comm.name)}
                      className="flex justify-between items-center"
                    >
                      <span>{comm.name}</span>
                      {currCommName === comm.name && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
  
          {/* Stats Cards - Skeleton or Real */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              // Skeleton Stats Cards
              [...Array(4)].map((_, index) => (
                <SkeletonAnalyticsCard key={index} />
              ))
            ) : (
              // Real Stats Cards
              eventStats.map((stat, index) => (
                <AnalyticsCard 
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))
            )}
          </div>
  
          {/* Main Analytics Section - Skeleton or Real */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {isLoading ? (
              // Skeleton Charts and Recommendations
              <>
                <SkeletonChart />
                <SkeletonRecommendationsBox />
              </>
            ) : (
              // Real Charts and Recommendations
              <>
                {/* Main Chart */}
                <Card className="col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Community Growth</CardTitle>
                      <CardDescription>Track your event performance over time</CardDescription>
                    </div>
                    <ChartToggle 
                      selectedChart={selectedChart} 
                      onChange={setSelectedChart} 
                    />
                  </CardHeader>
                  <CardContent className="pt-4">
                    {selectedChart === 'attendees' && (
                      <ChartContainer
                        config={{
                          attendees: { color: "#8B5CF6" }
                        }}
                        className="h-[300px] w-[90%]"
                      >
                        <BarChart data={processForCharts(recentEvents).attendeeData ? processForCharts(recentEvents).attendeeData : attendeeData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="attendees" fill="var(--color-attendees)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    )}
                    {selectedChart === 'engagement' && (
                      <ChartContainer
                        config={{
                          engagement: { color: "#22C55E" }
                        }}
                        className="h-[300px] w-[90%]"
                      >
                        <LineChart data={processForCharts(recentEvents).engagementData ? processForCharts(recentEvents).engagementData : engagementData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} />
                        </LineChart>
                      </ChartContainer>
                    )}
                    {/* {selectedChart === 'revenue' && (
                      <ChartContainer
                        config={{
                          revenue: { color: "#F97316" }
                        }}
                        className="h-[300px] w-[90%]"
                      >
                        <BarChart data={revenueData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    )} */}
                  </CardContent>
                </Card>
    
                {/* Insights & Recommendations */}
                <RecommendationsBox 
                  events={recentEvents}
                  currCommName={currCommName}
                />
              </>
            )}
          </div>
  
          {/* Additional Analytics - Skeleton or Real */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {isLoading ? (
              // Skeleton Tables and Pie Chart
              <>
                <SkeletonTable />
                <SkeletonPieChart />
              </>
            ) : (
              // Real Tables and Pie Chart
              <>
                {/* Recent Events */}
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                    <CardDescription>Performance of your last few events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Attendees</TableHead>
                          <TableHead>RSVPs</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {(recentEvents).map((event) => (
                              <TableRow key={event.event_id}>
                                <TableCell className="font-medium">{event.event_name}</TableCell>
                                <TableCell>
                                  {new Date(event.event_date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'numeric', 
                                    day: 'numeric' 
                                  })}
                                </TableCell>
                                <TableCell>{event.total_attendees}</TableCell>
                                <TableCell>{event.total_rsvps}</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => router.push(`/event/manage/${event.event_id}`)}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
    
                {/* Audience Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Breakdown</CardTitle>
                    <CardDescription>Types of attendees at your events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={audienceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            dataKey="value"
                          >
                            {audienceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex flex-col space-y-2">
                      {audienceData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="mr-2 h-3 w-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
      </>
    );
  };
  
  export default EventDashboard;