import { Component, signal } from '@angular/core';
import { ModulesModule } from './modules/modules-module';
import{} from './shared/shared-module';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('subscription-billing-ui');
}
