import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Application } from 'express';
import * as saveAs from 'file-saver';
import { OwnerApplication } from 'src/app/interfaces/applications';
import { Owner } from 'src/app/interfaces/owner';
import { School } from 'src/app/interfaces/school';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-view-one-application',
  templateUrl: './admin-view-one-application.component.html',
  styleUrls: ['./admin-view-one-application.component.scss']
})
export class AdminViewOneApplicationComponent implements OnInit {

  owner !: Owner;
  vehicle !: Vehicle;
  school !: School;
  application : any;
  price : string = ''

  load : boolean = false;
  loadDecline : boolean = false;
  loadApprove : boolean = false;


  messageApprove: string  = 'Approve';
  messageDecline: string  = 'Decline';

  feedback = new FormGroup({
    feedback:new FormControl()
  })


  constructor(private location : Location,private adminService : AdminService,private http :HttpClient) { }

  ngOnInit(): void {

    this.adminService.viewApplication(Number(sessionStorage.getItem('selected_application'))).subscribe((application:any) => {
      this.application = application;
    })
  }

  back()
  {
    sessionStorage.removeItem('selected_application');
    this.location.back();
  }

  viewDocument(){
    this.load = true;

    this.http.get(this.application.vehicle.document, { responseType: 'blob' }).subscribe(response => {
      saveAs(response, '.pdf');
    },(error:HttpErrorResponse)=>{
      //failed to retrieve pdf file
      console.log(error);

    });


    setTimeout(() => {
      this.load = false
    }, 2000);
  }



  approveApplication(){
    this.loadApprove = true;
    this.messageApprove = 'Approving'

    this.adminService.approveApplication(this.application.application).subscribe((result:any) => {

    },(error:HttpErrorResponse)=>{
      //failed to approve application
      console.log(error)
    })


  setTimeout(() => {
    this.back()
  }, 2000);
  }

  declineApplication(){
    this.loadDecline = true;
    this.messageDecline = 'Declining'


  }

  onDecline(form:FormGroup)
  {
    this.adminService.declineApplication(this.application.application.application_id,form.value).subscribe((result:any) => {
      //

    },(error:HttpErrorResponse)=>{
      //failed to approve application
      console.log(error)
    })

    setTimeout(() => {
      this.back()
    }, 2000);

  }

}
