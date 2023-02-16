import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { OwnerApplication } from 'src/app/interfaces/applications';
import { application, Application } from 'express';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtService } from 'src/app/services/jwt.service';
@Component({
  selector: 'app-requests-owner',
  templateUrl: './requests-owner.component.html',
  styleUrls: ['./requests-owner.component.scss']
})
export class RequestsOwnerComponent implements OnInit {
parseFloat(arg0: string): string|number {
throw new Error('Method not implemented.');
}
price1:any
school1:any
applications:OwnerApplication[] = [];
schoolName:any;
  constructor(private services:OwnerService,private jwt: JwtService) { }
OwnerApplication!:OwnerApplication

  ngOnInit(): void {

this.services.viewOwnerRequests(this.jwt.getData(sessionStorage.getItem('key'))?.user_id).subscribe((applications1:any)=>{
  this.applications=applications1;
},(error:HttpErrorResponse)=>{
  //failed to view vehicle
  console.log(error)
});
  }

}
