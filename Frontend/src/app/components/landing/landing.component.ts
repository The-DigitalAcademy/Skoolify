import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  user: any

  constructor(private jwt: JwtService,private toast:HotToastService,private router:Router) { }

  ngOnInit(): void {
    //check if user is logged in
    sessionStorage.setItem('state','Goo...');

    if(this.jwt.isAuthenticated()){
      this.user = this.jwt.getData(sessionStorage.getItem('key'));
      this.toast.success('You\'re already logged in')
      sessionStorage.setItem('state','logged in');


      if (this.user?.account == 'PARENT') {
        this.router.navigateByUrl('/parent-home');
      } else if (this.user?.account == 'OWNER') {
        this.router.navigateByUrl('/owner-home');
      } else if (this.user?.account == 'ADMIN') {
        this.router.navigateByUrl('/admin/schools');
      }

    }
  }

}
