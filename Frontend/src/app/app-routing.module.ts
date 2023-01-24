import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';
import { LandingComponent } from './pages/landing/landing.component';

// const routes: Routes = 
// [{ path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) }];
const routes: Routes = [
  { path: '', component:LandingComponent},
  { path: 'addvehicle', component: AddvehicleComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
