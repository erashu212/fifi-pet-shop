import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CORSBrowserXHr } from './core/httpRequest';

import { AppComponent } from './app.component';

import { ProductModule } from './routes/product/product.component'

import { appRoutes } from './routing'

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductModule
  ],
  providers: [
    { provide: BrowserXhr, useClass: CORSBrowserXHr },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }