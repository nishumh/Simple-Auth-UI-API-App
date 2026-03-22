import { createReducer, on } from "@ngrx/store";
import { loginSuccess, logout } from "./auth.action";

export interface AuthState { 
  token: string | null;
  role: string | null;
}

const intialState: AuthState = {
  token: null,
  role: null
};

export const authReducer = createReducer(
  intialState,
  on(loginSuccess, (state, { token, role }) => ({ token, role })),
  on(logout, () => intialState)
);