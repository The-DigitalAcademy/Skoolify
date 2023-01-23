import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';
import { AddvehicleService } from './services/addvehicle.service';

const routes: Routes = [
  // { path: ':status', component: AddvehicleComponent },
  { path: '**', redirectTo: '/all' }
];


@NgModule({
  declarations: [
  
    AppComponent,
    SchoolsComponent,
    VehiclesComponent,
    AddvehicleComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  ],




  providers: [AddvehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
