import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss'],
})
export class AddvehicleComponent implements OnInit {
  image_link: string = '';
  FormBuilder: any;
  //Uploads
  file: any;
  vehicleImg: any;
  driverImg: any;

  company!: any;
  public vehicles!: any[];
  imgUrl!: any;
  data: any;
  vehiclesDetails!:any;

  submitted: any;

  preset: string = 'ylxn7mgj';

  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dkvrb3pye/image/upload';
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
    driver_cellphone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
  });

  constructor(
    private service: AddvehicleService,
    private router: Router,
    private http: HttpClient
  ) {}

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

  editDriver(rec: any) {
    console.log('helllo', rec);

    this.addVehicleForm.setValue({
      vehicle_reg: rec.vehicle_reg,
      model: rec.model,
      brand: rec.brand,
      driver_name: rec.driver_name,
      driver_cellphone: rec.driver_cellphone,
      color: rec.color,
      vehicle_img: this.image.link,
      driver_img: this.image.link,
      documents: '',
    });
  }

  async onVehicleImg(event: any) {
    if (event.target.files.length > 0) {
      this.vehicleImg = event.target.files[0];
      console.log(this.vehicleImg);
      
    }
  }
  async onDriverImg(event: any) {
    if (event.target.files.length > 0) {
      this.driverImg = event.target.files[0];
    }
  }

  async onFileChangePdf(event: any) {
    if (event.target.files.length > 0) {
      this.vehicleImg = event.target.files[0];
      console.log(this.vehicleImg);
      
    }
  }

  onSubmit(form: FormGroup) {

    console.log(form.value)
    
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('upload_preset', this.preset);

    console.log(formData);

    this.http.post(this.cloudinaryUrl, formData).subscribe((pdfResult: any) => {
      console.log(pdfResult.url);
      this.vehiDetails.document = pdfResult.url;

      //new request
      console.log(formData);

      formData.append('file', this.vehicleImg);
      formData.append('upload_preset', this.preset);
      this.http
        .post(this.cloudinaryUrl, formData)
        .subscribe((vehicleResult: any) => {
          console.log(vehicleResult.url);

          this.vehiDetails.vehicle_image = vehicleResult.url;
          //new request
          formData.append('file', this.driverImg);
          formData.append('upload_preset', this.preset);

          this.http
            .post(this.cloudinaryUrl, formData)
            .subscribe((driverResults: any) => {
              console.log(driverResults.url);
              this.vehiDetails.driver_image = driverResults.url;

            
            });
        });
    });
 

   
    
    this.vehiclesDetails = {
      brand:form.value.brand,
      color:form.value.color, 
      document: '',
      driver_cellphone:form.value.driver_cellphone,
      driver_image:'',
      driver_name: form.value.driver_name,
      model: form.value.model,
      owner_id: 3, 
      vehicle_image: '',
      vehicle_reg:form.value.vehicle_reg
    }

    console.log(this.vehiclesDetails);

    this.service.addvehicle(this.vehiclesDetails).subscribe((next: any) => {
      console.log('Vehicle has been added successfully!');
      this.router.navigate(['/addvehicle/vehiclelist']);
      this.submitted = false;
    });
  }

  vehiDetails = {
    owner_id: 0,
    vehicle_reg: '',
    model: '',
    brand: '',
    driver_name: '',
    driver_cellphone: '',
    driver_image: '',
    document: '',
    color: '',
    vehicle_image: '',
  };

  image = {
    link: '',
  };
}
