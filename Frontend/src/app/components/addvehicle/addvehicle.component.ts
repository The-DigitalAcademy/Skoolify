import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import {FormBuilder,FormControl, FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { response } from 'express';
import { HotToastService } from '@ngneat/hot-toast';

import { JwtService } from 'src/app/services/jwt.service';
import { OwnerService } from 'src/app/services/owner/owner.service';
@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss'],
})
export class AddvehicleComponent implements OnInit {

  tsBrand = new RegExp("^[ a-zA-Z ]{2,}$");
  tsModel = new RegExp("^[ A-Za-z0-9]{2,}$");
  tsReg = new RegExp("^[ A-Za-z0-9 ]{2,}$");
  tsColor = new RegExp("^[ a-zA-Z ]{2,}$");
  step : number = 1;

  user_id :any
  image_link: string = '';
  FormBuilder: any;
  //Uploads
  file: any;
  vehicleImg: any;
  driverImg: any;

  company!: any;
  public vehicles!: any[];
  imgUrl!: any;
  data: any= 0;
  vehiclesDetails!:any;

  initial_seats: number = 0;


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
    avail_seats: 0
  };

  image = {
    link: '',
  };

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
    avail_seats : new FormControl(''),
  });
  name:any
  clientsNumber: any[] = [];
  clientsView : any[] = [];

  constructor(private reqService : OwnerService,private service: AddvehicleService,private router: Router,private http: HttpClient, private jwt : JwtService, private toast : HotToastService) {}

  ngOnInit(): void {

    this.user_id = this.jwt.getData(sessionStorage.getItem('key'))?.user_id;
    this.name = this.jwt.getData(sessionStorage.getItem('key'))?.name;
    this.viewVehicles()


  }

  increase(){
    this.initial_seats++;
  }

  decrease(){
    if(this.initial_seats > 0){
      this.initial_seats--;
    }else{
      this.initial_seats = 0;
    }
  }


  viewVehicles()
  {
    this.clientsNumber = []
    this.service.viewvehicle(this.user_id).subscribe((view:any) => {
      console.log(view);

      this.data = view;
      view.forEach((vehicle:any) => {
        this.service.getVehicleClients(vehicle.vehicle_id).subscribe((clients:any)=>{
          this.clientsNumber.push(clients.length);
          console.log('Heyy',clients.length);
        })
      });
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

  clients(vehicle_id:any){
    this.clientsView = []
    this.service.getVehicleClients(vehicle_id).subscribe((clients:any)=>{
      clients.forEach((request:any) => {
        this.reqService.viewOneRequest(request.request_id,this.user_id).subscribe((full_req:any)=>{
          this.clientsView.push(full_req);
        })
      });


      console.log(this.clientsView)
    })
  }

  editDriver(rec: any) {
    console.log('vehicles', rec);


    sessionStorage.setItem('selected_vehicle',rec)
    this.router.navigateByUrl('editvehicle')




  }


removeVehicle(vehicle : number){
  //console.log('vehicles',vehicle);
  this.service.RemoveVehicle(vehicle).subscribe((result:any)=>{
    //console.log("removed");
    this.toast.success('Vehicle removed')
    this.viewVehicles();


  },(error:HttpErrorResponse)=>{
    console.log(error);

    this.toast.error(error.error.message)

  })
}





  async onVehicleImg(event: any) {
    if (event.target.files.length > 0) {
      // FormData.append('file', this.vehicleImg);
    this.vehicleImg = await event.target.files[0];

    const formData = new FormData();
    formData.append('file', this.vehicleImg);
    formData.append('upload_preset', this.preset);

    this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{
      this.vehiDetails.vehicle_image = res.url;
      console.log(res.url);
    },(error:HttpErrorResponse)=>{
      console.log(error);

    })
    }
  }
  async onDriverImg(event: any) {
    if (event.target.files.length > 0) {
      // FormData.append('file', this.vehicleImg);
    this.driverImg = await event.target.files[0];

    const formData = new FormData();
    formData.append('file', this.driverImg);
    formData.append('upload_preset', this.preset);

    this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{
      this.vehiDetails.driver_image = res.url;
      console.log(res.url);
    },(error:HttpErrorResponse)=>{
      console.log(error);

    })
    }
  }

  async onFileChangePdf(event: any) {
    if (event.target.files.length > 0) {
      // FormData.append('file', this.vehicleImg);
    this.file = await event.target.files[0];

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('upload_preset', this.preset);

    this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{
      this.vehiDetails.document = res.url;
      console.log(res.url);
    },(error:HttpErrorResponse)=>{
      console.log(error);

    })
    }
  }

  nextStep(form:FormGroup)
  {
    if(this.step == 1 && this.tsBrand.test(form.value.brand)&& this.tsModel.test(form.value.model)&& this.tsReg.test(form.value.vehicle_reg)&& this.tsColor.test(form.value.color)){
      this.step = 2;
    }else
    {
      this.step = 1;

    }
  }

  onSubmit(form: FormGroup) {

    this.toast.loading('Adding vehicle ...',{duration:1000});

    console.log(form.value)

    this.vehiDetails.owner_id = this.user_id
    this.vehiDetails.brand = form.value.brand;
    this.vehiDetails.model = form.value.model;
    this.vehiDetails.color = form.value.color;
    this.vehiDetails.avail_seats = this.initial_seats;
    this.vehiDetails.vehicle_reg = form.value.vehicle_reg;
    this.vehiDetails.driver_name = form.value.driver_name;
    this.vehiDetails.driver_cellphone = form.value.driver_cellphone;
    console.log(this.vehiDetails);

    this.service.addvehicle(this.vehiDetails).subscribe((next: any) => {
      //console.log('Vehicle has been added successfully!');
      this.toast.success(next.message)
      form.reset()
      this.viewVehicles();
      this.submitted = false;
    },(error: HttpErrorResponse)=>{
      console.log(error)
      this.toast.error(error.error.message)

    });
  }


}
