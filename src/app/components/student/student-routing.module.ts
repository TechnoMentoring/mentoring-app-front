import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAllComponent } from './student-all/student-all.component';

const routes: Routes = [{ path: 'all', component: StudentAllComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
