import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  registerForm1 = new FormGroup({
    email: new FormControl(),
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]$')]),
    surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]$')]),
    password: new FormControl(),
    account: new FormControl(),
    confirmPassword: new FormControl()
  })
  step=1
  
  nextStep(form:FormGroup)
    {
      this.step = 2;
  
    }
    onRegister(form:FormGroup){
      
    }



    
}
