import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../interfaces/owner';
import { School } from '../interfaces/school';
import { Vehicle } from '../interfaces/vehicle';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:8080/admin';

  viewSchools():Observable<School[]> {
    return this.http.get<School[]>(this.baseUrl + '/viewSchools').pipe();
  }

  addSchool(data: any) {
    return this.http.post(this.baseUrl + '/addSchool', data);
  }

  removeSchool(school_id: number) {
    return this.http.patch(this.baseUrl + '/addSchool/' + school_id, null);
  }

  suspend(owner_id: number) {
    return this.http.patch(this.baseUrl + '/owners/suspend/' + owner_id, null);
  }

  viewAllOwners():Observable<Owner[]> {
    return this.http.get<Owner[]>(this.baseUrl + '/owners').pipe();
  }

  viewOwner(owner_id: number): Observable<Owner> {
    return this.http.get<Owner>(this.baseUrl + '/owners/' + owner_id);
  }
  viewOwnerVehicles(owner_id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl + '/owners/vehicles/' + owner_id);
  }
  viewVehicle(vehicle_id: number):Observable<Vehicle>{
    return this.http.get<Vehicle>(this.baseUrl + '/owners/vehicles/' + vehicle_id);
  }
}
