import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import { Router } from '@angular/router'; 
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-remove-vehicle',
  templateUrl: './remove-vehicle.component.html',
  styleUrls: ['./remove-vehicle.component.scss']
})
export class RemoveVehicleComponent implements OnInit {
  selected_vehicles: number = 0;
  load: boolean = false;
  message: string= 'Remove Vehicle'
  vehicle!: Vehicle
  AddvehicleService: any;
  delete: any;
  // addVehicleForm: any;
  image_link: string = '';
  onFileChangePdf: any;
  onFileChange: any;
  onDriverImg: any;
  onVehicleImg: any;
  
  onSubmit(arg0: FormGroup) {
  }
  FormBuilder: any;
  file: any;
  public vehicles!:any[];
  imageUrl!:any;

  addVehicleForm: FormGroup = new FormGroup({
    model: new FormControl(''),
    brand: new FormControl(''),
    vehicle_reg: new FormControl(''),
    color: new FormControl(''),
    vehicle_img: new FormControl(''), 
    driver_name: new FormControl(''),
    driver_img: new FormControl(''), 
    documents: new FormControl(''), 
    driver_cellphone: new FormControl('')
  });
  submitted = false;
  productsService: any;
  router: any;
  addvehicleservice: any;
  vehicleDetails: any;

  constructor(private service: AddvehicleService) {}
  ngOnInit(): void {
  
  //   this.AddvehicleService.viewvehicle(Number(sessionStorage.getItem('selected_Vehicle'))).subscribe((vehicle:Vehicle)=>{
  //     this.vehicle = vehicle
  //   })


  // },(error:HttpErrorResponse)=>{
  //   console.log(error)
  // });

}
    // this.viewvehicle.back()
    // sessionStorage.removeItem('selected_vehicle')

  remove()
  {
   
    this.AddvehicleService.RemoveVehicle(Number(sessionStorage.getItem('selected_vehicle'))).subscribe((result:any)=>{
      setTimeout(() => {
        this.message ='Removed';
      })
      });

  }


  //   let vehicleDetails= {
  //     model: this.addVehicleForm.value.model,
  //     brand: this.addVehicleForm.value.brand,
  //     vehicle_reg: this.addVehicleForm.value.vehicle_reg,
  //     color: this.addVehicleForm.value.color,
  //     vehicle_img: this.addVehicleForm.value.vehicle_img,
  //     driver_name: this.addVehicleForm.value.driver_name,
  //     driver_img: this.addVehicleForm.value.driver_img,
  //     documents:this.addVehicleForm.value.documents,
  //     driver_cellphone: this.addVehicleForm.value.driver_cellphone
  //   }
  //   console.log(vehicleDetails);

  //   this.AddvehicleService.deleteVehicle(this.vehicleDetails.subscribe((next:any) => {
  //     this.router.navigate(['/vehiclelist']);
  //     this.submitted = false;
  //   }))

  // }

  // get formValidation(): { [key: string]: AbstractControl } {
  //   return this.addVehicleForm.controls;
  // }

}


 