import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';

import { NavAdminComponent } from './nav-admin/nav-admin.component';


const routes: Routes = [{ path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
{ path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'Landing', component: LandingComponent},
{path:'navigation',component:NavAdminComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
