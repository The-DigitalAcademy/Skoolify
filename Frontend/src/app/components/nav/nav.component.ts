import { Component, OnChanges, OnInit, Renderer2, SimpleChanges  } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { FormGroup,FormControl,Validators,}   from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,OnChanges {
  accountType : any = '';
  dashboardRoute: string ='';
  isLoggedIn: boolean = false;

  constructor(private router : Router,private auth1: AuthusersService,private renderer: Renderer2, public jwt : JwtService) { }

  ngOnInit(): void {




    this.accountType = this.jwt.getData(sessionStorage.getItem('key'))?.account
    console.log(this.accountType)

    if(this.accountType)
    {
      this.isLoggedIn = true
      console.log('isLoggedIn = '+this.isLoggedIn)

    }else{
      this.isLoggedIn = false
      console.log('isLoggedIn = '+this.isLoggedIn)
    }


    console.log(this.router.routerState)

  }

  ngOnChanges(changes: SimpleChanges): void {

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
    sessionStorage.removeItem('key')
    sessionStorage.removeItem('state')
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
