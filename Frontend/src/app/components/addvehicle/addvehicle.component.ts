import { Component, OnInit } from '@angular/core';
import { AddvehicleService } from 'src/app/services/addvehicle.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";





@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss']
})
export class AddvehicleComponent implements OnInit {
      data: AddvehicleComponent[] = [];
  addvehicleservice: any;
  constructor(private api:AddvehicleService) { }

  ngOnInit(): void {
    this.addvehicleservice.getAddehicle()
    .subscribe((res: AddvehicleComponent[]) => {
      this.data = res;
    }, (err: any) => {
      console.log(err);
    });
}

  }


