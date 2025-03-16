'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import  Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, Users, CalendarDays, Sparkles, ChevronRight, Laugh } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { RecommendationsBox } from "@/components/dashboard/RecommendationBox";
import { ChartToggle } from "@/components/dashboard/ChartToggle";
import AnalyticNavBar from "@/components/dashboard/AnalyticNavBar";

const EventDashboard = () => {
    const [selectedChart, setSelectedChart] = useState<'attendees' | 'engagement' | 'revenue'>('attendees');
  
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
  
    // Mock data for recent events
    const recentEvents = [
      { id: 1, name: "Product Launch", date: "June 15, 2023", attendees: 78, revenue: "$1,560" },
      { id: 2, name: "Tech Conference", date: "May 22, 2023", attendees: 124, revenue: "$2,480" },
      { id: 3, name: "Networking Mixer", date: "April 10, 2023", attendees: 45, revenue: "$900" },
    ];
  
    // Mock data for audience breakdown
    const audienceData = [
      { name: "First-time", value: 30, color: "#8B5CF6" },
      { name: "Returning", value: 45, color: "#22C55E" },
      { name: "VIP", value: 25, color: "#F97316" },
    ];
  
    return (
      <div className="min-h-screen bg-[#F1F0FB] pb-12">
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
  
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {eventStats.map((stat, index) => (
              <AnalyticsCard 
                key={index}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
  
          {/* Main Analytics Section */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
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
          </div>
  
          {/* Additional Analytics */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                      <TableHead>Revenue</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.attendees}</TableCell>
                        <TableCell>{event.revenue}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
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
          </div>
        </main>
      </div>
    );
  };
  
  export default EventDashboard;