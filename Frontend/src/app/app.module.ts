import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';
import { AddvehicleService } from './services/addvehicle.service';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { RemoveVehicleComponent } from './components/remove-vehicle/remove-vehicle.component';
const routes: Routes = [
  { path: '**', redirectTo: '/all' }
];


@NgModule({
  


  declarations: [
  
    AppComponent,
    SchoolsComponent,
    VehiclesComponent,
    AddvehicleComponent,
    EditVehicleComponent,
    RemoveVehicleComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  

  ],




  providers: [AddvehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
