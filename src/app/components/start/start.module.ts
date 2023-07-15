import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartStudentComponent } from './start-student/start-student.component';
import { StartMentorComponent } from './start-mentor/start-mentor.component';
import { StartAdminComponent } from './start-admin/start-admin.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    StartAdminComponent,
    StartStudentComponent,
    StartMentorComponent,
    StartAdminComponent,

  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    MaterialModule,
  ],
  exports: [
    StartMentorComponent,
    StartStudentComponent,
    StartAdminComponent,

  ]
})
export class StartModule { }
