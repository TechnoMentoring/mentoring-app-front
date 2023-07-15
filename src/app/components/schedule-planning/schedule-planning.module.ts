import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SchedulePlanningRoutingModule } from './schedule-planning-routing.module';
import { CreationScheduleComponent } from './creation-schedule/creation-schedule.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AllScheduleComponent } from './all-schedule/all-schedule.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SelectScheduleComponent } from './select-schedule/select-schedule.component';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { FindAllScheduleComponent } from './find-all-schedule/find-all-schedule.component';
import { FindScheduleMentorComponent } from './find-schedule-mentor/find-schedule-mentor.component';
import { StartModule } from '../start/start.module';
import { UpdateScheduleMentorComponent } from './update-schedule-mentor/update-schedule-mentor.component';
import { SelectScheduleMentorComponent } from './select-schedule-mentor/select-schedule-mentor.component';
import { AllScheduleAdminComponent } from './all-schedule-admin/all-schedule-admin.component';
import { FindScheduleStudentComponent } from './find-schedule-student/find-schedule-student.component';
import { UpdateReprogramerMentorComponent } from './update-reprogramer-mentor/update-reprogramer-mentor.component';




@NgModule({
  declarations: [
    CreationScheduleComponent,
    AllScheduleComponent,
    SelectScheduleComponent,
    UpdateScheduleComponent,
    FindAllScheduleComponent,
    FindScheduleMentorComponent,
    UpdateScheduleMentorComponent,
    SelectScheduleMentorComponent,
    AllScheduleAdminComponent,
    FindScheduleStudentComponent,
    UpdateReprogramerMentorComponent,
    
  ],
  imports: [
    CommonModule,
    SchedulePlanningRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    FullCalendarModule,
    ScheduleModule,
    StartModule,

  ],
  exports: [MatDatepickerModule],
  providers: [{ provide: 'CalendarOptions', useValue: Calendar }],
})
export class SchedulePlanningModule { }
