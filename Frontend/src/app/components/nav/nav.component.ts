import { Component, OnChanges, OnInit, Renderer2, SimpleChanges  } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { FormGroup,FormControl,Validators,}   from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
import { Router } from '@angular/router';
import { OwnerService } from 'src/app/services/owner/owner.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  accountType : any = '';
  dashboardRoute: string ='';
  isLoggedIn: boolean = false;
  interval:any
  pending = 0;

  constructor(private owner:OwnerService, private router : Router,private auth1: AuthusersService,private renderer: Renderer2, public jwt : JwtService) { }

  ngOnInit(): void {

    //console.log(this.accountType)

    this.interval = setInterval(()=>{
      this.accountType = this.jwt.getData(sessionStorage.getItem('key'))?.account
      this.checkAcc()
      this.owner.viewRequests(this.jwt.getData(sessionStorage.getItem('key'))?.user_id).subscribe((requests:any)=>{
        requests.forEach((request:any) => {
          if(request.status == "PENDING")
          {
            this.pending++;
          }

        });
      })
    },500)

  }

  checkAcc()
  {
    if(this.accountType)
    {
      this.isLoggedIn = true
      //console.log('isLoggedIn = '+this.isLoggedIn)
    }else{
      this.isLoggedIn = false
      //console.log('isLoggedIn = '+this.isLoggedIn)
    }
  }



   public showNav():boolean{
    if(sessionStorage.getItem('state') =='No go...')
    {
      return false
    }else{
      return true
    }
  }


  ngAfterViewInit() {
    this.renderer.listen('document', 'DOMContentLoaded', () => {
      // open
      const burger = document.querySelectorAll('.navbar-burger');
      const menu = document.querySelectorAll('.navbar-menu');

      if (burger.length && menu.length) {
        for (let i = 0; i < burger.length; i++) {
          this.renderer.listen(burger[i], 'click', () => {
            for (let j = 0; j < menu.length; j++) {
              menu[j].classList.toggle('hidden');
            }
          });
        }
      }

      // close
      const close = document.querySelectorAll('.navbar-close');
      const backdrop = document.querySelectorAll('.navbar-backdrop');

      if (close.length) {
        for (let i = 0; i < close.length; i++) {
          this.renderer.listen(close[i], 'click', () => {
            for (let j = 0; j < menu.length; j++) {
              menu[j].classList.toggle('hidden');
            }
          });
        }
      }

      if (backdrop.length) {
        for (let i = 0; i < backdrop.length; i++) {
          this.renderer.listen(backdrop[i], 'click', () => {
            for (let j = 0; j < menu.length; j++) {
              menu[j].classList.toggle('hidden');
            }
          });
        }
      }
    });
  }

  signOut(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login');
  }








  // checkAccount(){


  //   if(sessionStorage.getItem('account') == "OWNER")
  //   {
  //     this.accountType = 'OWNER';

  //   }else if(sessionStorage.getItem('account') == "PARENT")
  //   {
  //     this.accountType = 'PARENT';

  //   }else if(sessionStorage.getItem('account') == "ADMIN")
  //   {
  //     this.accountType = 'PARENT';

  //   }
  //   console.log('account');
  // }

  // logout()
  // {
  //   sessionStorage.clear();
  //   this.isLoggedIn = false;
  //   clearInterval(this.ref);
  //   sessionStorage.setItem('isLoggedIn','no');

  // }



  // Burger menus


}
