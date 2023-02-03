import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AdminViewApplicationsComponent } from './components/admin-view-applications/admin-view-applications.component';
import { AdminViewOneApplicationComponent } from './components/admin-view-one-application/admin-view-one-application.component';
import { OwnerPageComponent } from './components/owner-page/owner-page.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGuard } from './guards/user.guard';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [AppComponent, SchoolsComponent, VehiclesComponent, OwnerPageComponent, LandingComponent, LoginComponent, RegisterComponent, NavComponent],
  imports: [BrowserModule, AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  providers: [UserGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
