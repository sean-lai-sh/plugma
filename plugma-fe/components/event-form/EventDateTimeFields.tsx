import React from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface EventDateTimeFieldsProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const EventDateTimeFields = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: EventDateTimeFieldsProps) => {
  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return {
      value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      label: `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`
    };
  });

  return (
    <div className="space-y-4">
      {/* Start Date & Time */}
      <div className="flex items-center bg-white p-5 rounded-lg shadow-sm">
        <Clock className="text-gray-400 mr-4" size={20} />
        <span className="text-gray-500 w-20">Start</span>
        
        <div className="flex flex-1 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left w-40"
              >
                {format(startDate, "EEE, MMM d")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={(date) => date && onStartDateChange(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          <Select
            value={format(startDate, "HH:mm")}
            onValueChange={(value) => {
              const [hours, minutes] = value.split(':').map(Number);
              const newDate = new Date(startDate);
              newDate.setHours(hours, minutes);
              onStartDateChange(newDate);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue>{format(startDate, "h:mm a")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time.value} value={time.value}>
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* End Date & Time */}
      <div className="flex items-center bg-white p-5 rounded-lg shadow-sm">
        <Clock className="text-gray-400 mr-4" size={20} />
        <span className="text-gray-500 w-20">End</span>
        
        <div className="flex flex-1 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left w-40"
              >
                {format(endDate, "EEE, MMM d")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={(date) => date && onEndDateChange(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          <Select
            value={format(endDate, "HH:mm")}
            onValueChange={(value) => {
              const [hours, minutes] = value.split(':').map(Number);
              const newDate = new Date(endDate);
              newDate.setHours(hours, minutes);
              onEndDateChange(newDate);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue>{format(endDate, "h:mm a")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time.value} value={time.value}>
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default EventDateTimeFields;