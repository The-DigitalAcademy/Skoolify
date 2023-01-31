import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,AbstractControl, FormBuilder } from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
submitted: any;


  constructor(private auth1: AuthusersService,private router:Router,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  loginForm1 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]) ,
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  })

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm1.controls;
  }
  get formValidation(): { [key: string]: AbstractControl } {
    return this.loginForm1.controls;
  }


  onlogin(form:FormGroup){

    console.log(form.value)
 //Add the User to the Database
 this.auth1.loginData(form.value).subscribe((results)=>{

  if(results === 'Enter correct password!' || results === ''){

    alert('invalid login details')

    console.log('invalid')

    return
   }
   else{

    this.router.navigateByUrl('/home')
    console.warn('sucess');
    alert('successfully logged in');

console.log(results)
    //routing to home page after successfully loging in





   }
 })
}


}
