import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule as AppAuthModule } from './auth/auth.module';
import { AdminLayoutComponent } from './dashboard/components/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';
import { HomeModule } from './home/home.module';
import { NavComponent } from './nav/nav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    NavbarComponent,
    AdminLayoutComponent,
    GuestLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppAuthModule,
    HomeModule,
    NgbModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSelectModule,
    AuthModule.forRoot({
      domain: 'dev-h1odmi8l.us.auth0.com',
      clientId: '0mMmLt1dk4LwuPWDsjtA0qhbrVO0JT9R',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
