import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import { HttpErrorResponse } from '@angular/common/http'; 
import { ParentService } from 'src/app/services/schools/parent.service';
import { Vehicle } from 'src/app/interfaces/vehicle'; 
import{Transporter} from 'src/app/interfaces/transporter';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import{School} from 'src/app/interfaces/school';

import { Router } from '@angular/router';
@Component({
  selector: 'app-owner-school-application',
  templateUrl: './owner-school-application.component.html',
  styleUrls: ['./owner-school-application.component.scss']
})
export class OwnerSchoolApplicationComponent implements OnInit {
  [x: string]: any;

  selected_school: number = 0; 
  school!: School;
  transporter!: Transporter; 
  vehicles : Vehicle[] = [];
  @Input() data: any;

  constructor(private service:ParentService,private location:Location,public fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
  

    this.service.viewSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((school:School)=>{
      this.school = school;
      this.service.viewVehicle(Number(sessionStorage.getItem('selected_school'))).subscribe((vehicle:Vehicle)=>{
      this.vehicles.push(vehicle)    })

        console.log("vehicles")
      console.log("hello");
      console.log(school);
    },(error:HttpErrorResponse)=>{
      //failed to view school
      console.log(error)
    });

   
  }


  back()
  {
    //sessionStorage.removeItem('selected_application');
    this.location.back();
    
  }




selectOwner(user_id:any)
{
  sessionStorage.setItem('selected_owner', user_id);
console.log("hello")
}

    // )}}
}