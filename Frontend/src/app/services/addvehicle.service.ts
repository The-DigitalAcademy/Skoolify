import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../interfaces/vehicle';




const ownerID= localStorage.getItem('owner_id')


@Injectable({
  providedIn: 'root'
})
export class AddvehicleService  {

  baseUrl : String = 'http://localhost:8080/vehicle';

  constructor(private http:HttpClient) { }

  addvehicle(myFormData: any) {
    return this.http.post(this.baseUrl+'/addVehicle',myFormData)
  }

  getVehicleClients(vehicle_id:number)
  {
    return this.http.get('http://localhost:8080/owner/vehicle/clients/'+ vehicle_id)
  }

  getVehicles(): Observable<any> {
    return this.http.get(this.baseUrl+'/getVehicles');
  }

  viewvehicle(owner_id:number){

    return this.http.get("http://localhost:8080/vehicle/viewvehicle/"+owner_id)
  }



  RemoveVehicle(vehicle_id:number)
  {
    return this.http.patch(this.baseUrl + '/removevehicle/' + vehicle_id, null);

  }

  updateVehicle(vehicleId:any ,form:any)
  {
    return this.http.patch(this.baseUrl+'/updateVehicle/'+vehicleId,form);

  }

  getvehicle(id:number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.baseUrl+'/getvehicle/'+id);
  }

  editDriver(id:number,data :any){
    return this.http.patch(this.baseUrl+'/edit/'+id,data);
  }



}

