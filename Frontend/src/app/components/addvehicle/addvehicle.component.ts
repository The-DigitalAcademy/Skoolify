import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
//import { Vehicle } from 'src/app/interfaces/vehicle';
import{Vehicle} from 'src/app/interfaces/vehicle';


@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss']
})
 export class AddvehicleComponent implements OnInit {
  
 data:any;
//   vehicles: Vehicle[] = [];
//   term: string =''
//   load : boolean = false;
//   message: string = 'Save'

//   addVehicleForm = new FormGroup({
//     vehicle_model: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//     vehicle_brand: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//     vehicle_registration: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//     vehicle_color: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//     vehicle_img: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//     owner_id: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//     driver_name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//     driver_img: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//     documents: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
//   })
// addvehicle: any;
constructor(private service:AddvehicleService) { }

ngOnInit(): void {
  this.service.viewvehicle(2).subscribe((view)=>{

    console.log(view);
    

  this.data=view
  console.log("selected vehicle", view)

})
}

}

    
  

 
    






    



  // onSubmit(data: FormGroup)
  // {
  //   this.message = "Saving...";
  //   this.load = true;
  //   this.adminService.addSchool(data.value).subscribe((result:any) => {
  //     this.getSchools()
  //     console.log('added school')
  //     data.reset()
  //     setTimeout(() => {
  //       this.message = "Saved";
  //       this.load = false;
  //     }, 2000);

  //     setTimeout(() => {
  //       this.message = "Save";
  //     }, 4000);
  //   },(error:HttpErrorResponse)=>{
  //     //failed to save school
  //     console.log(error)

  //   })

  









 






















//   vehicleForm!: FormGroup;
//   submitted = false;
//   addvehicle: any;
//   constructor( private addvehicleservice: AddvehicleService, private formBuilder: FormBuilder, private router: Router){}

//   get f() { return this.vehicleForm.controls; }
//   onSubmit() {

//     this.submitted = true;
//     if (this.vehicleForm.invalid) {
//         return;
//     }
//     if(this.submitted)
//     {
      
//        var myFormData = new FormData();
//        myFormData.append('vehicle', this.vehicleForm.value.vehicle);
//        this.addvehicleservice.addvehicle(myFormData);
//        this.router.navigate([`/vehicles`]);
//       }
//   }
//   ngOnInit() {
    
//   }
// }







  
//   vehicles: any;
//   owner_id: any;
//   vehicle_reg: any;
//   model: any;
//   brand: any;
//   driver_name: any;
//   driver_cellphone: any;
//   driver_image: any;
//   document: any;
//   color: any;
//   vehicle_image: any;
//   addvehicleservice: any;
//   data: AddvehicleComponent[] | undefined;

// constructor(private router:Router, private addvehicle:AddvehicleService) { }
 



//   ngOnInit(): void {
//     this.addvehicleservice.getAddehicle()
//     .subscribe((res: AddvehicleComponent[]) => {
//       this.data = res;
//     }, (err: any) => {
//       console.log(err);
//     });
// }

// deleteVehicle(id:any)
//   {
//     this.addvehicleservice.deleteVehicle(id,this.data).subscribe((data:any)=>{
//      this.toast.success(({detail:"Done",summary:"Vehicle deleted"}));
//     },(err: HttpErrorResponse)=>{
//       this.toast.error({detail:"Error", summary:err.error.message});

//     })
  