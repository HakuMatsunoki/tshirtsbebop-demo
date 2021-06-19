import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../shared/service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
  id = null;
  color: string = '';
  size: string = '';

  constructor(
    public service: Service,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.service.fetchProductDetails(this.id).subscribe();
  }

  onItemChange(event: any, value: any) {
    if (event.target.name === 'color') this.color = value;
    if (event.target.name === 'size') this.size = value;
  }

  addToCart(event: any) {
    event.preventDefault();
    if (!this.color || !this.size || !this.id) return;

    const options = this.service.productDetails.options.find((item) => {
      return (<any>item).size === this.size && (<any>item).color === this.color;
    });
    const optionsId = (<any>options).tshirtOptionsId;

    this.service.fetchAddToCart(optionsId, 1).subscribe();

    this.service.fetchAllFromCart().subscribe();
    this.router.navigate(['cart']);
  }
}
