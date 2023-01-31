import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwnerApplication } from 'src/app/interfaces/applications';
import { School } from 'src/app/interfaces/school';
import { Transporter } from 'src/app/interfaces/transporter';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-view-one-school',
  templateUrl: './admin-view-one-school.component.html',
  styleUrls: ['./admin-view-one-school.component.scss']
})
export class AdminViewOneSchoolComponent implements OnInit {

  selected_school: number = 0;
  load: boolean = false;
  message: string= 'Remove School'
  school!: School
  transporters : Transporter[] = [];

  constructor(private location:Location,private adminService: AdminService) { }

  ngOnInit(): void {

    this.adminService.viewSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((school:School)=>{
      this.school = school;
      this.adminService.viewSchoolTransporters(Number(sessionStorage.getItem('selected_school'))).subscribe((transporters:Transporter[])=>{
        this.transporters = transporters;
      })
    },(error:HttpErrorResponse)=>{
      //failed to view school
      console.log(error)
    });
  }

  back()
  {
    this.location.back()
    sessionStorage.removeItem('selected_school')
  }

  removeSchool()
  {
    this.message ='Removing'
    this.load = true;
    this.adminService.removeSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((result:any)=>{
      setTimeout(() => {
        this.load= false
        this.message ='Removed'
      }, 2000);

      setTimeout(() => {
        this.back();
      }, 3000);


    },(error:HttpErrorResponse)=>{
      //failed to remove
      console.log(error)
    })

  }





}
