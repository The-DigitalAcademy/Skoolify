import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Transporter } from 'src/app/interfaces/transporter';
import { ParentService } from 'src/app/services/schools/parent.service';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestInterface } from 'src/app/interfaces/request';
import { School } from 'src/app/interfaces/school';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  data:any;
  owner1:any
  all:any;
  details:any;
  ratings1:any
  vehicleReg:any;
  driverName:any;
  vehicleName:any;
  driverImage:any;
  color:any;
  price1:any;
  vehicleModel:any;
    selected_school: number = 0;
  load : boolean = false;
  vehicle: Vehicle[] =[]
  transporters : Transporter[] = [];
  vehicles : Vehicle[] = [];
  requests : RequestInterface[] = [];
  messages: string = 'Request'
  //checking the id
  school_id=sessionStorage.getItem('school_id')
  //ids
  schoolID:any = sessionStorage.getItem('selected_school');
  parentID:any = sessionStorage.getItem('user_ID');
  ownerID:any = sessionStorage.getItem('selected_vehicle');



  addRequestForm = new FormGroup({
    address: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    message: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    num_kids:new FormControl,
    description:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
  
  })


  constructor(private service:ParentService,private location:Location,private router:Router) { }


//  ngOnInit(): void {
//     this.service.viewVehicle(Number(sessionStorage.getItem('selected_vehicle'))).subscribe((vehicle:Vehicle)=>{
//       this.vehicle = vehicle;

//       this.service.viewSchoolTransporters(Number(sessionStorage.getItem('selected_school'))).subscribe((transporters:Transporter[])=>{
//         this.transporters = transporters;
        
//       //  console.log("this id",this.school_id)

//         transporters.forEach(transporter => {
//           this.service.viewVehicle(transporter.vehicle_id).subscribe((vehicle:Vehicle)=>{

//             this.vehicles.push(vehicle)


//           },(err:HttpErrorResponse)=>{
//             console.log(err)
//             //failed to get vehicle
//           })
          
//         });


//       })
//       console.log(this.vehicles);
//     },(error:HttpErrorResponse)=>{
//       //failed to view school
//       console.log(error)
//     });
   
//   }

ngOnInit(): void {

  console.log(sessionStorage.getItem('selected_vehicle'))
  this.service.viewVehicle(Number(sessionStorage.getItem('selected_school'))).subscribe(async(vehicle:Vehicle[])=>{
    this.vehicle = await vehicle;

    // this.service.viewOwnerVehicles(Number(sessionStorage.getItem('selected_owner'))).subscribe((vehicles:Vehicle[])=>{
    //   this.vehicles = vehicles;
    // },(error:HttpErrorResponse)=>{
    //   //vehicles fetching error
    //   console.log(error);
    // })
    this.all= localStorage.getItem('allInfo')
this.details = JSON.parse(this.all)

console.log(this.details,'xoz')


this.driverName=this.details[0].driver_name;
this.vehicleName=this.details[0].brand;
this.vehicleModel=this.details[0].model;
 this.price1=this.details[0].price;
this. vehicleReg=this.details[0].vehicle_reg;
this.color=this.details[0].color;
this.ratings1=this.details[0].ratings
this.owner1=this.details[0].name
this.driverImage=this.details[0].driver_image





// this.vehicleReg=vehicle.vehicle_reg;
// this.driverName=vehicle.driver_name;
// this.vehicleName=vehicle.brand;
// this.vehicleModel=vehicle.model;
// this.color=vehicle.color;
// this.price1=vehicle.price;
  },(error:HttpErrorResponse)=>{

    //owner fetching error
    console.log(error);
  })
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


  // onSubmit(data: FormGroup)
  // {
  //   this.messages = "Saving...";
  //   this.load = true;
  //   this.service.addRequests(data.value).subscribe((result:any) => {
     
  //     console.log('added school')
  //     data.reset()
  //     setTimeout(() => {
  //       this.messages = "Saved";
  //       this.load = false;
  //     }, 2000);

  //     setTimeout(() => {
  //       this.messages = "Save";
  //     }, 4000);
  //   },(error:HttpErrorResponse)=>{
  //     //failed to save school
  //     console.log(error)

  //   })

  // }

  onSubmit(form: FormGroup)
  {
    this.messages = "Saving...";
    this.load = true;

    const dataValues= {
    
      address: form.value.address,
    
      message: form.value.message,
      num_kids:form.value.num_kids,
      description:form.value.description,
      // parent_id:sessionStorage.getItem('parent_id'),
      // school_id:sessionStorage.getItem('school_id'),
      // owner_id:sessionStorage.getItem('owner_id')
      school_id:this.schoolID,
      parent_id:this.parentID,
      owner_id:this.ownerID,
      
    }


    console.log("add",dataValues)

    this.service.addRequests(dataValues).subscribe((result:any) => {
     
      console.log('added school')
      // data.reset()
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