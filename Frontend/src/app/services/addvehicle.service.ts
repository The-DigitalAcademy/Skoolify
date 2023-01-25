import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




const ownerID= localStorage.getItem('owner_id')


@Injectable({
  providedIn: 'root'
})
export class AddvehicleService  {

  addvehicle(myFormData: FormData) {
    throw new Error('Method not implemented.');
  }
  baseUrl : String = 'http://localhost:8080/vehicle';

  constructor(private http:HttpClient) { }

  createVehicle(data: any) {
    return this.http.post(this.baseUrl+'/addVehicle/'+sessionStorage.getItem('vehicle_id'),data);
  }  
   
  getVehicles(): Observable<any> {
    return this.http.get(this.baseUrl+'/getVehicles');
  }

  viewvehicle(owner_id:number){

    return this.http.get("http://localhost:8080/vehicle/viewvehicle/"+owner_id)
     //return this.http.get(`${this.baseUrl}/viewvehicle/${ownerID}`)
  }











  deleteVehicle(id:any,data:any)
  {
    return this.http.patch(this.baseUrl+'/deleteVehicle/'+id,data);

  }
  updateVehicle(vehicleId:any ,form:any)
  {
    return this.http.patch(this.baseUrl+'/updateVehicle/'+vehicleId,form);

  }
  







    }

