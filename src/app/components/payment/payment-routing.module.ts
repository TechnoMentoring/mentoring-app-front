import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPaymentComponent } from './register-payment/register-payment.component';
import { AllPaymentStudentComponent } from './all-payment-student/all-payment-student.component';
import { AllPaymentAdminComponent } from './all-payment-admin/all-payment-admin.component';
import { AllPaymentMentorComponent } from './all-payment-mentor/all-payment-mentor.component';

const routes: Routes = [
{ path: 'register', component: RegisterPaymentComponent },
{ path: 'all-payment-student', component: AllPaymentStudentComponent },
{ path: 'all-payment-mentor', component: AllPaymentMentorComponent },
{ path: 'all-payment-admin', component: AllPaymentAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
