import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';

import { httpRequest } from '../../core/httpRequest';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

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
            url: '/api/login',
            method: RequestMethod.Delete
        }

        return httpRequest(this.http, req);
    }

    register(username: string, password: string) {
        let req = {
            url: '/api/register',
            method: RequestMethod.Post,
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        return httpRequest(this.http, req);
    }
}