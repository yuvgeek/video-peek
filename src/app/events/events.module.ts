import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [
    EventListComponent,
    MeetingComponent,
    UpdateEventComponent,
    // CategoriesComponent,
    // SidebarComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
  ],
})
export class EventsModule {}
