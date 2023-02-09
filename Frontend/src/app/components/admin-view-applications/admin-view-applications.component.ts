import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
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
    prices :string [] =[];
    selected_application = 0;

    load : boolean = false;
    messageApprove : string = 'Approve';
    loadApprove : boolean = false;
    loadDecline : boolean = false;
    messageDecline: string = 'Decline';

    feedback = new FormGroup({
      feedback:new FormControl()
    })


  constructor(private adminService:AdminService,private router: Router, private http: HttpClient) {

   }

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications()
  {
    this.adminService.viewAllApplications().subscribe((applications:OwnerApplication[])=>{
      this.applications =  applications;

      this.applications.forEach(application => {
        this.prices.push(application.price.replace('$','R'));

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
  }
  openApplication(application_id:any)
  {
    sessionStorage.setItem('selected_application',application_id);
    this.router.navigateByUrl('admin/view-application')



  }

  selectSchool(school_id:any)
  {
    sessionStorage.setItem('selected_school',school_id);
    this.router.navigateByUrl('admin/view-school')
  }

  selectOwner(owner_id:any)
  {
    sessionStorage.setItem('selected_owner',owner_id);
    this.router.navigateByUrl('admin/view-owner')
  }


  viewDocument(vehicle : Vehicle){
    //this.load = true;
    this.http.get(vehicle.document, { responseType: 'blob' }).subscribe(response => {
      saveAs(response, '.pdf');
    },(error:HttpErrorResponse)=>{
      //failed to retrieve pdf file
      console.log(error);

    });

    setTimeout(() => {
      this.load = false
    }, 2000);
  }




  approveApplication(application: OwnerApplication){
    //this.loadApprove = true;
    //this.messageApprove = 'Approving'

    this.adminService.approveApplication(application).subscribe((result:any) => {
      this.getApplications()

    },(error:HttpErrorResponse)=>{
      //failed to approve application
      console.log(error)
    })



  }

  declineApplication(id:number){
    this.selected_application = id;
    console.log(id);
  }

  onDecline(form:FormGroup)
  {

    this.adminService.declineApplication(this.selected_application,form.value).subscribe((result:any) => {
      this.getApplications();
      //

    },(error:HttpErrorResponse)=>{
      //failed to approve application
      console.log(error)
    })

    setTimeout(() => {

    }, 2000);

  }

}
