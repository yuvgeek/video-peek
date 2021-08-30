import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public refreshEvents$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http
      .get('.netlify/functions/events')
      .pipe(map((res: any) => res.data));
  }

  updateEvents(event: any): Observable<any> {
    return this.http
      .post('.netlify/functions/update-events', event)
      .pipe(tap(() => this.refreshEvents$.next(true)));
  }
}
