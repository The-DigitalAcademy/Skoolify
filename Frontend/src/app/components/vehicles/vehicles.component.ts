import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { School } from 'src/app/interfaces/school';
import { Transporter } from 'src/app/interfaces/transporter';
import { ParentService } from 'src/app/services/schools/parent.service';
import { Vehicle } from 'src/app/interfaces/vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  data:any
  selected_school: number = 0;
  school!: School
  transporters : Transporter[] = [];

  vehicles : Vehicle[] = [];

  constructor(private service:ParentService,private location:Location) { }

  ngOnInit(): void {
    this.service.viewSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((school:School)=>{
      this.school = school;
      this.service.viewSchoolTransporters(Number(sessionStorage.getItem('selected_school'))).subscribe((transporters:Transporter[])=>{
        this.transporters = transporters;

        transporters.forEach(transporter => {
          this.service.viewVehicle(transporter.vehicle_id).subscribe((vehicle:Vehicle)=>{

            this.vehicles.push(vehicle)


          },(err:HttpErrorResponse)=>{
            console.log(err)
            //failed to get vehicle
          })
          
        });
        


      })
      console.log(this.vehicles);
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

}

