import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewOwnersComponent } from 'src/app/components/admin-view-owners/view-owners.component';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { AdminViewOneOwnerComponent } from 'src/app/components/admin-view-one-owner/admin-view-one-owner.component';
import { saveAs } from 'file-saver';
import { AdminSchoolsComponent } from 'src/app/components/admin-schools/admin-schools.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminViewOneSchoolComponent } from 'src/app/components/admin-view-one-school/admin-view-one-school.component';
import { AdminViewOneApplicationComponent } from 'src/app/components/admin-view-one-application/admin-view-one-application.component';
import { AdminViewApplicationsComponent } from 'src/app/components/admin-view-applications/admin-view-applications.component';

@NgModule({
  declarations: [
    AdminComponent,
    ViewOwnersComponent,
    AdminViewOneOwnerComponent,
    OrderByPipe,
    AdminSchoolsComponent,
    AdminViewOneSchoolComponent,
    AdminViewOneApplicationComponent,
    AdminViewApplicationsComponent

  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
