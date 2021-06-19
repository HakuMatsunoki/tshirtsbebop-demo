import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(public service: Service) {}

  ngOnInit(): void {}
}
