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

export function generateScrambledKey(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2);
  const uniqueString = (timestamp + randomPart + Math.random().toString(36).substring(2))
    .replace(/\./g, '')
    .slice(0, 32)
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
  
  return uniqueString.toUpperCase();
}

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
  id: string;
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
export type Event = {
  community_name: string;
  community_id: string;
  event_id: string;
  event_name: string;
  event_date: string;
  total_attendees: number;
  total_rsvps: number;
};
export type CommunityGroupedEvents = {
  [communityName: string]: Event[];
};
