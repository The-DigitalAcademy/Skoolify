import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Owner } from 'src/app/interfaces/owner';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { AdminService } from 'src/app/services/admin.service';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-admin-view-one-owner',
  templateUrl: './admin-view-one-owner.component.html',
  styleUrls: ['./admin-view-one-owner.component.scss']
})
export class AdminViewOneOwnerComponent implements OnInit {

  owner !: Owner;
  vehicles : Vehicle[] = [];
  pdfLink : string =''
  load: boolean = false;


  constructor(private adminService: AdminService, private location :Location,private http : HttpClient,) { }

  ngOnInit(): void {
    this.adminService.viewOwner(Number(sessionStorage.getItem('selected_owner'))).subscribe(async(owner:Owner)=>{
      this.owner = await owner;
      this.adminService.viewOwnerVehicles(Number(sessionStorage.getItem('selected_owner'))).subscribe((vehicles:Vehicle[])=>{
        this.vehicles = vehicles;
      },(error:HttpErrorResponse)=>{
        //vehicles fetching error
        console.log(error);
      })

    },(error:HttpErrorResponse)=>{

      //owner fetching error
      console.log(error);
    })
  }

  back()
  {
    this.location.back()
    sessionStorage.removeItem('selected_owner')
  }

  viewDoc(link:string)
  {
    this.http.get(link, { responseType: 'blob' }).subscribe(response => {
    saveAs(response, '.pdf');
  },(error:HttpErrorResponse)=>{
    //failed to retrieve pdf file
    console.log(error);

  });
  }

  suspendAccount()
  {
    this.load = true;
    this.adminService.suspend(Number(sessionStorage.getItem('selected_owner'))).subscribe((result:any)=>{
      setTimeout(() => {
        this.owner.is_suspended = true;
      }, 2000);

    },(error:HttpErrorResponse)=>{
      //failed to suspend account
      console.log(error);

    })
  }

  pdfView = '';

  setPdf(pdf: any)
  {
    this.pdfView = pdf
  }
}
