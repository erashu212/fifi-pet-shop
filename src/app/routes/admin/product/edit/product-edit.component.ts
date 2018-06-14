import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

import { ProductFormModule } from '../../../../feat/product/product-form/product-form.component';

@Component({
    template: `
        <product-form [id]="(id$ | async)" (onSubmit)="onSubmit($event);"></product-form>
    `
})
export class ProductEditComponent {

    private id$: any

    constructor(
        private route: ActivatedRoute,
        private router: Router) { }

    onSubmit(res: any) {
        if (res.status) {
            this.router.navigateByUrl('/admin/product');
        }
    }

    ngOnInit() {
        this.id$ = this.route.params.map(p => p[ 'id' ])
    }
}

const routes: Routes = [
    {
        path: '',
        component: ProductEditComponent
    }
];

@NgModule({
    declarations: [ ProductEditComponent ],
    exports: [ ProductEditComponent, RouterModule ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ProductFormModule
    ]
})
export class ProductEditModule { }