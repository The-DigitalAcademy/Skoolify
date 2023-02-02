import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtService } from 'src/app/services/jwt.service';
import { User } from 'src/app/interfaces/user';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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

  constructor(
    private auth: AuthusersService,
    private router: Router,
    private jwt: JwtService,
    private toast : HotToastService
  ) {}

  ngOnInit(): void {}

  registerForm1 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]$'),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]$'),
    ]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    account: new FormControl(),
    confirmPassword: new FormControl(),
    gender: new FormControl(),
  });
  step = 1;

  nextStep(form: FormGroup) {
    if(this.step == 1){
      this.step = 2;
    }else
    {
      this.step = 1;
    }


  }

  onRegister(form: FormGroup) {

    this.toast.loading('Signing you up ...',{duration:200})

    if(form.value.password === form.value.confirmPassword){
      this.auth.postData(form.value).subscribe(
        (results: any) => {
          this.auth.saveToken(results.token);
          this.user = this.jwt.getData(results.token);

          if (this.user != null) {
            sessionStorage.setItem('role', this.user.account);
            this.role = this.user.account;
            this.toast.success('Welcome to Skoolify')
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
          this.toast.error(error.error.message)

        }
      );

    }else{
      this.toast.warning('Oops! Passwords do not match');
    }

  }
}
