import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthState } from "./state/auth.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import { selectIsAuthenticated } from "./state/auth.selector";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot) {
    const isLoggedIn$ = this.store.select(selectIsAuthenticated);

    return isLoggedIn$.pipe(
      map(isLoggedIn => {
      if(!isLoggedIn) {
        this.router.navigate(['/home']);
        return (false);
      }
      return (true);
    })
    );
  }
} 