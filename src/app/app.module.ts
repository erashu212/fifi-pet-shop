import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CORSBrowserXHr } from './core/httpRequest';

import { AppComponent } from './app.component';

import { ProductModule } from './routes/product/product.component'

import { appRoutes, appRoutingProviders } from './routing';

import { UserServiceModule } from './feat/shared/user.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductModule,
        UserServiceModule
    ],
    providers: [
        { provide: BrowserXhr, useClass: CORSBrowserXHr },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        appRoutingProviders
    ],
    exports: [
        RouterModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }