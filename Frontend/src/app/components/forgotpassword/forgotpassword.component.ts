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
        this.toast.loading('Processing ...',{duration:2000});
        this.service.resetPassword(form.value).subscribe((res:any)=>{
          this.toast.success(res.message)
          this.router.navigateByUrl('/login');
        },(error: HttpErrorResponse)=>{
          console.log(error)
          this.toast.error(error.error.message)
        })

      }else{
        this.toast.warning('Passwords do no match')
      }
    }



    console.log(form.value)

  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.resetPassword.controls;
  }

}
