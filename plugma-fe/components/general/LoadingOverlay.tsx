import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Step } from '@/lib/types';


interface LoadingOverlayProps {
  isLoading: boolean;
  steps?: Step[];
  message?: string;
  className?: string;
  onComplete?: () => void;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  steps = [],
  message = "Loading...",
  className,
  onComplete
}) => {
  const [visibleSteps, setVisibleSteps] = useState<{
    currentIndex: number;
    nextIndex: number;
    steps: Record<string, {
      progress: number;
      status: 'pending' | 'active' | 'completed' | 'hidden';
    }>;
  }>({
    currentIndex: 0,
    nextIndex: 1,
    steps: {}
  });

  useEffect(() => {
    if (!isLoading || steps.length === 0) return;

    // Initialize step states
    const initialStepStates = steps.reduce((acc, step, index) => {
      acc[step.id] = {
        progress: 0,
        status: index === 0 ? 'active' : index === 1 ? 'pending' : 'hidden'
      };
      return acc;
    }, {} as Record<string, { progress: number; status: 'pending' | 'active' | 'completed' | 'hidden' }>);

    setVisibleSteps({
      currentIndex: 0,
      nextIndex: steps.length > 1 ? 1 : -1,
      steps: initialStepStates
    });

    // Process steps
    let currentStepIndex = 0;
    let processingComplete = false;

    const processStep = (index: number) => {
      if (index >= steps.length) {
        if (!processingComplete) {
          processingComplete = true;
          // Ensure onComplete is called after all steps are completed
          if (onComplete) {
            setTimeout(() => onComplete(), 500);
          }
        }
        return;
      }

      const currentStep = steps[index];
      const updateInterval = 20; // Update progress every 20ms
      const incrementAmount = 100 / (currentStep.durationMs / updateInterval);
      let progress = 0;
      
      // Progress animation
      const progressInterval = setInterval(() => {
        progress = Math.min(progress + incrementAmount, 100);
        
        setVisibleSteps(prev => ({
          ...prev,
          steps: {
            ...prev.steps,
            [currentStep.id]: {
              ...prev.steps[currentStep.id],
              progress
            }
          }
        }));

        if (progress >= 100) {
          clearInterval(progressInterval);
          
          // Mark current step as completed
          setVisibleSteps(prev => ({
            ...prev,
            steps: {
              ...prev.steps,
              [currentStep.id]: {
                ...prev.steps[currentStep.id],
                status: 'completed'
              }
            }
          }));

          // Move to next step after short delay
          setTimeout(() => {
            const nextStepIndex = index + 1;
            const nextNextIndex = nextStepIndex + 1 < steps.length ? nextStepIndex + 1 : -1;
            
            // Update visible steps
            setVisibleSteps(prev => {
              const updatedSteps = { ...prev.steps };
              
              // Current step is now hidden
              if (updatedSteps[currentStep.id]) {
                updatedSteps[currentStep.id].status = 'hidden';
              }
              
              // Next step becomes active
              if (nextStepIndex < steps.length) {
                updatedSteps[steps[nextStepIndex].id].status = 'active';
              }
              
              // First make next-next step hidden to ensure clean transition
              if (nextNextIndex >= 0 && nextNextIndex < steps.length) {
                updatedSteps[steps[nextNextIndex].id].status = 'hidden';
              }
              
              return {
                currentIndex: nextStepIndex,
                nextIndex: nextNextIndex,
                steps: updatedSteps
              };
            });
            
            // After a 50ms delay, make the next-next step pending (if it exists)
            if (nextNextIndex >= 0 && nextNextIndex < steps.length) {
              setTimeout(() => {
                setVisibleSteps(prev => ({
                  ...prev,
                  steps: {
                    ...prev.steps,
                    [steps[nextNextIndex].id]: {
                      ...prev.steps[steps[nextNextIndex].id],
                      status: 'pending'
                    }
                  }
                }));
              }, 75); // 50ms delay for revealing the next item
            }
            
            // Process next step
            if (nextStepIndex < steps.length) {
              processStep(nextStepIndex);
            } else if (!processingComplete) {
              // This ensures onComplete is called if we're at the end
              processingComplete = true;
              if (onComplete) {
                setTimeout(() => onComplete(), 500);
              }
            }
          }, 500);
        }
      }, updateInterval);
    };

    // Start with the first step
    processStep(currentStepIndex);

    return () => {
      // This ensures onComplete doesn't get called if the component unmounts
      processingComplete = true;
    };
  }, [isLoading, steps, onComplete]);

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
          
          <div className="w-full relative h-28 overflow-hidden">
            {steps.map((step, index) => {
              const stepState = visibleSteps.steps[step.id] || { progress: 0, status: 'hidden' };
              const isCurrent = index === visibleSteps.currentIndex;
              const isNext = index === visibleSteps.nextIndex;
              
              if (stepState.status === 'hidden') return null;
              
              return (
                <div 
                  key={step.id} 
                  className={cn(
                    "absolute w-full transition-all duration-500 ease-in-out space-y-2",
                    isCurrent && "top-0 opacity-100 translate-y-0",
                    isNext && "top-16 opacity-60 translate-y-0"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span 
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors duration-300",
                          stepState.status === 'pending' ? "bg-gray-300 dark:bg-gray-600" : 
                          stepState.status === 'active' ? "bg-blue-500 animate-pulse" : 
                          "bg-green-500"
                        )}
                      />
                      <span className={cn(
                        "text-sm transition-colors duration-300",
                        stepState.status === 'pending' ? "text-gray-500 dark:text-gray-400" : 
                        stepState.status === 'active' ? "text-blue-600 dark:text-blue-400 font-medium" : 
                        "text-green-600 dark:text-green-400"
                      )}>
                        {step.label}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{Math.round(stepState.progress)}%</span>
                  </div>
                  <Progress 
                    value={stepState.progress} 
                    className={cn(
                      "h-2 transition-all duration-300", 
                      stepState.status === 'active' ? "bg-gray-200 dark:bg-gray-700" :
                      stepState.status === 'completed' ? "bg-gray-100 dark:bg-gray-800" :
                      "bg-gray-100 dark:bg-gray-800 opacity-70"
                    )} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;