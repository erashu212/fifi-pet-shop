import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './routes/product';

export const appRoutes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: '/login',
    loadChildren: './routes/login/login.component#LoginModule'
  },
  {
    path: '/register',
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