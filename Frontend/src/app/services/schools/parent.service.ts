import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  baseUrl='http://localhost:8080/parent/'

  constructor(private http:HttpClient) { }

  getSchool(){
    return this.http.get(`${this.baseUrl}/getSchool`)
  }
}
