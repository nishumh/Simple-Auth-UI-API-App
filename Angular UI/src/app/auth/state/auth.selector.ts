import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (authState: AuthState) => authState.token ? true : false
);

export const selectToken = createSelector(
  selectAuth,
  (authState: AuthState) => authState.token
);

export const selectIsAdmin = createSelector(
  selectAuth,
  selectIsAuthenticated,
  (authState:AuthState, isAuthenticated: boolean) => isAuthenticated && authState.role === 'Admin');

export const selectIsUser = createSelector(
  selectAuth,
  selectIsAuthenticated,
  selectIsAdmin,
  (authState:AuthState, isAuthenticated: boolean, isAdmin: boolean) => isAuthenticated && (authState.role === 'User' || isAdmin)
);