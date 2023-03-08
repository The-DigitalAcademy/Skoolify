import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { OwnerApplication } from 'src/app/interfaces/applications';
import { application, Application } from 'express';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtService } from 'src/app/services/jwt.service';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
@Component({
  selector: 'app-requests-owner',
  templateUrl: './requests-owner.component.html',
  styleUrls: ['./requests-owner.component.scss'],
})
export class RequestsOwnerComponent implements OnInit {
  parseFloat(arg0: string): string | number {
    throw new Error('Method not implemented.');
  }
  price1: any;
  school1: any;
  applications: any[] = [];
  schoolName: any;
  constructor(private services: OwnerService, private jwt: JwtService,private toast : HotToastService) {}
  OwnerApplication!: OwnerApplication;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.applications = []
    this.services
      .viewOwnerRequests(
        this.jwt.getData(sessionStorage.getItem('key'))?.user_id
      )
      .pipe(
        this.toast.observe({
        loading: 'Fetching your applications...',
        success:(s:any) => 'Done!',
        error: (e) =>  'Error fetching applications',
     }),catchError((error) => of(error))
      ).subscribe(
        (applications1: any) => {
          applications1.forEach((application: any) => {
            this.services
              .viewOneApplication(application.application_id)
              .subscribe((full: any) => {
                this.applications.push(full);
              });
          });
        },
        (error: HttpErrorResponse) => {
          //failed to view vehicle
        }
      );
  }
}
