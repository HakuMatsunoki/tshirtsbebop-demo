import { Component, OnInit } from '@angular/core';

import { Service } from './shared/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'T-Shirts Bebop Shop';

  constructor(public service: Service) {}

  ngOnInit() {
    this.service.fetchProducts().subscribe();
    this.service.fetchMe().subscribe();
  }
}
