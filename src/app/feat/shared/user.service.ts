import { Injectable, NgModule } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { httpRequest } from '../../core/httpRequest';

export interface IUserResponse {
    status: boolean;
    data: any;
    message: string;
}

export interface IUser {
    _id: string;
    username: string;
    name: string;
    status: number;
    isAdmin: boolean;
}

@Injectable()
export class UserService {

    isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private http: Http) { }

    getLoggedInUser() {
        let hasValue = !!sessionStorage.getItem('user');
        if (!hasValue) {
            this.getUser()
                .subscribe((res: IUserResponse) => {
                    this.isLoggedIn$.next(res.status)
                    this.user$.next(res.data);
                    if (res.status)
                        sessionStorage.setItem('user', JSON.stringify(res.data));
                })
        } else {
            this.isLoggedIn$.next(true);
            this.user$.next(JSON.parse(sessionStorage.getItem('user')));
        }
    }

    getUser() {
        let req = {
            url: '/api/user',
            method: RequestMethod.Get
        };

        return httpRequest(this.http, req);
    }

    login(username: string, password: string) {
        let req = {
            url: '/api/login',
            method: RequestMethod.Post,
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        return httpRequest(this.http, req);
    }

    logout() {
        let req = {
            url: '/api/logout',
            method: RequestMethod.Delete
        }

        return httpRequest(this.http, req);
    }

    register(username: string, password: string) {
        let req = {
            url: '/api/users',
            method: RequestMethod.Post,
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        return httpRequest(this.http, req);
    }
}

@NgModule(
    {
        providers: [ UserService ]
    }
)
export class UserServiceModule { }