import { Component, Input, NgModule } from '@angular/core';
import {
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

import { UserService, IUserResponse, IUser } from '../shared/user.service';

@Component({
    selector: 'login',
    template: require('./login.component.html')
})
export class LoginComponent {

    private loginForm: FormGroup;

    constructor(
        private userSvc: UserService,
        private _fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() { 
        this.initValidation();
    }

    private initValidation() {
        this.loginForm = this._fb.group({
            'username': [ '', Validators.required ],
            'password': [ '', Validators.required ]
        });
    }

    private login() {
        let username = this.loginForm.controls[ 'username' ].value.trim();
        let password = this.loginForm.controls[ 'password' ].value.trim();
        
        this.userSvc.login(username, password)
            .subscribe((res: IUserResponse) => {
                if (res.status) {
                    sessionStorage.setItem('user', JSON.stringify(res.data));
                    this.userSvc.getLoggedInUser();

                    this.router.navigate([ '..' ]);
                }
            });
    }
}

const routes: Routes = [
    { path: '', component: LoginComponent }
]

@NgModule({
    declarations: [ LoginComponent ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    exports: [
        LoginComponent,
        RouterModule
    ]
})
export class LoginModule { }