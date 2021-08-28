import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <span
        (click)="auth.logout({ returnTo: document.location.origin })"
        class="btn btn-neutral btn-icon"
      >
        <span class="nav-link-inner--text">Logout</span>
      </span>
    </ng-container>

    <ng-template #loggedOut>
      <span (click)="auth.loginWithRedirect()" class="btn btn-neutral btn-icon">
        <span class="nav-link-inner--text">LOGIN</span>
      </span>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}
}
