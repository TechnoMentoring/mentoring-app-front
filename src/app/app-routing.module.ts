import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'student', loadChildren: () => import('./components/student/student.module').then(m => m.StudentModule) },
  { path: 'mentors', loadChildren: () => import('./components/mentor/mentor.module').then(m => m.MentorModule) },
  { path: 'schedule', loadChildren: () => import('./components/schedule-planning/schedule-planning.module').then(m => m.SchedulePlanningModule) },
  { path: 'request', loadChildren: () => import('./components/request/request.module').then(m => m.RequestModule) },
  { path: 'payment', loadChildren: () => import('./components/payment/payment.module').then(m => m.PaymentModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'start', loadChildren: () => import('./components/start/start.module').then(m => m.StartModule) },
  { path: 'report', loadChildren: () => import('./components/report/report.module').then(m => m.ReportModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),MaterialModule],
  exports: [RouterModule,MaterialModule]
})
export class AppRoutingModule { }
