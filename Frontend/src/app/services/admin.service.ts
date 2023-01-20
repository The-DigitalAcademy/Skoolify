import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../interfaces/owner';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:8080/admin';

  viewSchools() {
    return this.http.get(this.baseUrl + '/viewSchools');
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

  viewOwner(owner_id: number) {
    return this.http.get(this.baseUrl + '/owners/' + owner_id);
  }
  viewOwnerVehicles(owner_id: number) {
    return this.http.get(this.baseUrl + '/owners/vehicles/' + owner_id);
  }
  viewVehicle(vehicle_id: number) {
    return this.http.get(this.baseUrl + '/owners/vehicles/' + vehicle_id);
  }
}
