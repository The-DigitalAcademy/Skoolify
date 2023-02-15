import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
    viewApps : any[] = [];
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


  constructor(private adminService:AdminService,private router: Router, private http: HttpClient, private toast: HotToastService) {

   }

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications()
  {
    this.viewApps = []
    this.toast.loading('Loading applications...',{duration:5000})
    this.adminService.viewAllApplications().subscribe( (applications:OwnerApplication[])=>{
      applications.forEach(app => {
        this.adminService.viewApplication(app.application_id).subscribe(async(appView:any)=>{
          console.log(appView)
          this.viewApps.push(await appView);
        },(error:HttpErrorResponse)=>{
          console.log(error)
        })
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


  viewDocument(vehicle : any){
    //this.load = true;
    this.toast.loading('Downloading...',{duration:2000})
    this.http.get(vehicle.document, { responseType: 'blob' }).subscribe(response => {
      saveAs(response, '.pdf');
      this.toast.success('File downloaded')
    },(error:HttpErrorResponse)=>{
      //failed to retrieve pdf file
      this.toast.error('Error downloading')
      console.log(error);

    });

    setTimeout(() => {
      this.load = false
    }, 2000);
  }




  approveApplication(application: OwnerApplication){
    this.toast.loading('Processing ...',{duration:5000})
    this.adminService.approveApplication(application).subscribe((result:any) => {
      this.getApplications()
      this.toast.success('Application approved')
    },(error:HttpErrorResponse)=>{
      //failed to approve application
      this.toast.error('Error approving application')
      console.log(error)
    })



  }

  declineApplication(id:number){
    this.selected_application = id;
    console.log(id);
  }

  onDecline(form:FormGroup)
  {

    this.toast.loading('Processing ...',{duration:5000})
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
