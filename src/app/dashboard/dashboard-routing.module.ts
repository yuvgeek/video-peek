import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  { path: 'profile', component: UserProfileComponent },
  {
    path: 'events',
    loadChildren: () =>
      import('../events/events.module').then((m) => m.EventsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
