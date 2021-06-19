import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(public service: Service, public router: Router) {}

  ngOnInit(): void {
    if (!this.service.me.isLoggedIn) this.router.navigate(['']);
    else this.service.fetchOrders().subscribe();
  }

  showDetails(index: any) {
    const order = this.service.userOrders[index];
    this.service.fetchOrder(order.id).subscribe(() => {
      this.service.currentOrderIndex = index;
      this.router.navigate(['details']);
    });
  }

  get orders() {
    return this.service.userOrders.map((item) => {
      const options: any = {
        dateStyle: 'medium',
        timeStyle: 'medium',
      };

      return {
        date: new Date(Date.parse(item.date)).toLocaleString('en-US', options),
        status: item.status,
      };
    });
  }
}
