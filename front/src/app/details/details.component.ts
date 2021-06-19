import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  order: any = null;
  constructor(public service: Service, public router: Router) {}

  ngOnInit(): void {
    const index = this.service.currentOrderIndex;
    if (index === null) this.router.navigate(['me']);
    else this.order = this.service.userOrders[index];
  }

  get orderDate() {
    const options: any = {
      dateStyle: 'medium',
      timeStyle: 'medium',
    };

    return new Date(Date.parse(this.order.date)).toLocaleString(
      'en-US',
      options
    );
  }

  get totalPrice() {
    return this.service.orderDetails.reduce((acc, item) => {
      return acc + +(<any>item).price * +(<any>item).quantity;
    }, 0);
  }
}
