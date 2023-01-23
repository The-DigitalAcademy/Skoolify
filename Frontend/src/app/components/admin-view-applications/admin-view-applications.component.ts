import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerApplication } from 'src/app/interfaces/applications';
import { Owner } from 'src/app/interfaces/owner';
import { School } from 'src/app/interfaces/school';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-view-applications',
  templateUrl: './admin-view-applications.component.html',
  styleUrls: ['./admin-view-applications.component.scss']
})
export class AdminViewApplicationsComponent implements OnInit {

    applications : OwnerApplication[] = [];
    schools : School[] = [];
    owners: Owner [] = [];
    vehicles: Vehicle[] = [];



  constructor(private adminService:AdminService,private router: Router) {

   }

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications()
  {
    this.adminService.viewAllApplications().subscribe((applications:OwnerApplication[])=>{
      this.applications =  applications;

      this.applications.forEach(application => {
        this.adminService.viewOwner(application.owner_id).subscribe((owner: Owner)=>{
          this.owners.push(owner);

          this.adminService.viewSchool(application.school_id).subscribe((school:School)=>{
            this.schools.push(school)

            this.adminService.viewVehicle(application.vehicle_id).subscribe((vehicle:Vehicle)=>{
              this.vehicles.push(vehicle)

            },(error: HttpErrorResponse)=>{
              // error fetching vehicle
              console.log(error)
            })//fetching vehicle

          },(error: HttpErrorResponse)=>{
            // error fetching school
          })//fetching school

        },(error: HttpErrorResponse)=>{
          // error fetching owner
        })//fetching owner

      });

    },(error: HttpErrorResponse)=>{
      //failed to get applications
      console.log(error)
    })
  }

  selectApplication(application_id:any)
  {
    sessionStorage.setItem('selected_application',application_id);
    this.router.navigateByUrl('admin/view-application')
  }

}
