import { Component, Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterModule as Module } from '../../feat/register/register.component';

@Component({
  template: '<register></register>'
})
export class RegisterRouteComponent {}

const routes: Routes = [
  { path: '', component: RegisterRouteComponent }
];

@NgModule({
  declarations: [ RegisterRouteComponent ],
  imports: [
    RouterModule.forChild(routes),
    Module
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterModule {
}