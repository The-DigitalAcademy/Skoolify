import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { OwnerApplication } from '../interfaces/applications';
import { HttpClient } from '@angular/common/http';
import { Application } from 'express';
@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  baseUrl='http://localhost:8080/owner'
  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();
  setData(data: any) {
    this.dataSubject.next(data);




  }
  constructor(private http:HttpClient) { }

  price(data: any) {
    return this.http.post(this.baseUrl + '/price', data);
  }
  viewOwnerRequests(school_id :number):Observable<Application>{
    return this.http.get<Application>(this.baseUrl + '/viewOwnerRequests/'  + school_id);
  }

  
}
