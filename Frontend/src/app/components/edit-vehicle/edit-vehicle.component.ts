import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Route } from '@angular/router';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent implements OnInit {
  image_link: string = '';
  onFileChangePdf: any;
  onFileChange: any;
  driverImg: any;
  message: string = 'Save';
  load: boolean = false;

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
  editDriver: any;

  onSubmit(arg0: FormGroup) {
    console.log(this.vehiDetails);
  }
  FormBuilder: any;
  file: any;
  public!: any[];
  imageUrl!: any;

  addVehicleForm: FormGroup = new FormGroup({
    model: new FormControl(''),
    brand: new FormControl(''),
    vehicle_reg: new FormControl(''),
    color: new FormControl(''),
    vehicle_img: new FormControl(''),
    driver_name: new FormControl(''),
    driver_image: new FormControl(''),
    documents: new FormControl(''),
    driver_cellphone: new FormControl(''),
  });

  submitted = false;
  productsService: any;
  router: any;
  addvehicleservice: any;
  vehicleDetails: any;

  preset: string = 'ylxn7mgj';
  cloudinaryUrl: string =
    'https://api.cloudinary.com/v1_1/dkvrb3pye/image/upload';

  constructor(
    private service: AddvehicleService,
    private http: HttpClient,
    private location: Location,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.service
      .getvehicle(Number(sessionStorage.getItem('selected_vehicle')))
      .subscribe((get: any) => {
        this.vehiDetails = get;
        console.log(this.vehiDetails);

        // this.addvehicleservice.updateVehicle(this.vehicleDetails.subscribe((next:any) => {

        //   this.router.navigate(['/vehiclelist']);
        //   this.submitted = false;
        // }))
      });
  }

  async onDriverImg(event: any) {
    if (event.target.files.length > 0) {
      this.driverImg = await event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.driverImg);
      formData.append('upload_preset', this.preset);

      this.http.post(this.cloudinaryUrl, formData).subscribe(
        (res: any) => {
          this.vehiDetails.driver_image = res.url;
          console.log(res.url);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  onSubmitvehiDetails(form: FormGroup) {
    this.message = 'Saving ...';
    this.load = true;

    this.vehiDetails.driver_name = form.value.driver_name
    this.vehiDetails.driver_cellphone = form.value.driver_cellphone

    this.service
      .editDriver(
        Number(sessionStorage.getItem('selected_vehicle')),
        this.vehiDetails
      )
      .pipe(
        this.toast.observe({
          loading:'Saving...',
          success:(s:any)=> s.message,
          error:(e)=> e.error.message,
        }),catchError((error) => of(error))
      ).subscribe(
        (res: any) => {
          this.message = 'Save';
            this.load = false;
            this.location.back();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.message = 'Save';
            this.load = false;
        }
      );
  }

  back() {
    sessionStorage.removeItem('selecetd_vehicle');
    this.location.back();
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.addVehicleForm.controls;
  }
}
