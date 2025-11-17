import { Component,OnInit } from '@angular/core';
import {  InvoiceService } from '../../core/services/invoice';
import { Invoice, InvoiceStatus } from '../../core/models/invoice.model';

@Component({
  selector: 'app-invoices',
  standalone: false,
  templateUrl: './invoices.html',
  styleUrl: './invoices.css',
})
export class Invoices implements OnInit {
   all: Invoice[] = [];
  view: Invoice[] = [];
  // modal state
  showModal = false;
  selected!: Invoice | null;

  q = '';
  statusFilter: InvoiceStatus | 'All' = 'All';

  page = 1;
  pageSize = 10;
  totalPages = 1;
  statuses: (InvoiceStatus | 'All')[] = ['All', 'Paid', 'Pending', 'Overdue'];
    constructor(private invoices: InvoiceService) {}
   ngOnInit(): void {
    this.all = this.invoices.list();
    this.applyFilters();
  }

  onSearch(val: string){
    this.q=val.toLocaleLowerCase().trim();
    this.page=1;
    this.applyFilters();
  }

  onStatusChange(value: string) {
    this.statusFilter = value as InvoiceStatus | 'All';
    this.page = 1;
    this.applyFilters();
  }

  setPageSize(size: number) {
    this.pageSize = size;
    this.page = 1;
    this.applyFilters();
  }

  changePage(delta: number) {
    this.page = Math.min(this.totalPages, Math.max(1, this.page + delta));
    this.slicePage();
  }

  private applyFilters() {
    let filtered = this.all;

    if (this.q) {
      filtered = filtered.filter(i =>
        (i.invoiceNumber + i.customerName + i.customerEmail + i.plan + i.status)
          .toLowerCase()
          .includes(this.q)
      );
    }

    if (this.statusFilter !== 'All') {
      filtered = filtered.filter(i => i.status === this.statusFilter);
    }

    this.totalPages = Math.max(1, Math.ceil(filtered.length / this.pageSize));
    const start = (this.page - 1) * this.pageSize;
    this.view = filtered.slice(start, start + this.pageSize);
  }

  private slicePage() {
    let filtered = this.all;

    if (this.q) {
      filtered = filtered.filter(i =>
        (i.invoiceNumber + i.customerName + i.customerEmail + i.plan + i.status)
          .toLowerCase()
          .includes(this.q)
      );
    }

    if (this.statusFilter !== 'All') {
      filtered = filtered.filter(i => i.status === this.statusFilter);
    }

    const start = (this.page - 1) * this.pageSize;
    this.view = filtered.slice(start, start + this.pageSize);
  }

    open(inv: Invoice) {
    // create a copy so editing doesn’t mutably change the table until Save
    this.selected = { ...inv };
    this.showModal = true;
  }

  close() {
    this.showModal = false;
    this.selected = null;
  }

  save() {
     if (!this.selected) return;

  const idx = this.all.findIndex(i => i.id === this.selected!.id);

  if (idx === -1) {
    // NEW INVOICE
    this.invoices.add(this.selected!);
  } else {
    // UPDATE EXISTING
    this.all[idx] = { ...this.selected! };
  }

  this.all = this.invoices.list();
  this.applyFilters();
  this.close();
  }

  createNew() {
  const nextId = this.all.length + 1;

  const issue = new Date();
  const due = new Date();
  due.setDate(issue.getDate() + 14);

  this.selected = {
    id: nextId,
    invoiceNumber: `INV-${1000 + nextId}`,
    customerName: '',
    customerEmail: '',
    plan: 'Basic',
    status: 'Pending',
    amount: 19,
    currency: 'USD',
    issueDate: issue.toISOString(),
    dueDate: due.toISOString()
  };

  this.showModal = true;
}




}
