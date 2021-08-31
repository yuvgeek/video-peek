import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  constructor(private http: HttpClient) {}

  getPeers(meetingId: string) {
    const params = { meetingId };
    return this.http
      .get('.netlify/functions/meeting-peers', { params })
      .pipe(map((res: any) => res.data));
  }

  updatePeers(meetingId: string, userId: string, peerId: string) {
    const postBody = { meetingId, userId, peerId };
    return this.http
      .post('.netlify/functions/update-meeting-peers', postBody)
      .pipe(map((res: any) => res.data));
  }
}
