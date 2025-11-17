 import { Component, OnInit } from '@angular/core';
import {CustomerService  } from '../../core/services/customer';
import { InvoiceService } from '../../core/services/invoice';
import { Customer } from '../../core/models/customer.model';
import { Invoice } from '../../core/models/invoice.model';
import 'chart.js/auto';

import { ChartConfiguration, ChartOptions } from 'chart.js';
interface DashboardMetrics {
  totalCustomers: number;
  activeCustomers: number;
  monthlyRecurringRevenue: number;
  pendingInvoicesAmount: number;
  overdueInvoicesAmount: number;
  overdueInvoicesCount: number;
  paidInvoicesAmount: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
 


    // invoice detail modal
  showInvoiceModal = false;
  selectedInvoice: Invoice | null = null;

    openInvoice(inv: Invoice) {
    this.selectedInvoice = inv;
    this.showInvoiceModal = true;
  }

  closeInvoiceModal() {
    this.showInvoiceModal = false;
    this.selectedInvoice = null;
  }

    // time range for charts + invoice-based metrics
  range: '3m' | '6m' | '12m' | 'all' = '12m';
  filteredInvoices: Invoice[] = [];

  customers: Customer[] = [];
  invoices: Invoice[] = [];

  metrics = {
    totalCustomers: 0,
    activeCustomers: 0,
    monthlyRecurringRevenue: 0,
    pendingInvoicesAmount: 0,
    overdueInvoicesAmount: 0,
    overdueInvoicesCount: 0,
    paidInvoicesAmount: 0
  };

  recentInvoices: Invoice[] = [];

  // REVENUE CHART
  revenueChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Revenue',
        fill: true,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

 revenueChartOptions: ChartOptions<'line'> = {
  responsive: true,
  animation: {
    duration: 800,
    easing: 'easeOutQuart',
  },
  scales: {
    y: { beginAtZero: true }
  },
  plugins: {
    legend: { display: false }
  }
};


  // PLAN DISTRIBUTION CHART
  planChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Basic', 'Pro', 'Enterprise'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24']
      }
    ]
  };

 planChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  animation: {
    duration: 900,
    easing: 'easeOutBack'
  },
  plugins: {
    legend: { position: 'bottom' }
  }
};

viewInvoice(inv: Invoice) {
  alert('Invoice details coming soon: ' + inv.invoiceNumber);
}

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.customers = this.customerService.list();
    this.invoices = this.invoiceService.list();

    this.computeMetrics();
    this.computeRecentInvoices();
    this.computeCharts();
      this.applyRange();
  }

  // -----------------------------------------
  // KPIs
  // -----------------------------------------

   private computeMetrics() {
    // customers are always global (not filtered by date)
    this.metrics.totalCustomers = this.customers.length;
    this.metrics.activeCustomers = this.customers.filter(c => c.status === 'Active').length;

    this.metrics.monthlyRecurringRevenue = this.customers
      .filter(c => c.status === 'Active')
      .reduce((sum, c) => sum + c.mrr, 0);

    const source = this.filteredInvoices;

    for (const inv of source) {
      if (inv.status === 'Pending') this.metrics.pendingInvoicesAmount += inv.amount;
      if (inv.status === 'Paid') this.metrics.paidInvoicesAmount += inv.amount;
      if (inv.status === 'Overdue') {
        this.metrics.overdueInvoicesAmount += inv.amount;
        this.metrics.overdueInvoicesCount++;
      }
    }
  }


    private computeRecentInvoices() {
    const src = this.filteredInvoices.length ? this.filteredInvoices : this.invoices;

    this.recentInvoices = [...src]
      .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
      .slice(0, 5);
  }


  // -----------------------------------------
  // CHARTS
  // -----------------------------------------

  private computeCharts() {
    this.buildRevenueByMonthChart();
    this.buildPlanDistributionChart();
  }

    private buildRevenueByMonthChart() {
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const totals: any = {};
    const src = this.filteredInvoices.length ? this.filteredInvoices : this.invoices;

    src.forEach(inv => {
      const d = new Date(inv.issueDate);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      totals[key] = (totals[key] || 0) + inv.amount;
    });

    const labels = Object.keys(totals);
    const data = labels.map(l => totals[l]);

    this.revenueChartData.labels = labels;
    this.revenueChartData.datasets[0].data = data;
  }


  private buildPlanDistributionChart() {
    const plans = ['Basic','Pro','Enterprise'] as const;
    const counts = { Basic: 0, Pro: 0, Enterprise: 0 };

    this.customers.forEach(c => {
      if (c.status === 'Active') counts[c.plan]++;
    });

    this.planChartData.datasets[0].data = plans.map(p => counts[p]);
  }

    setRange(range: '3m' | '6m' | '12m' | 'all') {
    if (this.range === range) return;
    this.range = range;
    this.applyRange();
  }

  private applyRange() {
    const now = new Date();
    let cutoff: Date | null = null;

    if (this.range === '3m') {
      cutoff = new Date(now);
      cutoff.setMonth(now.getMonth() - 3);
    } else if (this.range === '6m') {
      cutoff = new Date(now);
      cutoff.setMonth(now.getMonth() - 6);
    } else if (this.range === '12m') {
      cutoff = new Date(now);
      cutoff.setMonth(now.getMonth() - 12);
    } else {
      cutoff = null; // 'all'
    }

    this.filteredInvoices = cutoff
      ? this.invoices.filter(inv => new Date(inv.issueDate) >= cutoff!)
      : [...this.invoices];

    this.resetMetrics();
    this.computeMetrics();
    this.computeRecentInvoices();
    this.computeCharts();
  }

  private resetMetrics() {
    this.metrics = {
      totalCustomers: 0,
      activeCustomers: 0,
      monthlyRecurringRevenue: 0,
      pendingInvoicesAmount: 0,
      overdueInvoicesAmount: 0,
      overdueInvoicesCount: 0,
      paidInvoicesAmount: 0
    };
  }

}
