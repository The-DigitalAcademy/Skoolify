import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/schools/parent.service';
import { Router } from '@angular/router';
import { School } from 'src/app/interfaces/school';
@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
 data:any
 searchSchool :any
 schools: School[] = [];

constructor(private service:ParentService,private router:Router) { }

  ngOnInit(): void {
    this.service.getSchool().subscribe((view)=>{
    this.data=view

  })
  }

  viewSchool(school_id:any)
  {
    sessionStorage.setItem('selected_school',school_id);
    this.router.navigateByUrl('admin/view-school')

  }
}
