import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin, selectIsAuthenticated } from './auth/state/auth.selector';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-auth';

  isLoggedIn$? : Observable<boolean>;
  isAdmin$? : Observable<boolean>;

  constructor(private readonly store: Store) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsAuthenticated);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
}
