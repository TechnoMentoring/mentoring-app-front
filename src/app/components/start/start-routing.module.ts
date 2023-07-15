import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartAdminComponent } from './start-admin/start-admin.component';
import { StartMentorComponent } from './start-mentor/start-mentor.component';
import { StartStudentComponent } from './start-student/start-student.component';

const routes: Routes = [
{ path: 'admin', component: StartAdminComponent },
{ path: 'mentor', component: StartMentorComponent },
{ path: 'student', component: StartStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
