import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";



@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss']
})
export class AddvehicleComponent implements OnInit {
  vehicles: any;
  owner_id: any;
  vehicle_reg: any;
  model: any;
  brand: any;
  driver_name: any;
  driver_cellphone: any;
  driver_image: any;
  document: any;
  color: any;
  vehicle_image: any;
  addvehicleservice: any;
  data: AddvehicleComponent[] | undefined;

constructor(private router:Router, private addvehicle:AddvehicleService) { }
 


//       data: AddvehicleComponent[] = [];
//   addvehicleservice: any;
//   constructor(private api:AddvehicleService) { }

  ngOnInit(): void {
    this.addvehicleservice.getAddehicle()
    .subscribe((res: AddvehicleComponent[]) => {
      this.data = res;
    }, (err: any) => {
      console.log(err);
    });
}

  }


