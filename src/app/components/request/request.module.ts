import { NgModule } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { RegisterRequestComponent } from './register-request/register-request.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { RequestByMentorComponent } from './request-by-mentor/request-by-mentor.component';
import { FormsModule } from '@angular/forms';
import { RequestByStudentComponent } from './request-by-student/request-by-student.component';
import { StartModule } from '../start/start.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [RegisterRequestComponent,
    AllRequestComponent,RequestByMentorComponent,
    RequestByStudentComponent,
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatDatepickerModule,
    FullCalendarModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule, 
    FormsModule,
    StartModule,
    MatButtonToggleModule,

  ],
  providers:[DatePipe]
})
export class RequestModule { }
