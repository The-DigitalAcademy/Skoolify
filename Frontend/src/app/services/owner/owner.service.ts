import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestInterface } from 'src/app/interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  baseUrl = 'http://localhost:8080/owner';
  constructor(private http : HttpClient) { }

  viewRequests(owner_id:number):Observable<RequestInterface[]>{
    return this.http.get<RequestInterface[]>(this.baseUrl + '/myrequests/' + owner_id).pipe();
  }

  viewOneRequest(request_id:number,owner_id : number){
    return this.http.get(this.baseUrl+'/requests/'+ owner_id+'/'+request_id);
  }

  decline(request_id:number,data:any){
    return this.http.patch(this.baseUrl+'/requests/decline/'+request_id,data)
  }

  accept(request_id:number){
    return this.http.patch(this.baseUrl+'/requests/accept/'+request_id,null)
  }

}
