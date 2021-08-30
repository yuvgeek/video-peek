import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatsComponent } from './components/stats/stats.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    StatsComponent,
    DashboardComponent,
    UserProfileComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    MatProgressBarModule
  ],
})
export class DashboardModule {}
