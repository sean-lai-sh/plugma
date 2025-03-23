'use client';

import { useState, useEffect } from 'react';
import LoadingOverlay from "@/components/general/LoadingOverlay";
import { Step } from '@/lib/types';
import { loadingStepsArr } from '@/lib/consts';

type AnalyticsLoaderProps = {
  children: React.ReactNode;
};

export default function AnalyticsLoader({ children }: AnalyticsLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState<Step[]>(loadingStepsArr);

  useEffect(() => {
    // You could also check sessionStorage to not show loading on subsequent visits
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust timeout as needed
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingOverlay 
        isLoading={isLoading} 
        steps={loadingSteps} 
        message="Preparing your event preview..." 
        onComplete={() => setIsLoading(false)}
      />
      {children}
    </>
  );
}