export interface Step {
  id: string;
  label: string;
  durationMs: number;
  status: 'pending' | 'active' | 'completed' | 'hidden';
}