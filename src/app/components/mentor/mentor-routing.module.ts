import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';import { MentorAllComponent } from './mentor-all/mentor-all.component';
import { MentorByStudentComponent } from './mentor-by-student/mentor-by-student.component';
;

const routes: Routes = [{ path: 'all', component: MentorAllComponent },
{ path: 'allMentorStudent', component: MentorByStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule { }
