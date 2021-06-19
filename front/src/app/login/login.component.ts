import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../shared/service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  passwd: string = '';
  passwdConfirm: string = '';
  isLoggedIn: boolean = false;
  isLogin: boolean = false;

  constructor(
    public service: Service,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {}
  createAccount(event: any) {
    event.preventDefault();
    if (
      !this.name ||
      !this.email ||
      !this.passwd ||
      this.passwd !== this.passwdConfirm
    )
      return;

    this.service
      .fetchSignup(
        this.name,
        this.phone,
        this.email,
        this.passwd,
        this.passwdConfirm
      )
      .subscribe((data) => {
        localStorage.setItem('JWT', data.token);
        this.service.fetchMe().subscribe();
      });
  }

  login(event: any) {
    event.preventDefault();
    if (!this.email || !this.passwd) return;

    this.service.fetchLogin(this.email, this.passwd).subscribe((data) => {
      localStorage.setItem('JWT', data.token);
      this.service.fetchMe().subscribe();
    });
  }

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }
}
