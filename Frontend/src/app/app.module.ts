import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavDriverComponent } from './nav-driver/nav-driver.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';



import { RegisterComponent } from './components/register/register.component';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    VehiclesComponent,
  
    RegisterComponent,
 
       LandingComponent,
         LoginComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
