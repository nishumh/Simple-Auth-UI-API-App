import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from '../state/auth.action';
import { selectIsAdmin, selectIsAuthenticated } from '../state/auth.selector';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  isLoggedIn$?: Observable<boolean>;
  userRole$?: Observable<string>;

  constructor(private store: Store, private router: Router)
  {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsAuthenticated);
    this.userRole$ = this.store.select(state => selectIsAdmin(state) ? 'Admin' : 'User');
  }

  login(userName: string) {
    this.store.dispatch(login({ userName: userName }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}