import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

const io = require('socket.io-client/socket.io');

import { InfiniteScrollModule } from '../../comp/infinite-scroll/infinite-scroll'

import { ProductService, IProduct } from './shared/product.service';

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

    constructor(private productSvc: ProductService) {
    }

    ngOnInit() {
        let socket = io.connect(`${apiServer}`);

        socket.on('product:read', (product) => {
            console.log('product:read', product)
        });

        socket.on('product:added', (product) => {
            console.log('product:added', product)
        });

        socket.on('product:updated', (product) => {
            console.log('product:updated', product)
        });

        socket.on('product:deleted', (product) => {
            console.log('product:deleted', product)
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
                    this.products = this.groupByRow(res);
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
        InfiniteScrollModule
    ],
    providers: [
        ProductService
    ]
})
export class ProductModule { }