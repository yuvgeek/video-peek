import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatsComponent } from './components/stats/stats.component';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    StatsComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
