import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

const io = require('socket.io-client/socket.io');

import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { InfiniteScrollModule } from '../../comp/infinite-scroll/infinite-scroll'

import { ProductServiceModule, IProduct, ProductService } from '../shared/product.service';

declare const apiServer;

@Component({
    selector: 'product',
    template: require('./product.component.html')
})
export class ProductComponent {

    private _subs: Array<Subscription> = [];
    private products: Array<IProduct> = [];
    private groupedProducts: Array<IProduct> = [];
    private currentPage: number = 0;
    private itemPerPage: number = 50;

    constructor(
        private productSvc: ProductService,
        private toastrService: ToasterService
    ) {
    }

    ngOnInit() {
        let socket = io.connect(`${apiServer}`);

        socket.on('product:added', (product) => {
            this.toastrService.pop('success', `${product.name}`, 'This product has been added.');
            this.getProducts(this.currentPage, this.itemPerPage);
        });

        socket.on('product:updated', (product) => {
            this.toastrService.pop('success', `${product.name}`, 'This product has been updated.');
            this.getProducts(this.currentPage, this.itemPerPage);
        });

        socket.on('product:deleted', (id) => {
            this.toastrService.pop('error', 'Product deleted', '');
            this.getProducts(this.currentPage, this.itemPerPage);
        });

        this.getProducts(this.currentPage, this.itemPerPage);
    }

    ngOnDestroy() {
        while (this._subs.length) this._subs.pop().unsubscribe();
    }

    private loadMore() {
        this.currentPage++;
        this.getProducts(this.currentPage * this.itemPerPage, this.itemPerPage);
    }

    private getProducts(start: number, end: number) {
        this._subs.push(
            this.productSvc.getProducts(start, end)
                .subscribe(res => {
                    if (res.status && res.data) {
                        this.products = res.data.products;
                        this.groupedProducts = this.groupByRow(res.data.products);
                    }
                })
        );
    }

    private groupByRow(data: any, numberOfColPerRow: number = 4) {
        let newArr = [];

        if (data.length < numberOfColPerRow) {
            newArr.push(data)
        } else
            for (let i = 0; i < data.length; i += numberOfColPerRow) {
                newArr.push(data.slice(i, i + numberOfColPerRow));
            }
        return newArr;
    }
}

@NgModule({
    declarations: [ ProductComponent ],
    exports: [ ProductComponent ],
    imports: [
        CommonModule,
        RouterModule,
        InfiniteScrollModule,
        ProductServiceModule
    ]
})
export class ProductModule { }