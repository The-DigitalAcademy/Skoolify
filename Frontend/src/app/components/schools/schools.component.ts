import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/schools/parent.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
 data:any

constructor(private service:ParentService) { }

  ngOnInit(): void {
    this.service.getSchool().subscribe((view)=>{
    this.data=view
    
  })
  }

}
