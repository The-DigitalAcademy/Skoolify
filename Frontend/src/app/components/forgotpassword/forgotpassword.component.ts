import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { of } from 'rxjs';
import { catchError } from 'rxjs';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  submitted =false

  constructor(private toast: HotToastService,private formbuilder : FormBuilder,private service : ProfileService,private router : Router) { }

  //declare formgroup
  resetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmpassword: new FormControl('', [Validators.required ]),
  });


  ngOnInit(): void {
    this.resetPassword = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required]],
    })


  }

  onResetPassword(form:FormGroup){
    this.submitted = true
    if(form.valid)
    {
      if(form.value.password == form.value.confirmpassword)
      {
        this.service.resetPassword(form.value).pipe(
          this.toast.observe({
          loading: 'Saving...',
          success:(s:any) => s.message,
          error: (e) =>  e.error.message,
       }),catchError((error) => of(error))).subscribe((res:any)=>{
          //this.router.navigateByUrl('/login');
        })
      }else{
        this.toast.warning('Passwords do no match')
      }
    }
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.resetPassword.controls;
  }

}
