export interface Step {
  id: string;
  label: string;
  durationMs: number;
  status: 'pending' | 'active' | 'completed' | 'hidden';
}

export interface GuestStats {
  going: number;
  maybe: number;
  notGoing: number;
  capacity: number | null;
}

export interface commInfo {
  community_id: string;
  creator_id: string;
  name: string;
  description: string | null;
}

export type EventData = {
  community_name: string;
  community_id: string;
  event_id: string;
  event_name: string;
  event_date: string; // ISO date string
  event_image_url: string;
  total_attendees: number;
  total_rsvps: number;
};