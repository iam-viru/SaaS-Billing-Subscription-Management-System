import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './modules/dashboard/dashboard';
import { Customers } from './modules/customers/customers';
import { Invoices } from './modules/invoices/invoices';
import { Settings } from './modules/settings/settings';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'customers', component: Customers },
  { path: 'invoices', component: Invoices },
  { path: 'settings', component: Settings },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
