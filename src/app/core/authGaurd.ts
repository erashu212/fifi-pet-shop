import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'


import { UserService, IUserResponse } from '../feat/shared/user.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(
    private authService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getUser().toPromise().then((res: IUserResponse) => {
          if (res.status
              && (state.url.indexOf('login') > -1
                  || state.url.indexOf('register') > -1)) {
          this.router.navigate([ '' ]);
          resolve(false);
        } else if (!res.status && (state.url.indexOf('login') > -1
                  || state.url.indexOf('register') > -1)) {
          resolve(true)
        } else if (res.status) {
          resolve(true)
        } else {
          this.router.navigate([ './login' ]);
          resolve(false);
        }
      });
    });
  }
}