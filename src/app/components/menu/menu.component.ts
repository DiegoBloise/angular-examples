import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true,
})
export class MenuComponent {
  constructor(private navService: NavService) {}

  get routes() {
    return this.navService.routes;
  }

  get currentRoute() {
    return this.navService.currentRoute;
  }
}
