import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    VehiclesComponent,
    AddvehicleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
