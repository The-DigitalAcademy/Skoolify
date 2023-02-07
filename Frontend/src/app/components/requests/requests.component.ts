import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { School } from 'src/app/interfaces/school';
import { Transporter } from 'src/app/interfaces/transporter';
import { ParentService } from 'src/app/services/schools/parent.service';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestInterface } from 'src/app/interfaces/request';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  data:any
  selected_school: number = 0;
  load : boolean = false;
  vehicle!: Vehicle
  transporters : Transporter[] = [];
  vehicles : Vehicle[] = [];
  requests : RequestInterface[] = [];
  messages: string = 'Request'


  addRequestForm = new FormGroup({
    pickUp_address: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    message: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    num_kids:new FormControl,
    description:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
  })

  constructor(private service:ParentService,private location:Location,private router:Router) { }


 ngOnInit(): void {
    this.service.viewVehicle(Number(sessionStorage.getItem('selected_vehicle'))).subscribe((vehicle:Vehicle)=>{
      this.vehicle = vehicle;

      this.service.viewSchoolTransporters(Number(sessionStorage.getItem('selected_school'))).subscribe((transporters:Transporter[])=>{
        this.transporters = transporters;
        
       
        // transporters.forEach(transporter => {
        //   this.service.viewVehicle(transporter.vehicle_id).subscribe((vehicle:Vehicle)=>{

        //     this.vehicles.push(vehicle)


        //   },(err:HttpErrorResponse)=>{
        //     console.log(err)
        //     //failed to get vehicle
        //   })
          
        // });


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
    sessionStorage.removeItem('selected_vehicle')
  }
  viewVehicle(vehicle_id:any)
  {
    sessionStorage.setItem('selected_vehicle',vehicle_id);
    this.router.navigateByUrl('/request')

  }


  onSubmit(data: FormGroup)
  {
    this.messages = "Saving...";
    this.load = true;
    this.service.addRequests(data.value).subscribe((result:any) => {
     
      console.log('added school')
      data.reset()
      setTimeout(() => {
        this.messages = "Saved";
        this.load = false;
      }, 2000);

      setTimeout(() => {
        this.messages = "Save";
      }, 4000);
    },(error:HttpErrorResponse)=>{
      //failed to save school
      console.log(error)

    })




  }




  
}
