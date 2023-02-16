import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { OwnerPageComponent } from './components/owner-page/owner-page.component';
import { UserGuard } from './guards/user.guard';
import { OwnerSchoolApplicationComponent } from './components/owner-school-application/owner-school-application.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SchoolsComponent } from './components/schools/schools.component';

import { ParentsRequestComponent } from './parents-request/parents-request.component';

import{OwnerApplicationCompletionComponent} from './components/owner-application-completion/owner-application-completion.component'
import { RequestsOwnerComponent } from './components/requests-owner/requests-owner.component';

import{AddvehicleComponent} from '../app/components/addvehicle/addvehicle.component'
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';

import { AdminGuard } from './guards/admin/admin.guard';
import { ParentGuard } from './guards/parent/parent.guard';
import { OwnerGuard } from './guards/owner/owner.guard';


import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { OwnerRequestsComponent } from './components/owner-requests/owner-requests.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { RequestsComponent } from './components/requests/requests.component';


const routes: Routes = [
  { path:'', component: LandingComponent },
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent},

  {path:'owner-appplication',component:RequestsOwnerComponent,canActivate:[OwnerGuard]},
  { path:'schoolsApplication', component: OwnerSchoolApplicationComponent,canActivate:[OwnerGuard]},
  { path:'owner-requestNotification', component:OwnerApplicationCompletionComponent,canActivate:[OwnerGuard]},
  { path:'forgotPassword', component: ForgotpasswordComponent },
  { path:'owner-vehicles', component: AddvehicleComponent ,canActivate:[OwnerGuard] },
  { path:'editvehicle', component: EditVehicleComponent ,canActivate:[OwnerGuard] },
  { path:'profile',component: ProfileComponent,canActivate:[UserGuard]},
  { path:'parent-home', component: SchoolsComponent},

  { path:'parent-requests', component:ParentsRequestComponent},

  { path:'vehicle', component: VehiclesComponent},
  //{ path:'vehicle', component: VehiclesComponent,canActivate:[ParentGuard]},
  { path:'request', component: RequestsComponent},
  { path:'owner-home', component: OwnerPageComponent,canActivate:[OwnerGuard]},
  { path:'owner-requests', component: OwnerRequestsComponent,canActivate:[OwnerGuard]},
  { path:'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path:'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
