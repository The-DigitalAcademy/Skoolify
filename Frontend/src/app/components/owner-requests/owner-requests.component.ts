import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RequestInterface } from 'src/app/interfaces/request';
import { JwtService } from 'src/app/services/jwt.service';
import { OwnerService } from 'src/app/services/owner/owner.service';

@Component({
  selector: 'app-owner-requests',
  templateUrl: './owner-requests.component.html',
  styleUrls: ['./owner-requests.component.scss']
})
export class OwnerRequestsComponent implements OnInit {
   requests : RequestInterface[] = []
   user_id :any;
   selected : number = 0
   index : number = 0
   load : boolean = false
   message : string = 'Decline'

   request : any = {
    request_id: 0,
    parent_name : '',
    school_name : '',
    school_location:'',
    pickUp_address:'',
    num_kids: 0,
    desc:''
   }

   requestsView : any[] = []

   feedbackForm = new FormGroup({
    feedback : new FormControl()
   })

  constructor(private router: Router, private owner : OwnerService,private jwt : JwtService, private toast : HotToastService) { }

  ngOnInit(): void {
    this.user_id = this.jwt.getData(sessionStorage.getItem('key'))?.user_id;

    this.viewRequests();
  }


  viewRequests(){
    this.owner.viewRequests(this.user_id).pipe(this.toast.observe({
      loading: 'Fetching your requests...',
      success:(s:any) => 'Done!',
      error: (e) =>  e.error.message,
   }),catchError((error) => of(error))).subscribe((requests: RequestInterface[])=>{
      console.log(requests);
      requests.forEach(request => {
        this.owner.viewOneRequest(request.request_id,request.owner_id).subscribe(async(requestView:any)=>{
          console.log(requestView)
          this.requestsView.push(await requestView);
        },(error:HttpErrorResponse)=>{
          console.log(error)
        })
      });
    })

  }

  accept(request_id: number){
    this.owner.accept(request_id).pipe(
      this.toast.observe({
        loading: 'Processing...',
        success:(s:any) => s.message,
        error: (e) =>  e.error.message,
     }),catchError((error) => of(error))
    ).subscribe(async(result:any)=>{
      this.toast.success(await result.message);
      this.requestsView = []
      this.viewRequests()
      // this.requestsView = this.requestsView.splice(this.index,1)
    },(error:HttpErrorResponse)=>{
      this.toast.error(error.error.message);
      console.log(error)
    })
  }

  decline(form:FormGroup){
    //this.load = true;
    this.message = 'Declining...'
    this.owner.decline(this.selected,form.value).pipe(this.toast.observe({
      loading: 'Processing...',
      success:(s:any) => s.message,
      error: (e) =>  e.error.message,
   }),catchError((error) => of(error))).subscribe(async(result:any)=>{
      this.load = false;
      this.message = 'Decline'
      this.requestsView = []
      this.viewRequests()
      //this.requestsView = this.requestsView.splice(this.index,1)
    },(error:HttpErrorResponse)=>{
      this.load = false;
      console.log(error)
      this.message = 'Decline'
    })
  }

  setReject(id:number,index :number){
    this.selected = id;
    this.index = index;
  }
  setIndex(i:number){this.index = i;}

}
