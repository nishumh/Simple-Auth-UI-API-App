import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './auth/state/auth.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthEffects } from './auth/state/auth.effect';
import { userAuthInterceptor } from './shared/user-auth.interceptor';
import { productsReducer } from './products/state/products.reducer';
import { ProductsEffects } from './products/state/products.effect';

export const appConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(withInterceptors([userAuthInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ auth: authReducer, products: productsReducer }),
    provideEffects(
      [
        AuthEffects, 
        ProductsEffects
      ]
    ),   
   ]
};