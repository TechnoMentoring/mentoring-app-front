import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRequestComponent } from './register-request/register-request.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { RequestByMentorComponent } from './request-by-mentor/request-by-mentor.component';
import { RequestByStudentComponent } from './request-by-student/request-by-student.component';

const routes: Routes = [{ path: 'register', component: RegisterRequestComponent },
{ path: 'all', component: AllRequestComponent },
{ path: 'all-mentor', component: RequestByMentorComponent },
{path: 'all-student', component: RequestByStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
