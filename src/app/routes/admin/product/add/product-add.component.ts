import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProductFormModule } from '../../../../feat/product/product-form/product-form.component';

@Component({
    template: `
        <product-form></product-form>
    `
})
export class ProductAddComponent {
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
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductFormModule
    ]
})
export class ProductAddModule { }