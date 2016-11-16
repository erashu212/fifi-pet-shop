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
    private currentPage: number = 0;
    private itemPerPage: number = 10;

    constructor(
        private productSvc: ProductService,
        private toastrService: ToasterService
    ) {
    }

    ngOnInit() {
        let socket = io.connect(`${apiServer}`);

        socket.on('product:added', (product) => {
            this.toastrService.pop('success', 'A new product added', product.name);
        });

        socket.on('product:updated', (product) => {
            this.toastrService.pop('success', 'Product updated', product.name);
        });

        socket.on('product:deleted', (product) => {
            this.toastrService.pop('success', 'Product deleted', '');
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
                        this.products = this.groupByRow(res.data.products);
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