import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth1: AuthusersService) { }

  ngOnInit(): void {
  }
  loginForm1 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]) ,
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  })
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
   
   
    console.warn('sucess');
    alert('successfully logged in');
   

    //routing to home page after successfully loging in

  
   


   }
 })
}

}
