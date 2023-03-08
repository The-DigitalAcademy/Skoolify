import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import * as saveAs from 'file-saver';
import { of } from 'rxjs';
import { catchError } from 'rxjs';
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
    this.adminService.viewAllApplications().pipe(
    //   this.toast.observe({
    //     loading: 'Fetching applications...',
    //     success:(s:any) => 'Done!',
    //     error: (e) =>  'Error fetching applications',
    //  }),catchError((error) => of(error))
    ).subscribe( (applications:OwnerApplication[])=>{
      applications.forEach(app => {
        this.adminService.viewApplication(app.application_id).subscribe((appView:any)=>{
          console.log(appView)
          this.viewApps.push(appView);
        },(error:HttpErrorResponse)=>{
        })
      });
    },(error: HttpErrorResponse)=>{
      //failed to get applications
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


  viewDocument(document : any){
    //this.load = true;
    this.http.get(document, { responseType: 'blob' }).pipe(
      this.toast.observe({
        loading: 'Downloading...',
        success:(s:any) => 'Downloaded!',
        error: (e) =>  'Error downloading'
     }),catchError((error) => of(error))
    ).subscribe(response => {
      saveAs(response, '.pdf');
    },(error:HttpErrorResponse)=>{
    });

    setTimeout(() => {
      this.load = false
    }, 2000);
  }

  approveApplication(application: OwnerApplication){
    this.adminService.approveApplication(application).pipe(
      this.toast.observe({
      loading: 'Approving...',
      success:(s:any) => s.message,
      error: (e) =>  e.error.message,
   }),catchError((error) => of(error))).subscribe((result:any) => {
      this.getApplications()
    },(error:HttpErrorResponse)=>{
      //failed to approve application
    })
  }
  pdfView = '';

  setPdf(pdf: any)
  {
    this.pdfView = pdf.document
  }

  declineApplication(id:number){
    this.selected_application = id;
    console.log(id);
  }

  onDecline(form:FormGroup)
  {

    this.adminService.declineApplication(this.selected_application,form.value).pipe(
      this.toast.observe({
        loading: 'Declining...',
        success:(s:any) => s.message,
        error: (e) =>  e.error.message,
     }),catchError((error) => of(error))
    ).subscribe((result:any) => {
      this.getApplications();
    },(error:HttpErrorResponse)=>{
      //failed to approve application
    })

  }

}
