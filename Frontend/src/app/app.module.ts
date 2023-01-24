import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavDriverComponent } from './nav-driver/nav-driver.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    VehiclesComponent,
    NavigationComponent,
    NavDriverComponent,
    NavAdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
