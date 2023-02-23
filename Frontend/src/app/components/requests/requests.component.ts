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
  Vehicle : any;

  requests : RequestInterface[] = [];
  vehicles :any;
  messages: string = 'Request'
  //checking the id
  school_id=sessionStorage.getItem('school_id')
  //ids
  schoolID:any = sessionStorage.getItem('selected_school');
  parentID:any = 0;
  ownerID: any = 0;

  registerForm1 = new FormGroup({
    address: new FormControl(''),
    message: new FormControl(''),
    num_kids:new FormControl(''),
    description:new FormControl(''),
  });

  addRequestForm = new FormGroup({
    address: new FormControl(''),
    message: new FormControl(''),
    num_kids:new FormControl(''),
    description:new FormControl(''),

  })
  formBuilder: any;


  constructor(private toast: HotToastService,private jwt : JwtService, private service:ParentService,private location:Location,private router:Router) { }


ngOnInit(): void {
  sessionStorage.setItem('state','Goo...');

  this.parentID = this.jwt.getData(sessionStorage.getItem('key'))?.user_id
  console.log(' Id parent')

  console.log(sessionStorage.getItem('selected_vehicle'))
  
  this.service.ViewoneVehicle(Number(sessionStorage.getItem('selected_vehicle'))).subscribe(async(vehicle:any)=>{
    console.log(Object.keys(vehicle).length)
    this.vehicles = vehicle;
    this.ownerID =  vehicle.vehicle.owner_id;
    console.log('first',this.ownerID);

console.log(this.vehicles,'hello sipho')
console.log(this.vehicle[0].owner_id + 'yesassss')

    this.all= localStorage.getItem('allInfo')
this.details = JSON.parse(this.all)





this.driverName=this.vehicle[0].driver_name;
console.log(this.driverName,'charity');
this.vehicleName=this.vehicle[0].brand;
this.vehicleModel=this.vehicle[0].model;
 this.price1=this.vehicle[0].price;
this. vehicleReg=this.vehicle[0].vehicle_reg;
this.color=this.vehicle[0].color;
this.ratings1=this.vehicle[0].ratings
//this.owner1=this.[0].name
this.driverImage=this.vehicle[0].driver_image
this.votes=this.details[0].votes

  },(error:HttpErrorResponse)=>{

    //owner fetching error
    console.log(error);
  })
  
  this.registerForm1 = this.formBuilder.group({ address: new FormControl(''),
       message: new FormControl(''),
       description: new FormControl(''),
       num_kids: new FormControl(''),   })
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


  onSubmit(form:FormGroup)
  {
    
    console.log(form);

    if(this.jwt.isAuthenticated() && this.jwt.getData(sessionStorage.getItem('key'))?.account == 'PARENT'){
      this.messages = "Saving...";
      this.load = true;

      let dataValues = {
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

    }
    else{
      sessionStorage.setItem('guestState','schoolSelected')
      this.toast.warning('Oops!, No privilage to this, Sign in first')
      this.router.navigateByUrl('/login');
    }




  }

  onRegister(form: FormGroup) {

    console.log('i ran')
    
        let dataValues = {
    
          address: form.value.address,
          message: form.value.message,
          num_kids:form.value.num_kids,
          description:form.value.description,
          school_id:this.schoolID,
          parent_id:this.parentID,
          owner_id:this.vehicle[0].owner_id,
        }
      
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
        // console.log('i ran 2')
        console.log('data here',dataValues)
      }


}
