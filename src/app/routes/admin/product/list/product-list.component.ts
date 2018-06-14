import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { PaginationModule } from 'ngx-bootstrap'

import { ProductService, IProduct } from '../../../../feat/shared/product.service'

import * as io from 'socket.io-client';
declare const apiServer;

export interface ITicker { 
    title: string;
    class?: string;
    message: string;
}

@Component({
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {

    private _subs: Array<Subscription> = [];
    private products: Array<IProduct> = [];
    private currentPage: number = 1;
    private itemPerPage: number = 10;
    private totalItems: number;

    private tickers: Array<ITicker> = []

    constructor(private productSvc: ProductService) { }

    ngOnInit() {
        this.initTicker();
        
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
        this.getProducts((this.currentPage - 1) * this.itemPerPage, this.itemPerPage);
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

    private initTicker() {
        let socket = io.connect(`${apiServer}`);

        socket.on('product:added', (product) => {
            this.tickers.push({
                title: 'Product Added',
                message: `A new product added - ${product.name}`
            })
        });

        socket.on('product:updated', (product) => {
            this.tickers.push({
                title: 'Product Updated',
                message: `A product updated - ${product.name}`
            })
        });

        socket.on('product:deleted', (product) => {
            this.tickers.push({
                title: 'Product Deleted',
                'class': '',
                message: `A new product added - ${product.name}`
            })
        });
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
    exports: [ ProductListComponent, RouterModule, FormsModule ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        PaginationModule.forRoot()
    ]
})
export class ProductListModule { }