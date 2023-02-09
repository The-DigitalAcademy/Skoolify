import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Route } from '@angular/router';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {
  image_link: string = '';
  onFileChangePdf: any;
  onFileChange: any;
  driverImg:any;


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




onSubmit(arg0: FormGroup) {
  console.log(this.vehiDetails)
}
  FormBuilder: any;
  file: any;
  public !:any[];
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

  preset: string = 'ylxn7mgj';
  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dkvrb3pye/image/upload';


  constructor(private service: AddvehicleService,private http: HttpClient) { 
  }
  ngOnInit(): void {

    let vehicleDetails= {
      model: this.addVehicleForm.value.model,
      brand: this.addVehicleForm.value.brand,
      vehicle_reg: this.addVehicleForm.value.vehicle_reg,
      color: this.addVehicleForm.value.color,
      vehicle_img: this.addVehicleForm.value.vehicle_img,
      driver_name: this.addVehicleForm.value.driver_name,
      driver_img: this.addVehicleForm.value.driver_img,
      documents:this.addVehicleForm.value.documents,
      driver_cellphone: this.addVehicleForm.value.driver_cellphone
    }
    console.log(vehicleDetails);

    this.addvehicleservice.updateVehicle(this.vehicleDetails.subscribe((next:any) => {
      
      this.router.navigate(['/vehiclelist']);
      this.submitted = false;
    }))

  
}


onDriverImg(event:any){

  const formData = new FormData();
  formData.append('file', this.driverImg);
  formData.append('upload_preset', this.preset);
  this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{
    this.vehiDetails.document = res.url;
    console.log(res.url);

  },(error:HttpErrorResponse)=>{
    console.log(error);
    })

  }






  get formValidation(): { [key: string]: AbstractControl } {
    return this.addVehicleForm.controls;
  }

}




  
