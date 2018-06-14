import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';

import { CORSBrowserXHr } from './core/httpRequest';

import { AppComponent } from './app.component';

import { ProductModule } from './routes/product/product.component'
import { LoginModule } from './routes/login/login.component'
import { RegisterModule } from './routes/register/register.component'
import { AdminModule } from './routes/admin/admin.component'

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
        UserServiceModule,
        ToasterModule
    ],
    providers: [
        ToasterService,
        { provide: BrowserXhr, useClass: CORSBrowserXHr },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        appRoutingProviders
    ],
    exports: [
        RouterModule,
        ToasterModule,
        ProductModule,
        UserServiceModule,
        ToasterModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }