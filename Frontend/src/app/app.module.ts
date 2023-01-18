import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    VehiclesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
