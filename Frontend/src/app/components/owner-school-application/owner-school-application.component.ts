import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import { HttpErrorResponse } from '@angular/common/http'; 
import{ School } from 'src/app/interfaces/school'; 
import { ParentService } from 'src/app/services/schools/parent.service';
import { Vehicle } from 'src/app/interfaces/vehicle'; 
import{Transporter} from 'src/app/interfaces/transporter';
@Component({
  selector: 'app-owner-school-application',
  templateUrl: './owner-school-application.component.html',
  styleUrls: ['./owner-school-application.component.scss']
})
export class OwnerSchoolApplicationComponent implements OnInit {
  data:any 
  selected_school: number = 0; 
  school!: School
  transporters : Transporter[] = []; 
  vehicles : Vehicle[] = [];

  constructor(private service:ParentService,private location:Location) { }

  ngOnInit(): void {
    this.service.viewSchool(Number(sessionStorage.getItem('selected_school'))).subscribe((school:School)=>{ 
      this.school = school;
      
      this.service.viewSchoolTransporters(Number(sessionStorage.getItem('selected_school'))).subscribe((transporters:Transporter[])=>{
        this.transporters = transporters;

     
      
    })  },(error:HttpErrorResponse)=>{ //failed to view school 
      console.log(error) }); 
    }
    back() { 
      this.location.back()
      
  sessionStorage.removeItem('selected_school') } 
}











 


 







