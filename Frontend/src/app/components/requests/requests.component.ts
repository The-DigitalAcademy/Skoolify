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
import { JwtService } from 'src/app/services/jwt.service';
import { HotToastService } from '@ngneat/hot-toast';

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
  votes:any;
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
  parentID:any = 0
  ownerID:any = sessionStorage.getItem('selected_vehicle');



  addRequestForm = new FormGroup({
    address: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    message: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    num_kids:new FormControl,
    description:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),

  })


  constructor(private toast: HotToastService,private jwt : JwtService, private service:ParentService,private location:Location,private router:Router) { }


ngOnInit(): void {
  sessionStorage.setItem('state','Goo...');

  this.parentID = this.jwt.getData(sessionStorage.getItem('key'))?.user_id

  console.log(sessionStorage.getItem('selected_vehicle'))
  this.service.viewVehicle(Number(sessionStorage.getItem('selected_school'))).subscribe(async(vehicle:Vehicle[])=>{
    this.vehicle = await vehicle;

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
this.votes=this.details[0].votes

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


  onSubmit(form: FormGroup)
  {

    if(this.jwt.isAuthenticated() && this.jwt.getData(sessionStorage.getItem('key'))?.account == 'PARENT'){
      this.messages = "Saving...";
      this.load = true;

      const dataValues= {

        address: form.value.address,

        message: form.value.message,
        num_kids:form.value.num_kids,
        description:form.value.description,
        school_id:this.schoolID,
        parent_id:this.parentID,
        owner_id:this.ownerID,

      }


      console.log("add",dataValues)
      this.toast.loading('Requesting ...',{duration:3000})

      this.service.addRequests(dataValues).subscribe((result:any) => {

        setTimeout(() => {
          form.reset()
          this.toast.success('Request sent')

        }, 2000);

        setTimeout(() => {
          this.messages = "Save";
        }, 4000);
      },(error:HttpErrorResponse)=>{
        //failed to save school
        this.toast.error('Failed to send request')

        console.log(error)

      })

    }else{
      sessionStorage.setItem('guestState','schoolSelected')
      this.toast.warning('Oops!, No privilage to this, Sign in first')
      this.router.navigateByUrl('/login');
    }




  }




}
