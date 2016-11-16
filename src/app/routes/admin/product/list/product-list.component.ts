import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap'

import {  ProductService, IProduct } from '../../../../feat/shared/product.service'

@Component({
    template: require('./product-list.component.html')
})
export class ProductListComponent { 

    private _subs: Array<Subscription> = [];
    private products: Array<IProduct> = [];
    private currentPage: number = 1;
    private itemPerPage: number = 10;
    private totalItems: number;

    constructor(private productSvc: ProductService) { }

    ngOnInit() {
        this.getProducts(0, this.itemPerPage);
    }

    private getProducts(start: number, end: number) { 
        this._subs.push(
            this.productSvc.getProducts(start, end)
                .subscribe((res: any) => {
                    if (res.status) {
                        this.totalItems = res.data.totalItems;
                        this.products = res.data.products;
                    }
                })
        );
    }

    private pageChanged(pageNumber: any) { 
        this.currentPage = pageNumber.page;
        this.getProducts((this.currentPage - 1)  * this.itemPerPage, this.itemPerPage);
    }

    private deleteProduct(id: string) {
        if (confirm('Do you want to remove this record?')) {
            this.productSvc.removeProduct(id)
                .subscribe((res: any) => {
                    if (res.status) {
                        this.getProducts(0, this.itemPerPage);
                    }
                })
        }
    }    
}

const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    }
];

@NgModule({
    declarations: [ ProductListComponent ],
    exports: [ ProductListComponent, RouterModule ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PaginationModule
    ]
})
export class ProductListModule { }