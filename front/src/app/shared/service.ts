import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  material: string;
}

export interface CartItem {
  id: number;
  tshirtOptionsId: number;
  quantity: any;
  tshirtId: number;
  name: string;
  price: number;
  color: string;
  size: string;
}

export interface UserOrder {
  id: number;
  date: string;
  payments: string;
  status: string;
  delivery: string;
  tshirtsList: any;
}

export interface OrderedTshirtDetails {
  id: number;
  name: string;
  price: number;
  type: string;
  color: string;
  size: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class Service {
  public products: Product[] = [];
  public cartItems: CartItem[] = [];
  public userOrders: UserOrder[] = [];
  public orderDetails: OrderedTshirtDetails[] = [];

  userDetails = {
    id: null,
    name: '',
    email: '',
    phone: '',
  };

  currentOrderIndex = null;

  productDetails = {
    id: null,
    name: '',
    price: null,
    type: '',
    material: '',
    categories: [],
    options: [],
  };

  constructor(private http: HttpClient, private router: Router) {}

  fetchProducts(): Observable<any> {
    return this.http
      .get<any>('https://tshirts-shop.herokuapp.com/api/tshirts')
      .pipe(
        tap((response) => {
          this.products = response.data;
        })
      );
  }

  fetchProductDetails(id: any): Observable<any> {
    return this.http
      .get<any>(`https://tshirts-shop.herokuapp.com/api/tshirts/${id}`)
      .pipe(
        tap((response) => {
          this.productDetails = response.data[0];
        })
      );
  }

  fetchAddToCart(tshirtOptionsId: any, quantity: any): Observable<any> {
    const token = localStorage.getItem('JWT');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      'https://tshirts-shop.herokuapp.com/api/cart',
      {
        tshirtOptionsId,
        quantity,
      },
      { headers }
    );
  }

  fetchAllFromCart(): Observable<any> {
    const token = localStorage.getItem('JWT');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http
      .get<any>('https://tshirts-shop.herokuapp.com/api/cart', {
        headers,
      })
      .pipe(
        tap((response) => {
          this.cartItems = response.data;
        })
      );
  }

  fetchRemoveFromCart(id: any): Observable<any> {
    const token = localStorage.getItem('JWT');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(
      `https://tshirts-shop.herokuapp.com/api/cart/${id}`,
      {
        headers,
      }
    );
  }

  fetchClearCart(): Observable<any> {
    const token = localStorage.getItem('JWT');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(
      'https://tshirts-shop.herokuapp.com/api/cart',
      {
        headers,
      }
    );
  }

  fetchCreateOrder(
    paymentsId: any,
    deliveryId: any,
    tshirtsList: any
  ): Observable<any> {
    const token = localStorage.getItem('JWT');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      'https://tshirts-shop.herokuapp.com/api/orders',
      {
        paymentsId,
        deliveryId,
        tshirtsList,
      },
      { headers }
    );
  }

  fetchOrders(): Observable<any> {
    const token = localStorage.getItem('JWT');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http
      .get<any>('https://tshirts-shop.herokuapp.com/api/orders/', {
        headers,
      })
      .pipe(
        tap((response) => {
          this.userOrders = response.data;
        })
      );
  }

  fetchOrder(id: any): Observable<any> {
    const token = localStorage.getItem('JWT');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http
      .get<any>(`https://tshirts-shop.herokuapp.com/api/orders/${id}`, {
        headers,
      })
      .pipe(
        tap((response) => {
          this.orderDetails = response.data;
        })
      );
  }

  fetchMe(): Observable<any> {
    const token = localStorage.getItem('JWT');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http
      .get<any>('https://tshirts-shop.herokuapp.com/api/users/me', {
        headers,
      })
      .pipe(
        tap((response) => {
          this.userDetails = response.data;
        })
      );
  }

  fetchSignup(
    name: any,
    phone: any,
    email: any,
    passwd: any,
    passwdConfirm: any
  ): Observable<any> {
    return this.http.post<any>(
      'https://tshirts-shop.herokuapp.com/api/users/signup',
      {
        name,
        phone,
        email,
        passwd,
        passwdConfirm,
      }
    );
  }

  fetchLogin(email: any, passwd: any): Observable<any> {
    return this.http.post<any>(
      'https://tshirts-shop.herokuapp.com/api/users/login',
      {
        email,
        passwd,
      }
    );
  }

  logout() {
    localStorage.removeItem('JWT');
    this.userDetails = {
      id: null,
      name: '',
      email: '',
      phone: '',
    };
  }

  get me() {
    return {
      isLoggedIn: !!this.userDetails.id,
      name: this.userDetails.name,
      phone: this.userDetails.phone,
      email: this.userDetails.email,
    };
  }

  get colors() {
    return [
      ...new Set(
        this.productDetails.options.map((item) => Object.values(item)[2])
      ),
    ];
  }

  get sizes() {
    return [
      ...new Set(
        this.productDetails.options.map((item) => Object.values(item)[1])
      ),
    ];
  }
}
