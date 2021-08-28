import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthModule as AppAuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { NavComponent } from './nav/nav.component';
@NgModule({
  declarations: [AppComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppAuthModule,
    HomeModule,
    AuthModule.forRoot({
      domain: 'dev-h1odmi8l.us.auth0.com',
      clientId: '0mMmLt1dk4LwuPWDsjtA0qhbrVO0JT9R',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
