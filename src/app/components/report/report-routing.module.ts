import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportMentorComponent } from './report-mentor/report-mentor.component';
import { ReportAdminComponent } from './report-admin/report-admin.component';
import { ReportStudentComponent } from './report-student/report-student.component';

const routes: Routes = [
  { path: 'reportMentor', component: ReportMentorComponent },
  { path: 'reportAdmin', component: ReportAdminComponent },
  { path: 'reportStudent', component: ReportStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
