import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import { FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { response } from 'express';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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

  editDriver(rec:any)
  {
    console.log("helllo", rec)

    this.addVehicleForm.setValue({
      vehicle_reg: rec.vehicle_reg,
      model: rec.model,
      brand: rec.brand,
      driver_name:rec.driver_name,
      driver_cellphone: rec.driver_cellphone,
      color: rec.color,
      vehicle_img: 'n/a',
      driver_img:'n/a',
      documents:'n/a'
    })

  }

  onFileChange($event: Event) {}
  onSubmit(form: FormGroup) {

    const formData = new FormData();    
    formData.append("file",this.file)    
    formData.append("upload_preset","i8maua2c");     
    sessionStorage.setItem('image_link',this.image_link);

    let vehiDetails =
    {
      owner_id: 3,
      vehicle_reg: form.value.vehicle_reg,
      model: form.value.model,
      brand: form.value.brand,
      driver_name:form.value.driver_name,
      driver_cellphone: form.value.driver_cellphone,
      driver_image: 'n/a',
      document: 'n/a',
      color: form.value.color,
      vehicle_image: 'n/a'
    }

    this.service.addvehicle(vehiDetails).subscribe((next: any) => {
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
  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dev-lab/image/upload';
  onFile: any;
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















