import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private helper = new JwtHelperService();
  user !: User

  constructor() { }

  getData(token:any):User|null{

    if(this.helper.isTokenExpired(token)){
      console.log('expired')
      return null
    }else{
      console.log('active')

      this.user = JSON.parse(JSON.stringify(this.helper.decodeToken(token)))
    return this.user;
    }
  }
}
