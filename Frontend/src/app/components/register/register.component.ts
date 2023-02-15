import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
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
  tsAccount = new RegExp("^[a-zA-Z ]{2,}$");
  tsGender = new RegExp("^[a-zA-Z ]{2,}$");
  tsName = new RegExp("^[a-zA-Z ]{2,}$");
  tsSurname = new RegExp("^[a-zA-Z ]{2,}$");




  submitted:any;
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
    private toast : HotToastService,
    private formBuilder : FormBuilder
  ) {}

  ngOnInit(): void {

    sessionStorage.setItem('state','No go...');


    //check if user is logged in
    if(this.jwt.isAuthenticated()){
      this.user = this.jwt.getData(sessionStorage.getItem('key'));
      this.toast.success('You\'re already logged in')
      sessionStorage.setItem('state','logged in');


      if (this.user?.account == 'PARENT') {
        this.router.navigateByUrl('/parent-home');
      } else if (this.user?.account == 'OWNER') {
        this.router.navigateByUrl('/owner-home');
      } else if (this.user?.account == 'ADMIN') {
        this.router.navigateByUrl('/admin/schools');
      }

    }

    this.registerForm1 = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [
        Validators.required,
      ]),
      surname: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      account: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),

    })


  }

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
    password: new FormControl(''),
    account: new FormControl('',[Validators.required,]),
    confirmPassword: new FormControl(''),
    gender: new FormControl('',[Validators.required,]),
  });
  step = 1;

  nextStep(form: FormGroup) {
    this.submitted = true
    if(this.step == 1 && this.tsAccount.test(form.value.account)&& this.tsGender.test(form.value.gender)&& this.tsName.test(form.value.name)&& this.tsSurname.test(form.value.surname)){
      this.step = 2;
      this.submitted = false

    }else
    {
      this.step = 1;

    }
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.registerForm1.controls;
  }

  onRegister(form: FormGroup) {
    console.log('here....')

    this.submitted = true;
    console.log(form.valid)

    if(form.valid){
      console.log('first step')
      this.toast.loading('Signing you up ...',{duration:200})
      console.log(form.value)
      if(form.value.password === form.value.confirmPassword){

        this.auth.postData(form.value).subscribe(
          (results: any) => {
            this.auth.saveToken(results.token);
            this.user = this.jwt.getData(results.token);
            if (this.user != null) {
              this.role = this.user.account;
              this.toast.success('Welcome to Skoolify')
              sessionStorage.setItem('state','logged in');

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
}
