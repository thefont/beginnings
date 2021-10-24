import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    options: AnimationOptions = {
        path: '/assets/data.json',
    };

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    });

    constructor(private location: Location, private readonly router: Router) { }

    animationCreated(animationItem: AnimationItem): void {
        console.log(animationItem);
    }

    onLogin() {
        this.router.navigateByUrl('/');
    }
}
