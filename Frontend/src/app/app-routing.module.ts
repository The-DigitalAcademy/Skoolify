import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { RemoveVehicleComponent } from './components/remove-vehicle/remove-vehicle.component';

const routes: Routes = [
  { path: '', component:LandingComponent},
  { path: 'addvehicle', component: AddvehicleComponent }, 
  { path: 'editvehicle', component: AddvehicleComponent }, 
  { path: 'removevehicle', component: AddvehicleComponent }, 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
