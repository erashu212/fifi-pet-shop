import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ProductFormModule } from '../../../../feat/product/product-form/product-form.component';

@Component({
    template: `
        <product-form (onSubmit)="onSubmit($event);"></product-form>
    `
})
export class ProductAddComponent {

    constructor(private router: Router) { }

    onSubmit(res: any) { 
        if (res.status) { 
            this.router.navigateByUrl('/admin/product');
        }
    }
}

const routes: Routes = [
    {
        path: '',
        component: ProductAddComponent
    }
];

@NgModule({
    declarations: [ ProductAddComponent ],
    exports: [ ProductAddComponent, RouterModule ],
    imports: [
        RouterModule.forChild(routes),
        ProductFormModule
    ]
})
export class ProductAddModule { }