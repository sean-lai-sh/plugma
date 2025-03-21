import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// Boilerplate for shadcn components pls don't remove
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type HostInfo = {
  host_name: string;
  profile_image: string;
};

export type EventType = {
  event_name: string;
  event_description: string;
  event_date: string; // TIMESTAMPTZ returned as ISO 8601 string
  end_date: string;
  image: string;
  capacity: number | null;
  payment_amount: number;
  payment_currency: string;
  location_address: string;
  location_name: string;
  virtual_meeting_url: string;
  approval_required: boolean;
  hosts_info: HostInfo[]; // JSONB array of hosts
  attendees_count: number;
};
