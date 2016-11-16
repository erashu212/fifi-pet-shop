import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

@Component({
    template: '<router-outlet></router-outlet>'
})
export class ProductComponent { }

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: '',
                loadChildren: './list/product-list.component#ProductListModule'
            },
            {
                path: 'add',
                loadChildren: './add/product-add.component#ProductAddModule'
            },
            {
                path: 'edit/:id',
                loadChildren: './edit/product-edit.component#ProductEditModule'
            }
        ]
    }
];

@NgModule({
    declarations: [ ProductComponent ],
    exports: [ ProductComponent, RouterModule ],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class ProductModule { }