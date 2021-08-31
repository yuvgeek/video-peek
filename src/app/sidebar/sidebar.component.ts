import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'DASHBOARD',
    icon: 'ni-tv-2 text-primary',
    class: '',
  },
  {
    path: '/profile',
    title: 'PROFILE',
    icon: 'ni-single-02 text-yellow',
    class: '',
  },
  {
    path: '/events',
    title: 'EVENTS',
    icon: 'ni-events-02 text-yellow',
    class: '',
  },
  {
    path: '/categories',
    title: 'CATEGORIES',
    icon: 'ni-events-02 text-yellow',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems!: any[];
  public isCollapsed = true;

  sideNavItems = [
    { label: 'Events', route: '/events', icon: 'flag' },
    // { label: 'Schedule', route: '/schedule', icon: 'flag' },
    { label: 'Categories', route: '/categories', icon: 'category' },
    { label: 'Profile', route: '/profile', icon: 'account_circle' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
