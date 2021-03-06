import { Component, Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { ProductModule as Module } from '../../feat/product'

@Component({
  template: '<product></product>'
})
export class ProductRouteComponent { }

const routes: Routes = [
  { path: '', component: ProductRouteComponent }
];

@NgModule({
  declarations: [ ProductRouteComponent ],
  imports: [
    Module,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    Module
  ]
})
export class ProductModule { }

