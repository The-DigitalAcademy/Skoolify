import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewOwnersComponent } from './components/view-owners/view-owners.component';



const routes: Routes = [
  // { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path: '',component: ViewOwnersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
