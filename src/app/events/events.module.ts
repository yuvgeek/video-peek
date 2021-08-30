import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './components/event-list/event-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MeetingComponent } from './components/meeting/meeting.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EventListComponent, MeetingComponent],
  imports: [CommonModule, EventsRoutingModule, MatSelectModule, FormsModule],
})
export class EventsModule {}
