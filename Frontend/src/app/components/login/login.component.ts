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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: any;
  role: any;

  user : User| null = {
    user_id: 0,
    name: '',
    surname: '',
    account: '',
    email: '',
    image: '',
    ratings: 0.0,

  };

  constructor(
    private auth1: AuthusersService,
    private router: Router,
    private formbuilder: FormBuilder,
    private jwt: JwtService,
    private toast : HotToastService
  ) {}

  ngOnInit(): void {}

  loginForm1 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  onlogin(form: FormGroup) {
    //Sign in the User to the to the app
    this.toast.loading("Signing you in ...",{duration:1000})
    this.auth1.loginData(form.value).subscribe(
      (results: any) => {
        this.auth1.saveToken(results.token);
        this.user = this.jwt.getData(results.token);

        if(this.user!=null) {
          sessionStorage.setItem('role', this.user.account);
          this.role = this.user.account;
          this.toast.success(results.message,{duration:3000});


       }

        if (this.role == 'PARENT') {
          this.router.navigateByUrl('/parent-home');
        } else if (this.role == 'OWNER') {
          this.router.navigateByUrl('/owner-home');
        } else if (this.role == 'ADMIN') {
          this.router.navigateByUrl('/admin/schools');
        }
      },
      (error: HttpErrorResponse) => {
        this.toast.error(error.error.message,{duration:4000});
      }
    );
  }
}
