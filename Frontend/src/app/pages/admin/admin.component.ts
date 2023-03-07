import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { OwnerApplication } from 'src/app/interfaces/applications';
import { Owner } from 'src/app/interfaces/owner';
import { School } from 'src/app/interfaces/school';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  applications: number = 0;
  owners: number = 0;
  schools: number = 0;
  verified: number = 0;
  topRated : Owner[] = [];

  constructor(private admin :AdminService, private toast : HotToastService,private router : Router) { }

  ngOnInit(): void {
    this.admin.viewAllApplications().subscribe((applications: OwnerApplication[])=>{
      this.applications = applications.length;
    },(error: HttpErrorResponse)=>{
      this.toast.error(error.error.message)
    })

    this.admin.viewAllOwners().subscribe((owners: any)=>{
      this.owners = owners.length;
    },(error: HttpErrorResponse)=>{
      this.toast.error(error.error.message)
    })

    this.admin.viewSchools().subscribe((schools: School[])=>{
      this.schools = schools.length;
    },(error: HttpErrorResponse)=>{
      this.toast.error(error.error.message)
    })

    this.admin.viewTransporters().subscribe((transporters: any[])=>{
      this.verified = transporters.length;
    },(error: HttpErrorResponse)=>{
      this.toast.error(error.error.message)
    })

    this.admin.topRated().subscribe((owners: Owner[])=>{
      this.topRated = owners;
    },(error: HttpErrorResponse)=>{
      this.toast.error(error.error.message)
    })






  }

  selectOwner(id:any){
    sessionStorage.setItem('selected_owner',id);
    this.router.navigateByUrl('/admin/view-owner')
  }

}
