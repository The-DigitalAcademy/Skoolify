import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router:Router,private jwt : JwtService,private toast : HotToastService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.jwt.isAuthenticated()){
        this.toast.warning('Please sign in first..')
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }

}
