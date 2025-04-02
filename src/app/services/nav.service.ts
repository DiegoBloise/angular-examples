import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.replace('/', '');
      }
    });
  }

  currentRoute = '';

  public get routes(): any {
    return routes;
  }

  public get pageTitle(): any {
    return routes.filter((l) => l.path === this.currentRoute)[0].title;
  }
}
