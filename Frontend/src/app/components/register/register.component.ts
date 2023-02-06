import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,AbstractControl } from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
import Validation from './validation';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
submitted:boolean = false;
firstValues!:any;
  
registerForm1: FormGroup = new FormGroup({
  email: new FormControl(''),
  name: new FormControl(''),
  surname: new FormControl('')
});


registerForm2: FormGroup = new FormGroup({
  password: new FormControl(''),
  account: new FormControl(''),
  confirmPassword: new FormControl(''),
  gender: new FormControl('')
});

  constructor(private auth1: AuthusersService,private router:Router,private formbuilder:FormBuilder) { }

  myForm1() {
    this.registerForm1 = this.formbuilder.group({
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name: ['', [ Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$') ]],
      surname: ['', [ Validators.required,Validators.pattern('^[a-zA-Z ]*$')]]
    });
  }

  myForm2() {
    this.registerForm2 = this.formbuilder.group({
      password:['', [Validators.required, Validators.min(6)]],
      
      account: ['', [Validators.required]],
      
      confirmPassword: ['', [  Validation.match('password', 'confirmPassword') ]],
      gender :['', [Validators.required]],
    });
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.registerForm1.controls;
  }


  get form2Validation(): { [key: string]: AbstractControl } {
    return this.registerForm2.controls;
  }
  
    ngOnInit(): void {
      this.myForm1();
      this.myForm2();
    }
    get f(): { [key: string]: AbstractControl } {
      return this.registerForm2.controls;
    }
  
  

  // registerForm1 = new FormGroup({
  //   email: new FormControl('',[Validators.required, Validators.email]),
  //   name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]$')]),
  //   surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]$')]),
  //   password: new FormControl('', [Validators.required, Validators.min(6)]),
  //   account: new FormControl(),
  //   confirmPassword: new FormControl(),
  //   gender :new FormControl(),
  // })

  step=1

  nextStep(form:FormGroup)
  {
    this.submitted = true;

    if(form.value.email != '' && form.value.name!= '' && form.value.surname != '')
    {
      this.step = 2;
      this.firstValues = form.value;
    }

  }
 // get f(): { [key: string]: AbstractControl } {    return this.registerForm1.controls;  }
  onRegister(form:FormGroup){

      if (this.registerForm1.valid) {
        // submit the form
        }

        let finalValues={
          email : this.registerForm1.value.email,
          name: this.registerForm1.value.name,
          surname: this.registerForm1.value.surname,
          password: this.registerForm2.value.password,
          confirmPassword:this.registerForm2.value.confirmPassword,
          account:this.registerForm2.value.account,
          gender:this.registerForm2.value.gender,
          
        }
      console.log(form.value)
   //Add the User to the Database
  //  this.auth1.postData(finalValues).subscribe((results)=>{
  //    if(results == 'User added to database'){

  //     console.warn('sucess');
  //     alert('successfully registered');

  //     this.router.navigateByUrl('/home')


  //    }
  //    else{
  //     alert(results)

  //    }

  //  })
  }
 

}
