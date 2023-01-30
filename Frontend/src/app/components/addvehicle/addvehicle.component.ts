import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { response } from 'express';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss'],
})
export class AddvehicleComponent implements OnInit {
  image_link: string = '';

  constructor(private service: AddvehicleService, private router : Router) {}

  ngOnInit(): void {
    this.service.viewvehicle(3).subscribe((view) => {
      console.log(view);

      this.data = view;
      console.log('selected vehicle', view);
      this.image_link = JSON.stringify(sessionStorage.getItem('image_link'));

      let vehicleDetails = {
        model: this.addVehicleForm.value.vehicleModel,
        brand: this.addVehicleForm.value.vehiclebrand,
        vehicle_reg: this.addVehicleForm.value.Registrationumber,
        color: this.addVehicleForm.value.vehiclecolor,
        driver_name: this.addVehicleForm.value.driverName,
        driver_cellphone: this.addVehicleForm.value.drivercellphone,

      };
    });
  }

  onFileChange($event: Event) {}


  onSubmit(form: FormGroup) {
    this.service.addvehicle(form.value).subscribe((next: any) => {
      console.log('Vehicle has been added successfully!');
      
      //this.router.navigate(['/addvehicle/vehiclelist']);
      //this.submitted = false;
    });
  }

  addvehicle() {}
  FormBuilder: any;
  file: any;
  company!: any;
  public cars!: any[];
  imgUrl!: any;
  data: any;
  submitted: any;
  cloudinaryUrl: string =
    'https://api.cloudinary.com/v1_1/dev-lab/image/upload';
  isUpdating: boolean = false;

  addVehicleForm = new FormGroup({
    model: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    brand: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    vehicle_reg: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    color: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    vehicle_img: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
   
    driver_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    driver_img: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    documents: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
driver_cellphone: new FormControl('',[
  Validators.required,
  Validators.pattern('^[a-zA-Z ]*$'),
]),
    
  });

  onFileChangePdf(e: any) {}
}

//   onsubmit(data: FormGroup)
//   {
//     this.load = true;
//     this.addvehicleService.addvehicle(data.value).subscribe((result:any) => {
//       this.getVehicles()
//       console.log('vehicle added')
//       data.reset()
//       setTimeout(() => {
//         this.load = false;
//       }, 2000);

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
