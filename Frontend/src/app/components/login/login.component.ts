import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: any;
  role: any;

  user: User | null = {
    user_id: 0,
    name: '',
    surname: '',
    account: '',
    email: '',
    image: '',
    ratings: 0.0,
  };

  loginForm1 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  constructor(
    private auth1: AuthusersService,
    private router: Router,
    private formbuilder: FormBuilder,
    private jwt: JwtService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    sessionStorage.setItem('state', 'No go...');
    //check if user is logged in
    if (this.jwt.isAuthenticated()) {
      this.user = this.jwt.getData(sessionStorage.getItem('key'));
      this.toast.success("You're already logged in");
      sessionStorage.setItem('state', 'logged in');

      if (this.user?.account == 'PARENT') {
        this.router.navigateByUrl('/parent-home');
      } else if (this.user?.account == 'OWNER') {
        this.router.navigateByUrl('/owner-home');
      } else if (this.user?.account == 'ADMIN') {
        this.router.navigateByUrl('/admin');
      }
    }

    this.loginForm1 = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.forgotPasswordForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.loginForm1.controls;
  }

  get forgotPasswordValidation(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  onforgotPassword(form: FormGroup) {
    this.submitted = true;
    //this.toast.loading('Processing ...', { duration: 10000 });
    if (form.valid) {
      this.auth1.forgotPassword(form.value).pipe(
        this.toast.observe({
          loading: 'Processing...',
          success: (s:any) => s.message,
          error: (e) =>  e.error.message,
       }),catchError((error) => of(error))
      ).subscribe(
        (res: any) => {
          form.reset();
          this.submitted = false;
        }
      );
    }
  }

  onlogin(form: FormGroup) {
    //Sign in the User to the to the app
    this.submitted = true;
    if (form.valid) {
      this.auth1.loginData(form.value).pipe(
        this.toast.observe({
          loading: 'Signing you in...',
          success: (s:any) => s.message,
          error: (e) =>  e.error.message,
       }),catchError((error) => of(error))
      ).subscribe(
        (results: any) => {
          this.auth1.saveToken(results.token);
          this.user = this.jwt.getData(results.token);
          if (this.user != null) {
            this.role = this.user.account;
            sessionStorage.setItem('state', 'logged in');
          }

          if (this.role == 'OWNER') {
            this.router.navigateByUrl('/owner-home');
          } else if (this.role == 'ADMIN') {
            this.router.navigateByUrl('/admin');
          } else if (sessionStorage.getItem('guestState') == 'schoolSelected') {
            this.router.navigateByUrl('/request');
          } else if (this.role == 'PARENT') {
            this.router.navigateByUrl('/parent-home');
          }
        }
      );
    }
  }
}
