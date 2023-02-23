import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  requestsView :any[] = [];

  request = {
    owner : '',
    driver :'',
    driver_image : '',
    rating : 0.0,
    owner_id: 0
  }

  rateForm = new FormGroup({
    rating: new FormControl('')
  })

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
  select(request:any){
    this.request.owner_id = request.owner.user_id;
    this.request.driver = request.vehicle.driver_name;;
    this.request.driver_image = request.vehicle.driver_image;
    this.request.rating = request.owner.ratings;
    this.request.owner = request.owner.name +' '+request.owner.surname;


  }

  rate(form:FormGroup){
    this.parent.rate(form.value,this.request.owner_id).subscribe((res:any)=>{
      this.toast.success(res.message);
      form.reset();
    },(error:HttpErrorResponse)=>{
      console.log(error)
      form.reset();
      this.toast.error(error.error.message);
    })
  }

}
