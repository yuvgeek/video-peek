import { Component, OnInit } from '@angular/core';
import { FullScreenService } from 'src/app/services/full-screen.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  makeToggleScreen: boolean = false;
  constructor(private fullScreenService: FullScreenService) {}

  ngOnInit(): void {
    this.fullScreenService.fullScreenToggle.subscribe((val) => {
      this.makeToggleScreen = val;
    });
  }
}
