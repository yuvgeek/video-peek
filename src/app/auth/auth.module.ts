import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

@NgModule({
  declarations: [AuthButtonComponent],
  imports: [CommonModule],
  exports: [AuthButtonComponent],
  entryComponents: [AuthButtonComponent],
})
export class AuthModule {}
