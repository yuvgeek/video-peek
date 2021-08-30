import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';
import { UpdateEventComponent } from '../update-event/update-event.component';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import dayjs from 'dayjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  constructor(public eventsService: EventsService, public dialog: MatDialog) {}
  events!: any[];
  isLoading = true;

  sideNavItems = [
    { label: 'Events', route: '/events', icon: 'flag' },
    { label: 'Categories', route: '/categories', icon: 'category' },
    { label: 'Account', route: '/profile', icon: 'account_circle' }
  ];

  ngOnInit(): void {
    dayjs.extend(isSameOrAfter);

    this.eventsService.refreshEvents$
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(() => this.eventsService.getEvents())
      )
      .subscribe((val) => {
        this.events = val;
        this.isLoading = false;
      });
  }

  addEvent(): void {
    this.dialog.open(UpdateEventComponent, {
      data: {
        action: 'add',
      },
    });
  }

  showJoin(eventDate: Date) {
    return dayjs(eventDate).isSame(new Date(), 'date');
  }
}
