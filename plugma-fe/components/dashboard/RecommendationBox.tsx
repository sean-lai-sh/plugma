'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Lightbulb, TrendingUp } from "lucide-react";
import { Event } from "@/lib/utils";
import { set } from "date-fns";
import { Skeleton } from "../ui/skeleton";
const mockReccs = [
  {
    id: 1,
    title: "Increase engagement",
    description: "Try sending personalized follow-up emails within 48 hours after events to boost repeat attendance.",
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "Optimize pricing",
    description: "Your $49 price point shows the highest conversion rate. Consider making this your standard tier.",
    icon: Lightbulb,
  },
  {
    id: 3,
    title: "Community growth",
    description: "Tuesday events have 27% higher attendance than weekend events based on your last 6 months of data.",
    icon: Sparkles,
  },
];
export const RecommendationsBox = ({events, currCommName}:{events:Event[], currCommName: string}) => {
  // Mock LLM recommendations (REPLACE SOON w EXPRESS JS ENDPOINT)
  const recommendationsMock = mockReccs;
  const [recommendations, setRecommendations] = useState<Recommendation[]>(recommendationsMock);
  const [loading, setLoading] = useState(false);
  const cacheKey = 'recommendations';
  const regenerateRecommendations = async () => {
    // Function to regenerate recommendations (to be implemented)
    console.log("Regenerating recommendations...");
    setLoading(true);
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userPrompt: formatEventsAsText(events) }),
    });
    console.log(response);
    const data = await response.json();
    if(data) {
      setRecommendations(parseRecommendations(data.result))
      console.log("Fetched recommendations:", data.result);
      localStorage.setItem(cacheKey, JSON.stringify(data.result));
    };
    setLoading(false);
  }

  // Optional icon bank – fallback to null if you want no icon logic
  const icons = [TrendingUp, Lightbulb, Sparkles];

  type Recommendation = {
    id: number;
    title: string;
    description: string;
    icon: any;
  };

 function parseRecommendations(text: string): Recommendation[] {
    const recBlocks = text
      .split(/\n(?=\d+\.\s)/) // split at lines like "1. ", "2. " etc.
      .map((block) => block.trim())
      .filter(Boolean);

    const parsed: Recommendation[] = recBlocks.map((block, index) => {
      const id = index + 1;

      const titleMatch = block.match(/^\d+\.\s(.+?)(?:\n|$)/);
      const descriptionMatch = block.match(/\d+a\.\s([\s\S]+)/);

      const title = titleMatch ? titleMatch[1].trim() : `Recommendation ${id}`;
      const description = descriptionMatch ? descriptionMatch[1].trim() : "";

      return {
        id,
        title,
        description,
        icon: icons[index % icons.length],
      };
    });

    return parsed;
  }


  function formatEventsAsText(events: any[]): string {
    return events.map((event, index) => {
      const date = new Date(event.event_date).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
  
      return `Event ${index + 1}:
  - Community: ${event.community_name}
  - Event Name: ${event.event_name}
  - Date: ${date}
  - Total Attendees: ${event.total_attendees}
  - Total RSVPs: ${event.total_rsvps}
  - Image URL: ${event.event_image_url}
  `;
    }).join('\n');
  }
  

  useEffect(() => {
    // Fetch recommendations on component mount (to be implemented)
    console.log("Fetching recommendations...");
    const fetchRecommendations = async () => {
      if(events.length === 0) {
        console.log("No event data found.");
        return;
      }
      setLoading(true);
      // double check if we already have recommendations
      
      const cached = localStorage.getItem(cacheKey);
      const prevName = localStorage.getItem('currCommName');
      if (cached && prevName &&  prevName === currCommName) {
        console.log("Loaded recommendations from cache");
        setRecommendations(parseRecommendations(JSON.parse(cached)));
        return;
      }

      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: formatEventsAsText(events) }),
      });
      console.log(response);
      const data = await response.json();
      if(data) {
        setRecommendations(parseRecommendations(data.result))
        console.log("Fetched recommendations:", data.result);
        localStorage.setItem(cacheKey, JSON.stringify(data.result));
        localStorage.setItem('currCommName', currCommName);
      };
      setLoading(false);
    }
    fetchRecommendations();
  },[currCommName]);
  if(loading) {
    return <RecommendationSkeleton />
  }
  return (
    <>
    <Card className="h-full w-full">
      <CardHeader className="pb-3 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Here's what we're seeing</CardTitle>
          <Sparkles className="h-4 w-4 text-purple-500" onClick={regenerateRecommendations} />
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex flex-col space-y-4">
          {recommendations.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <div className="mt-0.5 rounded-full bg-purple-100 p-1.5 text-purple-600">
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-md bg-slate-50 p-3">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-600">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-600">
                Based on your growth trend, you're on track to reach 500+ attendees by Q4 2023 if current marketing efforts continue.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card></>
  );
};

export default function RecommendationSkeleton() {
  return (
    <Card className="h-full w-full">
      <CardHeader className="pb-3 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Here's what we're seeing</CardTitle>
          <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="mt-0.5 rounded-full bg-purple-100 p-1.5 text-purple-600">
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-72" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-md bg-slate-50 p-3">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-600">
              <Lightbulb className="h-4 w-4 animate-pulse" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-64" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}