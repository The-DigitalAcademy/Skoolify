import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private helper = new JwtHelperService();
  user !: User

  constructor(private toast : HotToastService, private router : Router) { }

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

  isAuthenticated():boolean{

    return !this.helper.isTokenExpired(sessionStorage.getItem('key'));
  }
}
