import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email:any;
  password:any;
  constructor(private http: HttpClient) { }
  onSubmit() {
    const user = { email: this.email, password: this.password };
    this.http.post('http://localhost:8080/register', user)
      .subscribe((response) => {
        
        console.log(response);
      });
  }
  ngOnInit(): void {
  }

}





