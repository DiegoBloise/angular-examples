import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private navService: NavService) {}

  date!: number;

  ngOnInit(): void {
    this.date = new Date().getFullYear();
  }

  get pageTitle() {
    return this.navService.pageTitle;
  }
}
