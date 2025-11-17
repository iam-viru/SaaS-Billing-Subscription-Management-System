import { Injectable } from '@angular/core';
import { Invoice, InvoiceStatus } from '../models/invoice.model';
@Injectable({
  providedIn: 'root',
})
export class InvoiceService  {
  
  private data: Invoice[] = [];

  constructor() {
    // build some fake invoices
    const plans = ['Basic', 'Pro', 'Enterprise'] as const;
    const statuses: InvoiceStatus[] = ['Paid','Pending','Overdue'];

    for (let i = 1; i <= 45; i++) {
      const plan = plans[i % 3];
      const status = statuses[i % 3];
      const issue = new Date(2024, (i % 12), (i % 28) + 1);
      const due = new Date(issue);
      due.setDate(due.getDate() + 14);

      this.data.push({
        id: i,
        invoiceNumber: `INV-${1000 + i}`,
        customerName: `Customer ${i}`,
        customerEmail: `customer${i}@example.com`,
        plan,
        status,
        amount: plan === 'Basic' ? 19 : plan === 'Pro' ? 49 : 149,
        currency: 'USD',
        issueDate: issue.toISOString(),
        dueDate: due.toISOString()
      });
    }
  }

  list(): Invoice[] {
    return this.data;
  }

  add(inv: Invoice) {
  this.data.push({ ...inv });
}

}
