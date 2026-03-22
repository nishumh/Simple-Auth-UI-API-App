import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, loginSuccess } from "./auth.action";
import { catchError, EMPTY, map, of, switchMap } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthEffects{
    private actions$: Actions = inject(Actions);
    private authService: AuthService = inject(AuthService);
    // constructor injection is not working, so we are using inject function to get the instance of Actions
    // constructor(public actions$: Actions) {
    //     this.actions$ = inject(Actions);
    //  }

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(login),
            switchMap(({ userName }) => {
                return this.authService.login(userName)
                .pipe(
                    map((loginResponse) => loginSuccess(loginResponse)),
                    catchError((error) => { alert('Login failed'); return EMPTY; })
                )
            })
        )); 
}