import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductRouteComponent } from './routes/product/product.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: ProductRouteComponent
  },
  {
    path: 'login',
    loadChildren: './routes/login/login.component#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './routes/register/register.component#RegisterModule'
  },
  {
    path: '**',
    redirectTo: '/fourohfour',
    pathMatch: 'full'
  },
];

export const appRoutingProviders: any[] = [
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);