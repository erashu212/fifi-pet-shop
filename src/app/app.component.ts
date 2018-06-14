import { Component, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { UserService, IUser } from './feat/shared/user.service'

@Component({
    selector: 'app',
    template: require('./app.component.html')
})
export class AppComponent {

    private user: IUser;
    private _subs: Array<Subscription> = [];

    constructor(
        private userSvc: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this._subs.push(
            this.userSvc.user$
                .subscribe(res => this.user = res)
        );

        this.userSvc.getLoggedInUser();

    }

    ngOnDestroy() {
        while (this._subs.length) this._subs.pop().unsubscribe();
    }

    private logout() {
        this.userSvc.logout()
            .subscribe(res => {
                if (res.status) {
                    sessionStorage.removeItem('user');
                    this.userSvc.isLoggedIn$.next(false);
                    this.userSvc.user$.next(null);

                    this.router.navigate([ '..' ]);
                }
            })
    }
}