import { HttpInterceptorFn } from '@angular/common/http';
import { selectToken } from '../auth/state/auth.selector';
import { inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {  switchMap, take, } from 'rxjs';
import { environment } from './environment';

export const userAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);  

  const apiReq = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
    setHeaders: {     
      'Content-Type': 'application/json'
    } 
  });

  return store.pipe(
    select(selectToken),
    take(1),
    switchMap(token => {
        if(token){        
          const authRequest = apiReq.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`,
            }
          });       
          return next(authRequest);          
        }
      else {
        return next(apiReq);
      }})  
  );  
};