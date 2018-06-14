import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductRouteComponent } from './routes/product/product.component';

import { CanActivateViaAuthGuard } from './core/authGaurd'

export const appRoutes: Routes = [
    {
        path: '',
        component: ProductRouteComponent
    },
    {
        path: 'login',
        canActivate:[ CanActivateViaAuthGuard ],
        loadChildren: './routes/login/login.component#LoginModule'
    },
    {
        path: 'register',
        canActivate:[ CanActivateViaAuthGuard ],
        loadChildren: './routes/register/register.component#RegisterModule'
    },
    {
        path: 'admin',
        canActivate: [ CanActivateViaAuthGuard ],
        loadChildren: './routes/admin/admin.component#AdminModule'
    },
    {
        path: '**',
        redirectTo: '/fourohfour',
        pathMatch: 'full'
    },
];

export const appRoutingProviders: any[] = [
    CanActivateViaAuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);