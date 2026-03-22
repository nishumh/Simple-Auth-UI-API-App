import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),        
    },
    {
        path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),        
    },
    {
        path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent), canActivate:[AuthGuard]
    }, 
    {
        path: 'admin-only', loadComponent: () => import('./admin-only/admin-only.component').then(m => m.AdminOnlyComponent), canActivate:[AdminGuard]
    },
    {
        path: '**', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),        
    },
];