import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public service: Service, public router: Router) {}

  ngOnInit(): void {
    if (!this.service.me.isLoggedIn) this.router.navigate(['']);
    else this.service.fetchAllFromCart().subscribe();
  }

  get total() {
    return this.service.cartItems.reduce((acc, item) => {
      return acc + +(<any>item).price * +(<any>item).quantity;
    }, 0);
  }

  deleteItem(id: any) {
    this.service.fetchRemoveFromCart(id).subscribe();
    this.service.cartItems = this.service.cartItems.filter(
      (item) => item.id !== id
    );
  }
}
