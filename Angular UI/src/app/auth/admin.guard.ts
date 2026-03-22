import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthState } from "./state/auth.reducer";
import { Store } from "@ngrx/store";
import { forkJoin, map, of } from "rxjs";
import { selectIsAuthenticated } from "./state/auth.selector";
import { selectIsAdmin } from "./state/auth.selector";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot) {    
    const isAdmin$ = this.store.select(selectIsAdmin);
    
    return isAdmin$.pipe(
      map(isAdmin => {
      if(!isAdmin) {
        this.router.navigate(['/home']);
        return (false);
      }
      return (true);
    })
    );
  }
} 