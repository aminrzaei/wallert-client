import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';
import {
  DashboardComponent,
  DashboardComponentDialog,
} from './page/dashboard/dashboard.component';
import { CreateComponent } from './page/create/create.component';

@NgModule({
  declarations: [DashboardComponent, DashboardComponentDialog, CreateComponent],
  imports: [DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
