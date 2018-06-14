import { Component, Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule as Module } from '../../feat/login/login.component';

@Component({
  template: '<login></login>'
})
export class LoginRouteComponent {}

const routes: Routes = [
  { path: '', component: LoginRouteComponent }
];

@NgModule({
  declarations: [ LoginRouteComponent ],
  imports: [
    RouterModule.forChild(routes),
    Module
  ],
  exports: [
    RouterModule
  ]
})
export class LoginModule {
}