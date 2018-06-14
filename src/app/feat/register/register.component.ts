import { Component, Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService, IUserResponse, IUser } from '../shared/user.service';

import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    private registerForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private userSvc: UserService,
        private toaster: ToasterService
    ) {

    }

    ngOnInit() {
        this.initValidation();
    }

    private initValidation() {
        this.registerForm = this._fb.group({
            'username': [ '', Validators.required ],
            'password': [ '', Validators.required ]
        });
    }

    private createUser() {
        if (this.registerForm.dirty && this.registerForm.valid) {
            let username = this.registerForm.controls[ 'username' ].value;
            let passowrd = this.registerForm.controls[ 'password' ].value;

            this.userSvc.register(username, passowrd)
                .subscribe((res: IUserResponse) => {
                    if (res.status) {
                        this.toaster.pop('success', 'Registration', 'User has been created successfully.')
                    } else {
                        this.toaster.pop('pop', 'Registration', 'We could not process your request this time.')
                    }
                })
        }
    }
}

@NgModule({
    declarations: [ RegisterComponent ],
    exports: [ RegisterComponent ],
    imports: [
        FormsModule,
        ReactiveFormsModule
    ]
})
export class RegisterModule {
}