export interface Customer {
  id: number;
  name: string;
  email: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Past Due' | 'Canceled';
  createdAt: string; // ISO date
  mrr: number;       // monthly recurring revenue
}
