import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentAllComponent } from './student-all/student-all.component';
import { StartModule } from '../start/start.module';


@NgModule({
  declarations: [StudentAllComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule, 
    StartModule,
  ]
})
export class StudentModule { }
6