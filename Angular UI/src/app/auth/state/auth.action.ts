import { createAction, props } from '@ngrx/store';
import { LoginResponse } from '../models/loginResponse';

export const login = createAction(
  '[Auth] Login',
  props<{ userName: string;  }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<LoginResponse>()
);

export const logout = createAction('[Auth] Logout');