import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { School } from 'src/app/interfaces/school';
import { Transporter } from 'src/app/interfaces/transporter';
import { ParentService } from 'src/app/services/schools/parent.service';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  data:any;
  all:any;
  details:any;
  selected_school: number = 0;
  school!: School;
  schoolName: any;
  driverProfile:any;
  vehicleName:any;
  driverName:any;
  vehicleModel:any;
  vehicleColor:any;
  schoolLocation:any;
  transporters : Transporter[] = [];
  school_id=sessionStorage.getItem('school_id')
  vehicles : Vehicle[] = [];
  vehichleData:any;
  lenght:any;
  ratings1:any;
count=0;
  constructor(private service:ParentService,private location:Location,private router:Router) { }

  ngOnInit(): void {

    this.service.viewSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((school:School)=>{
     this.school = school;
     this.schoolName = this.school.school_name;
      this.schoolLocation=this.school.school_location;
      console.log("school",this.school.school_name)

    //   console.log("this id",this.selected_school)
   this.service.viewSchoolTransporters(Number(sessionStorage.getItem('selected_school'))).subscribe((transporters:Transporter[])=>{
     this.transporters = transporters;



     this.service.viewVehicle(Number(sessionStorage.getItem('selected_school'))).subscribe((vehicle:Vehicle[])=>{

      //console.log(Object.keys(vehicle).length)
      this.vehichleData = vehicle;
      this.lenght=Object.keys(vehicle).length

  //console.log(vehicle[0].ratings,"gg")
  this.ratings1=vehicle[0].ratings
  //console.log(vehicle)
  localStorage.setItem('allInfo',JSON.stringify(vehicle))
  this.all= localStorage.getItem('allInfo')
  this.details = JSON.parse(this.all)

  //             this.vehicles.push(vehicle)
  // console.log(vehicle.driver_name);
  // this.driverName=vehicle.driver_name;
  // this.vehicleName=vehicle.brand;
  // this.vehicleColor=vehicle.color;
  // this.driverProfile=vehicle.driver_image
  // this.vehicleModel=vehicle.model;
  // console.log(this.driverProfile);

          },(err:HttpErrorResponse)=>{

  //     //         //failed to get vehicle
           })




        })
      //   console.log(this.vehicles);
      },(error:HttpErrorResponse)=>{
      //   //failed to view school
      console.log(error)
       });









    }

  back()
  {
    this.location.back()
    sessionStorage.removeItem('selected_school')
  }

  viewVehicle(vehicle_id:any)
  {
    sessionStorage.setItem('selected_vehicle',vehicle_id);

    this.router.navigateByUrl('/request')
  }

}

