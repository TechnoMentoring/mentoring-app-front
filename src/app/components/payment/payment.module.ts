import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { RegisterPaymentComponent } from './register-payment/register-payment.component';
import { StartModule } from '../start/start.module';
import { AllPaymentStudentComponent } from './all-payment-student/all-payment-student.component';
import { AllPaymentAdminComponent } from './all-payment-admin/all-payment-admin.component';
import { AllPaymentMentorComponent } from './all-payment-mentor/all-payment-mentor.component';


@NgModule({
  declarations: [
    RegisterPaymentComponent,
    AllPaymentStudentComponent,
    AllPaymentAdminComponent,
    AllPaymentMentorComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatDatepickerModule,
    FullCalendarModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule, 
    NgIf, 
    NgFor,
    StartModule,
  ],
  providers:[DatePipe]
})
export class PaymentModule { }
