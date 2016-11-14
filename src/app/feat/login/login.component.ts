import { Component, Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

@Component({
  selector: 'login',
  template: require('./login.component.html')
})
export class LoginComponent { 
}

const routes: Routes = [
  { path: '', component: LoginComponent }
]

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginComponent,
    RouterModule
  ]
})
export class LoginModule { 

}