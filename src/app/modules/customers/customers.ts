import { Component,OnInit  } from '@angular/core';
import { Customer } from '../../core/models/customer.model';
import { CustomerService } from '../../core/services/customer';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  // sorting
  sortField: 'name' | 'email' | 'plan' | 'status' | 'mrr' | 'createdAt' | null = null;
  sortDir: 'asc' | 'desc' = 'asc';

      // search + paging
  q = '';
  page = 1;
  pageSize = 10;
  totalPages = 1;

   // modal/form state
  showModal = false;
  form!: Customer;
  plans = ['Basic','Pro','Enterprise'] as const;
  statuses = ['Active','Past Due','Canceled'] as const;

  ngOnInit(): void {
    this.all = this.customers.list();
    this.applyFilters();
  }

   // open modal with a copy of the row
  open(c: Customer) {
    this.form = { ...c };
    this.showModal = true;
  }
    close() { this.showModal = false; }

  save() {
  if (this.form.id > this.all.length) {
    // It's a new customer
    this.customers.add(this.form);
  } else {
    // It's an update
    this.customers.update(this.form);
  }

  this.all = this.customers.list();
  this.applyFilters();
  this.close();
}

   constructor(private customers: CustomerService) {}
  all: Customer[] = [];
  view: Customer[] = [];

    onSearch(val: string) {
    this.q = val.toLowerCase().trim();
    this.page = 1;
    this.applyFilters();
  }
  
  changePage(delta: number) {
    this.page = Math.min(this.totalPages, Math.max(1, this.page + delta));
    this.slicePage();
  }

  setPageSize(size: number) {
    this.pageSize = size;
    this.page = 1;
    this.applyFilters();
  }
  private applyFilters() {
    let filtered = !this.q
      ? this.all
      : this.all.filter(c =>
          (c.name + c.email + c.plan + c.status)
            .toLowerCase()
            .includes(this.q)
        );

    // 🔹 apply sorting
    if (this.sortField) {
      filtered = [...filtered].sort((a, b) => {
        const dir = this.sortDir === 'asc' ? 1 : -1;
        const fa = this.getFieldValue(a, this.sortField!);
        const fb = this.getFieldValue(b, this.sortField!);

        if (fa < fb) { return -1 * dir; }
        if (fa > fb) { return  1 * dir; }
        return 0;
      });
    }

    this.totalPages = Math.max(1, Math.ceil(filtered.length / this.pageSize));
    const start = (this.page - 1) * this.pageSize;
    this.view = filtered.slice(start, start + this.pageSize);
  }

    private getFieldValue(c: Customer, field: 'name' | 'email' | 'plan' | 'status' | 'mrr' | 'createdAt'): any {
    switch (field) {
      case 'name': return c.name.toLowerCase();
      case 'email': return c.email.toLowerCase();
      case 'plan': return c.plan;
      case 'status': return c.status;
      case 'mrr': return c.mrr;
      case 'createdAt': return c.createdAt;
    }
  }


  private slicePage() {
    let filtered = !this.q
      ? this.all
      : this.all.filter(c =>
          (c.name + c.email + c.plan + c.status)
            .toLowerCase()
            .includes(this.q)
        );

    if (this.sortField) {
      filtered = [...filtered].sort((a, b) => {
        const dir = this.sortDir === 'asc' ? 1 : -1;
        const fa = this.getFieldValue(a, this.sortField!);
        const fb = this.getFieldValue(b, this.sortField!);
        if (fa < fb) { return -1 * dir; }
        if (fa > fb) { return  1 * dir; }
        return 0;
      });
    }

    const start = (this.page - 1) * this.pageSize;
    this.view = filtered.slice(start, start + this.pageSize);
  }


  createNew() {
  this.form = {
    id: this.all.length + 1,     // Auto-generate ID
    name: '',
    email: '',
    plan: 'Basic',
    status: 'Active',
    mrr: 0,
    createdAt: new Date().toISOString()
  };

  this.showModal = true;
}

  sortBy(field: 'name' | 'email' | 'plan' | 'status' | 'mrr' | 'createdAt') {
    if (this.sortField === field) {
      // toggle asc/desc
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDir = 'asc';
    }
    this.applyFilters();
  }



}
