'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, Users, CalendarDays, Sparkles, ChevronRight, Laugh } from "lucide-react";
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
import { set } from "date-fns";

const EventDashboard = () => {
    const [selectedChart, setSelectedChart] = useState<'attendees' | 'engagement' | 'revenue'>('attendees');
    const [isLoading, setIsLoading] = useState(true);
    const [loadingSteps, setLoadingSteps] = useState<Step[]>(loadingStepsArr);
    const [showWarning, setShowWarning] = useState(false);
    const [recentEvents, setRecentEvents] = useState<any[]>([]);
    const [userID, setUserID] = useState<string | null>(null);
    const [communityID, setCommunityID] = useState<string | null>(null);
    const [currCommName, setCurrCommName] = useState<string>('Personal');
    const router = useRouter();
    // Mock data for event stats
    const eventStats = [
      { label: "Total Attendees", value: 247, change: "+12.5%", icon: Users, color: "bg-blue-500" },
      { label: "VIP Attendees", value: 20, change: "+8.2%", icon: Laugh, color: "bg-orange-500" },
      { label: "Events Hosted", value: 12, change: "+3.1%", icon: CalendarDays, color: "bg-violet-500" },
      { label: "Avg. Engagement", value: "87%", change: "+5.3%", icon: Sparkles, color: "bg-amber-500" },
    ];
  
    // Mock data for attendee growth chart
    const attendeeData = [
      { month: "Jan", attendees: 120 },
      { month: "Feb", attendees: 145 },
      { month: "Mar", attendees: 160 },
      { month: "Apr", attendees: 185 },
      { month: "May", attendees: 210 },
      { month: "Jun", attendees: 247 },
    ];
  
    // Mock data for engagement chart
    const engagementData = [
      { month: "Jan", engagement: 72 },
      { month: "Feb", engagement: 75 },
      { month: "Mar", engagement: 79 },
      { month: "Apr", engagement: 82 },
      { month: "May", engagement: 85 },
      { month: "Jun", engagement: 87 },
    ];
  
    // Mock data for revenue chart
    const revenueData = [
      { month: "Jan", revenue: 2100 },
      { month: "Feb", revenue: 2450 },
      { month: "Mar", revenue: 2800 },
      { month: "Apr", revenue: 3200 },
      { month: "May", revenue: 3750 },
      { month: "Jun", revenue: 4320 },
    ];
  
    // Mock data for audience breakdown
    const audienceData = [
      { name: "First-time", value: 30, color: "#8B5CF6" },
      { name: "Returning", value: 45, color: "#22C55E" },
      { name: "VIP", value: 25, color: "#F97316" },
    ];

    useEffect(() => {
        const fetchUserID = async () => {
            // Fetch user and community data here
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
              console.log("User not found, redirecting...");
              setTimeout(() => router.push("/"), 5000);
              return;
            }
            setUserID(user.id);
            const user_id = user.id;
            const comm_name = currCommName; // Replace with actual community name if available
            const params = new URLSearchParams({ user_id, comm_name })
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/ds/getcommid/?${params.toString()}`);
            const data = await response.json();
            console.log(data);
            // extract community ID from the response and set it in state
            setCommunityID(data.comm_id);
            console.log("Community ID:", data.comm_id);

        }
        fetchUserID();
    },[]);
    useEffect(() => {
      if (!userID || !communityID) return;
    
      const getcommevents = async () => {
        const params = new URLSearchParams({ user_id: userID, comm_id: communityID });
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/ds/recentcommunity/?${params.toString()}`);
        const data = await response.json();
        console.log(data);
        setRecentEvents(data);
      };
    
      getcommevents();
    }, [userID, communityID]);

  
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
            <Tabs defaultValue="overview" className="w-auto">
              <TabsList className="grid w-[300px] grid-cols-1"> 
                {/* Change to grid-cols-3 when ready */}
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {/* <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger> */}
              </TabsList>
            </Tabs>
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
                        <BarChart data={attendeeData}>
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
                        <LineChart data={engagementData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} />
                        </LineChart>
                      </ChartContainer>
                    )}
                    {selectedChart === 'revenue' && (
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
                    )}
                  </CardContent>
                </Card>
    
                {/* Insights & Recommendations */}
                <RecommendationsBox />
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
                    <CardDescription>Performance of your last 3 events</CardDescription>
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
                        {recentEvents.map((event) => (
                          <TableRow key={event.event_id}>
                            <TableCell className="font-medium">{event.event_name}</TableCell>
                            <TableCell>{
                              // Format the date to a more readable format
                              new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
                              }</TableCell>
                            <TableCell>{event.total_attendees}</TableCell>
                            <TableCell>{event.total_rsvps}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" onClick={() => router.push(`/event/manage/${event.event_id}`)}>
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
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