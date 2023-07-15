import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportAdminComponent } from './report-admin/report-admin.component';
import { ReportMentorComponent } from './report-mentor/report-mentor.component';
import { ReportStudentComponent } from './report-student/report-student.component';
import { MaterialModule } from 'src/app/material/material.module';
import { StartModule } from '../start/start.module';


@NgModule({
  declarations: [
    ReportAdminComponent,
    ReportMentorComponent,
    ReportStudentComponent,

  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    StartModule,
    MaterialModule,
  ],
  providers:[DatePipe]
})
export class ReportModule { }
