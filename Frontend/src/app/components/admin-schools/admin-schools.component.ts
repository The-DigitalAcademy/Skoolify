import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { School } from 'src/app/interfaces/school';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-schools',
  templateUrl: './admin-schools.component.html',
  styleUrls: ['./admin-schools.component.scss'],
})
export class AdminSchoolsComponent implements OnInit {
  schools: School[] = [];
  term: string =''
  load : boolean = false;
  message: string = 'Save'

  addSchoolForm = new FormGroup({
    school_name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    school_location: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
  })

  constructor(private adminService: AdminService,private router:Router, private location :Location) {}

  ngOnInit(): void {
    this.getSchools();

  }

  getSchools(){
    this.adminService.viewSchools().subscribe(
      (schools: School[]) => {
        this.schools = schools;
      },
      (error: HttpErrorResponse) => {
        //failed to view schools
        console.log(error);
      }
    );
  }

  onSubmit(data: FormGroup)
  {
    this.message = "Saving...";
    this.load = true;
    this.adminService.addSchool(data.value).subscribe((result:any) => {
      this.getSchools()
      console.log('added school')
      data.reset()
      setTimeout(() => {
        this.message = "Saved";
        this.load = false;
      }, 2000);
    },(error:HttpErrorResponse)=>{
      //failed to save school
      console.log(error)

    })




  }
}
