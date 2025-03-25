import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { GuestStats } from "@/lib/types";

type MultiProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  data: GuestStats;
};

const EventProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  MultiProgressProps
>(({ className, data, ...props }, ref) => {
  const total = data.capacity ? data.capacity : data.going + data.maybe + data.notGoing; // change depending on the data you have
  const scale = total > 100 ? 100 / total : 1;
  const remainder = 100 - (data.going * scale + data.maybe * scale + data.notGoing * scale);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-500 flex",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-green-500 transition-all"
        style={{ width: `${data.going * scale}%` }}
      />
      <div
        className="h-full bg-orange-400 transition-all"
        style={{ width: `${data.maybe * scale}%` }}
      />
      <div
        className="h-full bg-red-500 transition-all"
        style={{ width: `${data.notGoing * scale}%` }}
      />
      { remainder >0 &&
        <div
        className="h-full bg-gray-600 transition-all"
        style={{ width: `${remainder * scale}%` }}
      />
      }
    </ProgressPrimitive.Root>
  );
});
EventProgress.displayName = ProgressPrimitive.Root.displayName;

export { EventProgress };
