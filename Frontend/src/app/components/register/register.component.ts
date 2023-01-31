import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthusersService, private router : Router) { }

  ngOnInit(): void {
  }

  registerForm1 = new FormGroup({

    email: new FormControl('',[Validators.required, Validators.email]),
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]$')]),
    surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]$')]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    account: new FormControl(),
    confirmPassword: new FormControl(),
    gender :new FormControl(),
  })
  step=1

  nextStep(form:FormGroup)
    {
      this.step = 2;

    }

    onRegister(form:FormGroup){
      if (this.registerForm1.valid) {
        // submit the form
        }
      console.log(form.value)
   //Add the User to the Database
   this.auth.postData(form.value).subscribe((results)=>{
     if(results == 'User added to database'){

      console.warn('sucess');
      alert('successfully registered');

      this.router.navigateByUrl('/home')


     }
     else{
      alert(results)

     }

   })
  }






}
