import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSchoolsComponent } from 'src/app/components/admin-schools/admin-schools.component';
import { AdminViewApplicationsComponent } from 'src/app/components/admin-view-applications/admin-view-applications.component';
import { AdminViewOneApplicationComponent } from 'src/app/components/admin-view-one-application/admin-view-one-application.component';
import { AdminViewOneOwnerComponent } from 'src/app/components/admin-view-one-owner/admin-view-one-owner.component';
import { AdminViewOneSchoolComponent } from 'src/app/components/admin-view-one-school/admin-view-one-school.component';
import { ViewOwnersComponent } from 'src/app/components/admin-view-owners/view-owners.component';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path:'', component: AdminComponent,canActivate: [AdminGuard]},
  {path:'view-owners',component:ViewOwnersComponent,canActivate: [AdminGuard]},
  {path:'view-owner',component: AdminViewOneOwnerComponent,canActivate: [AdminGuard]},
  {path:'schools',component: AdminSchoolsComponent,canActivate: [AdminGuard]},
  {path:'view-school',component: AdminViewOneSchoolComponent,canActivate: [AdminGuard]},
  {path:'view-applications',component:AdminViewApplicationsComponent,canActivate: [AdminGuard]},
  {path:'view-application',component:AdminViewOneApplicationComponent,canActivate: [AdminGuard]}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
