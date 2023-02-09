import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { OwnerPageComponent } from './components/owner-page/owner-page.component';
import { UserGuard } from './guards/user.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { ParentGuard } from './guards/parent/parent.guard';
import { OwnerGuard } from './guards/owner/owner.guard';



const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path:'login', component: LoginComponent},
  //{ path:'home', component: SchoolsComponent},
  {path:'profile',component: ProfileComponent,canActivate:[UserGuard]},
  { path:'parent-home', component: SchoolsComponent,canActivate:[ParentGuard]},
  { path:'owner-home', component: OwnerPageComponent,canActivate:[OwnerGuard]},
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),canActivate:[AdminGuard]},
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
