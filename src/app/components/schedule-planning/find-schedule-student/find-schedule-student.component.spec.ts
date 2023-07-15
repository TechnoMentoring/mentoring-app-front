/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindScheduleStudentComponent } from './find-schedule-student.component';

describe('FindScheduleStudentComponent', () => {
  let component: FindScheduleStudentComponent;
  let fixture: ComponentFixture<FindScheduleStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindScheduleStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindScheduleStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
