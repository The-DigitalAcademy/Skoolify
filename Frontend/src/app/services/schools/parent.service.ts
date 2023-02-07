import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transporter } from 'src/app/interfaces/transporter';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { School } from 'src/app/interfaces/school';

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

  getDrivers(user_id :number):Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.baseUrl+"getVehicle/"+user_id)
  }
  // viewVehicle(vehicle_id: number): Observable<Vehicle> {
  //   return this.http.get<Vehicle>(
  //     this.baseUrl + '/getVehicle/' + vehicle_id
  //   );
  // }


}
