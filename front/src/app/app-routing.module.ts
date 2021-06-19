import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { SingleComponent } from './single/single.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'me', component: UserComponent },
  { path: ':id', component: SingleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  ShopComponent,
  SingleComponent,
  CartComponent,
  LoginComponent,
  OrderComponent,
  UserComponent,
  DetailsComponent,
];
