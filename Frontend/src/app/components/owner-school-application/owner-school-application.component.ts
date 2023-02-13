import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import { HttpErrorResponse } from '@angular/common/http'; 
import { ParentService } from 'src/app/services/schools/parent.service';
import { Vehicle } from 'src/app/interfaces/vehicle'; 
import{Transporter} from 'src/app/interfaces/transporter';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import{School} from 'src/app/interfaces/school';
import { OwnerService } from 'src/app/services/owner.service';
import { Router } from '@angular/router';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-owner-school-application',
  templateUrl: './owner-school-application.component.html',
  styleUrls: ['./owner-school-application.component.scss']
})
export class OwnerSchoolApplicationComponent implements OnInit {
//   [x: string]: any;
  message: string = 'Save';
//   user_id : any;
  selected_school: number = 0; 
  transporters : Transporter[] = [];
  school!: School;
  transporter!: Transporter; 
  // // vehicles : Vehicle[] = [];
  // vehicle!: Vehicle;
  load : boolean = false;
  vehicle: Vehicle[] = [];
//   @Input() data: any;

schoolID:any = sessionStorage.getItem('selected_school');
ownerID:any = sessionStorage.getItem('user_ID');
vehicleID:any = sessionStorage.getItem('selected_vehicle');
//  price: any;
//  owner_id: any;
//  vehicle_id: any;
//  school_id: any;

//  priceInput = new FormGroup({
//   price: new FormControl,
//   owner_id: new FormControl,
//   vehicle_id: new FormControl,
//   school_id:new FormControl,
//     });
priceInputForm = new FormGroup({
  price:new FormControl,
  vehicle_id: new FormControl,
})


  constructor(private service:ParentService,private location:Location,public fb: FormBuilder,private router:Router,private jwt : JwtService,private services:OwnerService,) { }

  // ngOnInit(): void {

  //   console.log(sessionStorage.getItem('selected_school'))
  //   this.service.viewSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((school:School)=>{
  //   this.school = school;

 
    
   
  //   },(error:HttpErrorResponse)=>{
  
  //     //owner fetching error
  //     console.log(error);
  //   })
  // }

    ngOnInit(): void {
   
    
    
  
      this.service.viewSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((school:School)=>{
      this.school = school;

      this.service.getVehicleUser(this.ownerID).subscribe((vehicles:Vehicle[])=>{

        this.vehicleID = school.school_id;
        this.vehicle = vehicles
        

        vehicles.forEach(vehicle => {
          this.vehicle.push(vehicle)
          console.log(vehicle.brand)


        });
      

      
      console.log("hello");
      console.log(school);
      console.log(vehicles);
    },(error:HttpErrorResponse)=>{
      //failed to view vehicle
      console.log(error)
    });
  
  })
    }

  back()
  {
    this.location.back()
    sessionStorage.removeItem('selected_school')
  }

  onSubmit(form: FormGroup)
  {
    this.message = "Saving...";
    this.load = true;

    const applicationData= {
    
      price:form.value.price,
      school_id:this.schoolID,
      owner_id:this.ownerID,
      vehicle_id:this.vehicleID,
      
    }


    console.log("add",applicationData)

    this.services.price(applicationData).subscribe((result:any) => {
     
      console.log('added application')
      // data.reset()
      setTimeout(() => {
        this.message = "Saved";
        this.load = false;
      }, 2000);

      setTimeout(() => {
        this.message = "Save";
      }, 4000);
    },(error:HttpErrorResponse)=>{
      //failed to save school
      console.log(error)

    })




  }

//   ngOnInit(): void {
   
    
//     this.user_id = this.jwt.getData(sessionStorage.getItem('key'))?.user_id;

//     console.log('user id = '+this.user_id)
//     this.owner_id = this.user_id;
 
  
//       this.service.viewSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((school:School)=>{
//       this.school = school; 
//       this.service.getVehicleUser(this.user_id).subscribe((vehicles:Vehicle[])=>{

//         this.school_id = school.school_id;
//         this.vehicle = vehicles
        

//         // vehicles.forEach(vehicle => {
//         //   this.vehicle.push(vehicle)
//         //   console.log(vehicle.brand)


//         // });
      

      
//       console.log("hello");
//       console.log(school);
//       console.log(vehicles);
//     },(error:HttpErrorResponse)=>{
//       //failed to view vehicle
//       console.log(error)
//     });
  
//   })



// }
//   back()
//   {
//     //sessionStorage.removeItem('selected_application');
//     this.location.back();
    
//   }
   
      

  getVehicleUser(owner_id:any){
    console.log(owner_id)

    sessionStorage.setItem('selected_school',owner_id);

    this.router.navigateByUrl('schoolsApplication');
  }



selectOwner(user_id:any)
{
  sessionStorage.setItem('selected_owner', user_id);
 console.log("hello")
}


// onSubmit(data: FormGroup)
// {

//   this.router.navigateByUrl('owner-requestNotification');

//   console.log(this.owner_id )

//   this.priceInput.value.school_id = this.school_id
//   this.priceInput.value.owner_id = this.owner_id

//   console.log(this.priceInput.value)

//   this.services.price(this.priceInput).subscribe( (results: any) => {
   
//       this.price.saveToken(results.token);
//     console.log('submitted')

//        this.price = this.jwt.getData(results.token);
//     })

  
//   }
  
    // )}}
}