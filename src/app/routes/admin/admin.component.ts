import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
    template: require('./admin.component.html')
})
export class AdminComponent { 
}

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'product',
                loadChildren: './product/product.component#ProductModule'
            },
            // {
            //     path: 'user/...',
            //     loadChildren: './user/user.component#UserModule'
            // }
        ]
    }
];


@NgModule({
    declarations: [ AdminComponent ],
    exports: [ AdminComponent, RouterModule ],
    imports: [ RouterModule.forChild(routes) ]
})
export class AdminModule { }
