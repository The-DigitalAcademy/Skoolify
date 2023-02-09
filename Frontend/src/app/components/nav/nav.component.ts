import { Component, OnInit, Renderer2  } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { FormGroup,FormControl,Validators,}   from '@angular/forms';
import { AuthusersService } from 'src/app/services/authusers.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  accountType : any
  dashboardRoute: string ='';
  isLoggedIn!: boolean;

  constructor(private router : Router,private auth1: AuthusersService,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.accountType = sessionStorage.getItem('role');
  }

  // loginForm1 = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.min(6)]),
  // });
  // onlogin(form: FormGroup) {
  //   //Sign in the User to the to the app
  //   this.auth1.loginData(form.value).subscribe(
  //     (results: any) => {
  //       this.auth1.saveToken(results.token);
  //       this.user = this.jwt.getData(results.token);

  //       if(this.user!=null) {
  //         sessionStorage.setItem('role', this.user.account);
  //         this.role = this.user.account;
  //      }


  //       if (this.role == 'PARENT') {
  //         this.router.navigateByUrl('/parent-home');
  //       } else if (this.role == 'OWNER') {
  //         this.router.navigateByUrl('/owner-home');
  //       } else if (this.role == 'ADMIN') {
  //         this.router.navigateByUrl('/admin/schools');
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }


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
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('key')
    this.router.navigateByUrl('login');
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
