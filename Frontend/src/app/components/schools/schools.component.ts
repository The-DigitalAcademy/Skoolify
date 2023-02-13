import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/schools/parent.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
 data:any
 searchSchool :any

constructor(private service:ParentService) { }

  ngOnInit(): void {
    this.service.getSchool().subscribe((view)=>{
    this.data=view;

  })
  }
  viewSchool(school_id:any)
  {
    sessionStorage.setItem('selected_school',school_id);


  
}
}
