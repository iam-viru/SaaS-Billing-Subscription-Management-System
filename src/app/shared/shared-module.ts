import { model, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { RouterModule } from '@angular/router';
import { Modal } from './modal/modal';



@NgModule({
  declarations: [
    Header,
    Sidebar,
    Modal
  ],
  imports: [
    CommonModule,RouterModule
  ],
  exports: [
    Header,
    Sidebar,
    Modal
  ]
})
export class SharedModule { }
