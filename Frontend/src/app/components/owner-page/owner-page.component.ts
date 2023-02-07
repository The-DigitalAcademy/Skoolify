import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/schools/parent.service';

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.scss']
})
export class OwnerPageComponent implements OnInit {
[x: string]: any;
  data:any
  driver:any
  searchSchool :any

 constructor(private service:ParentService) { }

  // ngOnInit(): void {
  //   this.service.getDrivers().subscribe((view)=>{
  //   this.data=view

  // })
  // }
  ngOnInit(): void {
  //   this.service.getDrivers().subscribe((view)=>{
  //   this.driver=view
  //   console.log("selected id", view)
  // })
  this.service.getSchool().subscribe((view)=>{
    this.data=view
    //console.log("selected id", view)
  })

  }
}
