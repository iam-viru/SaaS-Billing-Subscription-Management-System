export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

export interface Invoice {
  id: number;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: InvoiceStatus;
  amount: number;
  currency: string;
  issueDate: string; // ISO
  dueDate: string;   // ISO
}
