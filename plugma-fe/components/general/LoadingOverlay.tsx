import React from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  isLoading: boolean;
  loadingSteps?: { 
    label: string;
    progress: number;
  }[];
  message?: string;
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  loadingSteps,
  message = "Loading...",
  className
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-200",
      className
    )}>
      <div className="w-full max-w-md rounded-lg bg-white/90 p-6 shadow-lg dark:bg-gray-900/90">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          
          <h3 className="text-lg font-medium text-center">{message}</h3>
          
          {loadingSteps ? (
            <div className="w-full space-y-4">
              {loadingSteps.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{step.label}</span>
                    <span className="text-sm font-medium">{step.progress}%</span>
                  </div>
                  <Progress value={step.progress} className="h-2" />
                </div>
              ))}
            </div>
          ) : (
            <Progress value={100} className="h-2 w-full animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;