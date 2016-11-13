import { Component, Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { } from ''

@Component({
  selector: 'register',
  template: require('./register.component.html')
})
export class RegisterComponent { }

@NgModule({
  declarations: [ RegisterComponent ],
  exports: [ RegisterComponent ],
  imports: [
  ]
})
export class RegisterModule { 
  
}