import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullScreenService {
  public fullScreenToggle: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor() {}
}
