import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';

// const routes: Routes = [{ path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) }];
// {

  const routes: Routes = [
    {
      path: 'addvehicle/add',
      component: AddvehicleComponent,
      data: { title: 'List of vehicles' }
    },

  ]





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
