import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/schools/parent.service';
@Component({
  selector: 'app-owner-school-application',
  templateUrl: './owner-school-application.component.html',
  styleUrls: ['./owner-school-application.component.scss']
})
export class OwnerSchoolApplicationComponent implements OnInit {
info:any;
  constructor(private serivce:ParentService) { }

  ngOnInit(): void {

this.serivce.getSchool().subscribe((view) =>{
this.info=view;
  
})
}}



