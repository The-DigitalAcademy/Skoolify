import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AdminViewApplicationsComponent } from './components/admin-view-applications/admin-view-applications.component';
import { AdminViewOneApplicationComponent } from './components/admin-view-one-application/admin-view-one-application.component';

@NgModule({
  declarations: [AppComponent, SchoolsComponent, VehiclesComponent, AdminViewApplicationsComponent, AdminViewOneApplicationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
