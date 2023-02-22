import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transporter } from 'src/app/interfaces/transporter';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { School } from 'src/app/interfaces/school';
import { OwnerApplication } from 'src/app/interfaces/applications';

const ownerID= localStorage.getItem('owner_id')
@Injectable({
  providedIn: 'root'
})
export class ParentService {

  baseUrl='http://localhost:8080/parent'

  constructor(private http:HttpClient) { }

  getSchool():Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}/getSchool`)
  }

  getAllRequests(parent_id:any)
  {
    return this.http.get(this.baseUrl+"/requests/"+parent_id);
  }

  getRequest(parent_id:any,request_id:any):Observable<any>
  {
    return this.http.get<any>(this.baseUrl+"/requests/"+parent_id+"/"+request_id);
  }

  getDrivers(user_id :number):Observable<Vehicle[]>{
    console.log(user_id)
    return this.http.get<Vehicle[]>(this.baseUrl+"/getVehicle/"+user_id);
  }

  viewSchoolTransporters(school_id: number): Observable<Transporter[]> {
    return this.http.get<Transporter[]>(
      this.baseUrl + '/getSchoolVehicle/' + school_id
    );
  }

  getVehicleUser(user_id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      this.baseUrl + '/getVehicleUser/' + user_id
    );
  }

  viewSchool(school_id :number):Observable<School>{
    return this.http.get<School>(this.baseUrl+"/getOneSchool/"+school_id);
  }

  viewOwnerVehicles(owner_id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      this.baseUrl + '/vehicles/' + owner_id
    );
  }


  viewVehicle(vehicle_id: number): Observable<Vehicle[]> {

    console.log("from service"+vehicle_id)
    return this.http.get<Vehicle[]>(
      this.baseUrl + '/getVehicle/' + vehicle_id
    );
  }

  viewApplication(vehicle_id: number): Observable<OwnerApplication> {
    console.log("appli id"+vehicle_id)
    return this.http.get<OwnerApplication>(
      this.baseUrl + '/getAppPrice/' + vehicle_id
    );
  }

  addRequests(data: any) {
    return this.http.post(this.baseUrl + '/addRequests', data);
  }

  priceOfTransport(data: any) {
    return this.http.post(this.baseUrl + '/priceOfTransport', data);
  }

  rate(data: any,owner_id: number) {
    return this.http.patch(this.baseUrl + '/rate/'+ owner_id, data);
  }

}





