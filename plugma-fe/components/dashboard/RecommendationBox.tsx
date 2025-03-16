'use client';
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Lightbulb, TrendingUp } from "lucide-react";

export const RecommendationsBox: React.FC = () => {
  // Mock LLM recommendations (REPLACE SOON w EXPRESS JS ENDPOINT)
  const recommendations = [
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

  const regenerateRecommendations = () => {
    // Function to regenerate recommendations (to be implemented)
    console.log("Regenerating recommendations...");
  }

  return (
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
    </Card>
  );
};