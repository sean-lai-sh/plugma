import { clsx, type ClassValue } from "clsx"
import { At } from "framer-motion";
import { twMerge } from "tailwind-merge"
// Boilerplate for shadcn components pls don't remove
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type HostInfo = {
  host_name: string;
  profile_image: string;
};

export interface EventDetails {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  checkedInCount: number;
  isEnded: boolean;
}
export interface NavItem {
  label: string;
  href: string;
}

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

export interface AttendeeInfo {
  status: string;
  attended: boolean;
  rsvp_status: string;
  attendee_name: string;
  profile_image: string;
  attendee_email: string;
}


export type manageEventType = {
  event_name: string;
  event_description: string;
  event_date: string; // TIMESTAMPTZ returned as ISO 8601 string
  end_date: string;
  image: string;
  capacity: number | null;
  community_id: string;
  payment_amount: number;
  payment_currency: string;
  location_address: string;
  location_name: string;
  virtual_meeting_url: string;
  approval_required: boolean;
  hosts_info: HostInfo[]; // JSONB array of hosts
  attendees: AttendeeInfo[]; // JSONB array of attendees
};
