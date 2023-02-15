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
import{OwnerApplicationCompletionComponent} from './components/owner-application-completion/owner-application-completion.component'
import { RequestsOwnerComponent } from './components/requests-owner/requests-owner.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path:'login', component: LoginComponent},
  {path:'owner-request',component:RequestsOwnerComponent},
  { path:'home', component: OwnerPageComponent},
  { path:'schoolsApplication', component: OwnerSchoolApplicationComponent},
  {path:'profile',component: ProfileComponent},
  { path:'parent-home', component: SchoolsComponent},
  { path:'owner-home', component: OwnerPageComponent},
  { path:'owner-requestNotification', component:OwnerApplicationCompletionComponent},
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
