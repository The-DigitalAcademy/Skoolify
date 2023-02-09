import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor() { }

  //declare formgroup
  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  
  });


  ngOnInit(): void {
  }

  onForgotPassword(){
    console.log(this.forgotPassword.value)
  }

}
