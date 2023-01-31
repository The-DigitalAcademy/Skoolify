import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthusersService {

  constructor(private http: HttpClient) {

  }
  postData(data: any) {
    return this.http.post('http://localhost:8080/register', data);
}
loginData(data: any) {
  return this.http.post('http://localhost:8080/login', data);
}
}
