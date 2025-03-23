import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
// Skeleton components
export const SkeletonAnalyticsCard = () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
        <div className="mt-4 flex items-center">
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
  
  export const SkeletonChart = () => (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-36" />
      </CardHeader>
      <CardContent className="pt-4">
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
  
  export const SkeletonRecommendationsBox = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </CardContent>
    </Card>
  );
  
  export const SkeletonTable = () => (
    <Card className="col-span-2">
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex w-full gap-2">
            <Skeleton className="h-10 w-1/5" />
            <Skeleton className="h-10 w-1/5" />
            <Skeleton className="h-10 w-1/5" />
            <Skeleton className="h-10 w-1/5" />
            <Skeleton className="h-10 w-1/5" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex w-full gap-2">
              <Skeleton className="h-10 w-1/5" />
              <Skeleton className="h-10 w-1/5" />
              <Skeleton className="h-10 w-1/5" />
              <Skeleton className="h-10 w-1/5" />
              <Skeleton className="h-10 w-1/5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  
  export const SkeletonPieChart = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[250px] w-full rounded-full mx-auto my-4" />
        <div className="mt-4 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="h-3 w-3 rounded-full mr-2" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );