import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { AddvehicleService } from 'src/app/services/addvehicle.service';

@Component({
  selector: 'app-remove-vehicle',
  templateUrl: './remove-vehicle.component.html',
  styleUrls: ['./remove-vehicle.component.scss']
})
export class RemoveVehicleComponent implements OnInit {
  selected_vehicles: number = 0;
  load: boolean = false;
  message: string= 'Remove Vehicle'
  vehicle!: Vehicle
  AddvehicleService: any;
delete: any;

  constructor(private service: AddvehicleService) { }

  ngOnInit(): void {
    this.AddvehicleService.viewvehicle(Number(sessionStorage.getItem('selected_vehicle'))).subscribe((vehicle:Vehicle)=>{
      this.vehicle = vehicle;

    })
 
{
  sessionStorage.removeItem('selected_vehicle')
}
 removevehicle('selected_vehicle')
 {
  this.message ='Removing'
    this.load = true;
    this.AddvehicleService.removevehicle(Number(sessionStorage.getItem('selected_vehicle'))).subscribe((result:any)=>{
      setTimeout(() => {
        this.load= false
        this.message ='Removed'
      }
        

      )}
      )}
      
      }}

function removevehicle(arg0: string) {
  sessionStorage.removeItem('selected_vehicle')

}

