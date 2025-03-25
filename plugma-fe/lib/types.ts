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