import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ownerID= localStorage.getItem('owner_id')
@Injectable({
  providedIn: 'root'
})
export class ParentService {

  baseUrl='http://localhost:8080/parent/'

  constructor(private http:HttpClient) { }

  getSchool(){
    return this.http.get(`${this.baseUrl}/getSchool`)
  }

  getDrivers(){
     
    return this.http.get("http://localhost:8080/parent/getVehicle/3")//hard coded
    // return this.http.get(`${this.baseUrl}/getPost/${ownerID}`)
  }
}
