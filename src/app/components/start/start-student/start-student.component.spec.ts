/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartStudentComponent } from './start-student.component';

describe('StartStudentComponent', () => {
  let component: StartStudentComponent;
  let fixture: ComponentFixture<StartStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
