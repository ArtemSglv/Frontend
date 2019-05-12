import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {  AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar,
        private cookieService: CookieService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [ Validators.required, Validators.email]],
            password: ['', [ Validators.required]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log("Submitted");
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(
              (data: {token: string, time: number, refresh: string}) => {
                    this.router.navigate([this.returnUrl]);
                    this.cookieService.set("token", data.token);
                    this.cookieService.set("refresh", data.refresh);
                    this.authenticationService.setCurrentUser(data.token);
                    setTimeout(() => {
                      this.authenticationService.refreshTokens();
                    }, data.time - 100)
                },
              (error) => {
                  console.log(error);
                  this.snackBar.open("Bad credentials", "Close", {duration: 3000});
                    this.loading = false;
                }
            )}
}
