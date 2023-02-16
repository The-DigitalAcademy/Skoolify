import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ParentService } from 'src/app/services/schools/parent.service';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Transporter } from 'src/app/interfaces/transporter';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { School } from 'src/app/interfaces/school';
import { OwnerService } from 'src/app/services/owner.service';
import { Router } from '@angular/router';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service';
import { stringify } from '@angular/compiler/src/util';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-owner-school-application',
  templateUrl: './owner-school-application.component.html',
  styleUrls: ['./owner-school-application.component.scss'],
})
export class OwnerSchoolApplicationComponent implements OnInit {
  message: string = 'Save';
  schoolName: any;
  schoolLocation: any;
  selected_school: number = 0;
  transporters: Transporter[] = [];
  school!: School;
  transporter!: Transporter;
  load: boolean = false;
  vehicle: Vehicle[] = [];

  schoolID: any = sessionStorage.getItem('selected_school');
  ownerID: any = 0;
  vehicleID: any = sessionStorage.getItem('selected_vehicle');

  priceInputForm = new FormGroup({
    price: new FormControl(),
    vehicle_id: new FormControl(),
  });

  constructor(
    private service: ParentService,
    private location: Location,
    public fb: FormBuilder,
    private router: Router,
    private jwt: JwtService,
    private services: OwnerService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.ownerID = this.jwt.getData(sessionStorage.getItem('key'))?.user_id;
    this.service
      .viewSchool(Number(sessionStorage.getItem('selected_school')))
      .subscribe((school: School) => {
        this.school = school;

        this.service
          .viewSchoolTransporters(
            Number(sessionStorage.getItem('selected_school'))
          )
          .subscribe((transporters: Transporter[]) => {
            this.transporters = transporters;

            this.service.getVehicleUser(this.ownerID).subscribe(
              (vehicles: Vehicle[]) => {
                this.vehicleID = school.school_id;
                this.vehicle = vehicles;




  //   },(error:HttpErrorResponse)=>{

  //     //owner fetching error
  //     console.log(error);
  //   })
  // }









this.schoolName=this.school.school_name;
this.schoolLocation=this.school.school_location;




      console.log("hello");
      console.log(school);

      console.log(vehicles,"gggjgjh");
    },(error:HttpErrorResponse)=>{
      //failed to view vehicle
      console.log(error)
    });

  })
    }


);
  }




  back() {
    this.location.back();
    sessionStorage.removeItem('selected_school');
  }

  onSubmit(form: FormGroup) {
    this.message = 'Saving...';
    this.load = true;
    const applicationData = {
      price: form.value.price,
      school_id: this.schoolID,
      owner_id: this.ownerID,
      vehicle_id: form.value.vehicle_id,
    };
    this.services.price(applicationData).subscribe(
      (result: any) => {
        this.toast.success('Application sent');
        this.router.navigateByUrl('/owner-home');
        form.reset();
      },
      (error: HttpErrorResponse) => {
        this.toast.error(error.error.message);
        console.log(error);
      }
    );
  }

  getVehicleUser(owner_id: any) {
    console.log(owner_id);
    sessionStorage.setItem('selected_school', owner_id);
    this.router.navigateByUrl('schoolsApplication');
  }

  selectOwner(user_id: any) {
    sessionStorage.setItem('selected_owner', user_id);
    console.log('hello');
  }
}
