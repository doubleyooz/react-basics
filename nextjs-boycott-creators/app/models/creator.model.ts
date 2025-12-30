export interface Creator {
  id: string;
  name: string;
  impact: 'low' | 'medium' | 'high' | 'very-high';
  description: string;
  platform: string;
  logo?: string;
  initials?: string;
}
