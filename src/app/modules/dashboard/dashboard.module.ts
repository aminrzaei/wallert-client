import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';
import {
  DashboardComponent,
  DashboardComponentDialog,
} from './page/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent, DashboardComponentDialog],
  imports: [DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
