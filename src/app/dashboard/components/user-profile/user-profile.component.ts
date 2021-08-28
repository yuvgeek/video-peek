import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(public auth: AuthService, private fb: FormBuilder) {}
  userProfile: FormGroup = this.fb.group({
    firstName: [],
  });
  ngOnInit(): void {}
}
