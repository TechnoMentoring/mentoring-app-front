import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { MentorAllComponent } from './mentor-all/mentor-all.component';
import { MaterialModule } from 'src/app/material/material.module';
import { StartModule } from '../start/start.module';
import { MentorByStudentComponent } from './mentor-by-student/mentor-by-student.component';


@NgModule({
  declarations: [
    MentorAllComponent,
    MentorByStudentComponent,
  ],
  imports: [
    CommonModule,
    MentorRoutingModule,
    MaterialModule,
    StartModule,
  ],
  exports:[MaterialModule]
})
export class MentorModule { }
