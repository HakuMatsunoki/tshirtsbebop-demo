import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../shared/service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  paymentsId = null;
  deliveryId = null;
  tshirtsList = null;
  orderDone: boolean = false;

  constructor(public service: Service, private router: Router) {}

  ngOnInit(): void {
    if (this.service.cartItems.length < 1) {
      this.orderDone = false;
      this.router.navigate(['']);
    }
  }

  createOrder() {
    const tshirtsList = this.service.cartItems.map((item) => {
      return {
        tshirtOptionsId: item.tshirtOptionsId,
        quantity: +item.quantity,
      };
    });

    this.service
      .fetchCreateOrder(this.paymentsId, this.deliveryId, tshirtsList)
      .subscribe((data) => {
        if (data.status === 'success') this.orderDone = true;
      });

    this.service.fetchClearCart().subscribe();
  }
}
