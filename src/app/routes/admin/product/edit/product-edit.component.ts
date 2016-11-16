import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { ProductFormModule } from '../../../../feat/product/product-form/product-form.component';

@Component({
    template: `
        <product-form [id]="(id$ | async)"></product-form>
    `
})
export class ProductEditComponent {

    private id$: any

    constructor(private route: ActivatedRoute) { }

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
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductFormModule
    ]
})
export class ProductEditModule { }