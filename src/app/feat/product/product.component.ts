import { Component, Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductService } from './shared/product.service';

@Component({
  selector: 'product',
  template: require('./product.component.html')
})
export class ProductComponent { }

@NgModule({
  declarations: [ ProductComponent ],
  exports: [ ProductComponent ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }