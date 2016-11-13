import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';

import { httpRequest } from '../../../core/httpRequest';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getProducts(start: number, end: number) {
    let params = '';
    let req = {
      url: '/api/products',
      method: RequestMethod.Get,
      search: params
    }

    return httpRequest(this.http, req);
  }

  getProductById(id: string) {
    let req = {
      url: '/api/products/${id}',
      method: RequestMethod.Get
    }

    return httpRequest(this.http, req);
  }
 }