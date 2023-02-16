import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { JwtService } from 'src/app/services/jwt.service';
import { ParentService } from 'src/app/services/schools/parent.service';

@Component({
  selector: 'app-parents-request',
  templateUrl: './parents-request.component.html',
  styleUrls: ['./parents-request.component.scss']
})
export class ParentsRequestComponent implements OnInit {
  parent_id : any = 0;
  requestsView :any[] =[]

  constructor(private jwt : JwtService, private toast : HotToastService, private parent : ParentService) { }

  ngOnInit(): void {
    this.parent_id = this.jwt.getData(sessionStorage.getItem('key'))?.user_id;
    console.log('Parent '+this.parent_id)
    this.getRequests()
  }

  getRequests(){
    this.toast.loading('Loading requests ...',{duration:3000})
    this.requestsView = []
    this.parent.getAllRequests(this.parent_id).subscribe((requests:any)=>{

      requests.forEach((request:any) => {
        this.parent.getRequest(this.parent_id,request.request_id).subscribe((fullRequest:any)=>{
          this.requestsView.push(fullRequest);
        })

      });

      console.log(this.requestsView)

    },(error:HttpErrorResponse)=>{
      console.log(error)
      this.toast.error(error.error.message)
    })
  }

}
