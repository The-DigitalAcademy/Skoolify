import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = 'http://localhost:8080/account';
  constructor(private http: HttpClient) { }

  getAccount(user_id:number)
  {
    return this.http.get(this.baseUrl+'/'+user_id);
  }

  updatePassword(user_id:number,data:any)
  {
    return this.http.patch(this.baseUrl+'/password/'+user_id,data);
  }
  updateDetails(user_id:number,data:any)
  {
    return this.http.patch(this.baseUrl+'/details/'+user_id,data);
  }

  updateImage(user_id:number,image:any)
  {
    return this.http.patch(this.baseUrl+'/details/image/'+user_id,image);
  }
}
