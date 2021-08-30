import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

@NgModule({
  declarations: [AuthButtonComponent],
  imports: [CommonModule, RouterModule],
  exports: [AuthButtonComponent],
  entryComponents: [AuthButtonComponent],
})
export class AuthModule {}
