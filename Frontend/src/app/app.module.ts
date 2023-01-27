import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
<<<<<<< HEAD
import { NavigationComponent } from './navigation/navigation.component';
import { NavDriverComponent } from './nav-driver/nav-driver.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

=======
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';
>>>>>>> f7cdd86e74863d9906a401303846955644f85c05

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    VehiclesComponent,
<<<<<<< HEAD

    RegisterComponent,
 
       LandingComponent,
         LoginComponent,
  
=======
    AddvehicleComponent,
>>>>>>> f7cdd86e74863d9906a401303846955644f85c05

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
