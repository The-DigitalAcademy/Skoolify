import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSchoolsComponent } from 'src/app/components/admin-schools/admin-schools.component';
import { AdminViewApplicationsComponent } from 'src/app/components/admin-view-applications/admin-view-applications.component';
import { AdminViewOneApplicationComponent } from 'src/app/components/admin-view-one-application/admin-view-one-application.component';
import { AdminViewOneOwnerComponent } from 'src/app/components/admin-view-one-owner/admin-view-one-owner.component';
import { AdminViewOneSchoolComponent } from 'src/app/components/admin-view-one-school/admin-view-one-school.component';
import { ViewOwnersComponent } from 'src/app/components/admin-view-owners/view-owners.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path:'view-owners',component:ViewOwnersComponent},
  {path:'view-owner',component: AdminViewOneOwnerComponent},
  {path:'schools',component: AdminSchoolsComponent},
  {path:'view-school',component: AdminViewOneSchoolComponent},
  {path:'view-applications',component:AdminViewApplicationsComponent},
  {path:'view-application',component:AdminViewOneApplicationComponent}



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
