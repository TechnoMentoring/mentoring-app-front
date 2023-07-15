import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationScheduleComponent } from './creation-schedule/creation-schedule.component';
import { AllScheduleComponent } from './all-schedule/all-schedule.component';
import { DatePipe } from '@angular/common';
import { SelectScheduleComponent } from './select-schedule/select-schedule.component';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { FindAllScheduleComponent } from './find-all-schedule/find-all-schedule.component';
import { FindScheduleMentorComponent } from './find-schedule-mentor/find-schedule-mentor.component';
import { UpdateScheduleMentorComponent } from './update-schedule-mentor/update-schedule-mentor.component';
import { SelectScheduleMentorComponent } from './select-schedule-mentor/select-schedule-mentor.component';
import { AllScheduleAdminComponent } from './all-schedule-admin/all-schedule-admin.component';
import { FindScheduleStudentComponent } from './find-schedule-student/find-schedule-student.component';
import { UpdateReprogramerMentorComponent } from './update-reprogramer-mentor/update-reprogramer-mentor.component';

const routes: Routes = [
{ path: 'creation', component: CreationScheduleComponent },
{ path: 'all', component: AllScheduleComponent },
{ path:'select',component:SelectScheduleComponent },
{ path:'update',component:UpdateScheduleComponent },
{ path:'find',component:FindAllScheduleComponent },
{ path:'findMentor',component:FindScheduleMentorComponent },
{ path:'updateMentor',component:UpdateScheduleMentorComponent },
{ path:'selectMentor',component:SelectScheduleMentorComponent },
{ path:'allAdmin',component:AllScheduleAdminComponent },
{ path:'findStudent',component:FindScheduleStudentComponent },
{ path:'reprogramerMentor',component:UpdateReprogramerMentorComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe],
})
export class SchedulePlanningRoutingModule { }
