import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AddvehicleService  {
  baseUrl : String = 'http://localhost:8080/api';

  constructor(private http:HttpClient) { }

  createVehicle(data: any) {
    return this.http.post(this.baseUrl+'/addVehicle/'+sessionStorage.getItem('vehicle_id'),data);
  }  
   
  getVehicles(): Observable<any> {
    return this.http.get(this.baseUrl+'/getVehicles');
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

