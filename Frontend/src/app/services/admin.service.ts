import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from 'express';
import { Observable } from 'rxjs';
import { OwnerApplication } from '../interfaces/applications';
import { Owner } from '../interfaces/owner';
import { School } from '../interfaces/school';
import { Transporter } from '../interfaces/transporter';
import { Vehicle } from '../interfaces/vehicle';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:8080/admin';

  //Schools
  viewSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.baseUrl + '/viewSchools').pipe();
  }
  viewSchool(school_id:number): Observable<School> {
    return this.http.get<School>(this.baseUrl + '/viewSchools/'+school_id);
  }

  addSchool(data: any) {
    return this.http.post(this.baseUrl + '/addSchool', data);
  }

  removeSchool(school_id: number) {
    return this.http.patch(this.baseUrl + '/removeSchool/' + school_id, null);
  }

  viewSchoolTransporters(school_id:number): Observable<Transporter[]> {
    return this.http.get<Transporter[]>(this.baseUrl + '/schooltransporters/'+school_id);
  }



  //owners
  suspend(owner_id: number) {
    return this.http.patch(this.baseUrl + '/owners/suspend/' + owner_id, null);
  }

  viewAllOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.baseUrl + '/owners').pipe();
  }

  viewOwner(owner_id: number): Observable<Owner> {
    return this.http.get<Owner>(this.baseUrl + '/owners/' + owner_id);
  }

  //vehicles
  viewOwnerVehicles(owner_id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      this.baseUrl + '/owners/vehicles/' + owner_id
    );
  }

  viewVehicle(vehicle_id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(
      this.baseUrl + '/owners/vehicles/' + vehicle_id
    );
  }

  //applications
  viewAllApplications(): Observable<OwnerApplication[]> {
    return this.http.get<OwnerApplication[]>(this.baseUrl + '/applications');
  }

  viewApplication(application_id: number): Observable<OwnerApplication> {
    return this.http.get<OwnerApplication>(this.baseUrl + '/applications/' + application_id);
  }

  approveApplication(data: OwnerApplication)
  {
    this.http.post(this.baseUrl + '/applications/'+data.owner_id+'/'+data.school_id+'/'+data.vehicle_id,null);
  }

  declineApplication(application_id: number)
  {
    //decline
  }

}
