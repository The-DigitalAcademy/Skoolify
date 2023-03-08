import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ParentGuard implements CanActivate {
  expectedRole = 'PARENT';

  constructor(private jwt : JwtService,private toast : HotToastService,private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let role  = this.jwt.getData(sessionStorage.getItem('key'))?.account;

      if(!this.jwt.isAuthenticated()|| role !== this.expectedRole)
      {
        this.toast.warning('You have no privileges to this page');
        if(role === "ADMIN")
        {
          this.router.navigateByUrl('/admin')

        }else if(role === "OWNER")
        {
          this.router.navigateByUrl('/owner-home');
        }else {
          this.router.navigateByUrl('/login');
        }
        return false;
      }

    return true;
  }

}
