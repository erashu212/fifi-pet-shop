import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';

import { httpRequest } from '../../../core/httpRequest';

const _ = require('lodash');

export interface IProduct { 
    name: string;
    category: string;
    price: number;
    isActive: boolean;
    desc: string;
    attrs: Array<any>
}

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getProducts(start: number = 1, end: number = 10) {
    let params = `start=${start}&end=${end}`;
    let req = {
      url: '/api/products',
      method: RequestMethod.Get,
      search: params
    }

    return httpRequest(this.http, req)
  }

  getProductById(id: string) {
    let req = {
      url: '/api/products/${id}',
      method: RequestMethod.Get
    }

    return httpRequest(this.http, req);
  }
 }