/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindScheduleMentorComponent } from './find-schedule-mentor.component';

describe('FindScheduleMentorComponent', () => {
  let component: FindScheduleMentorComponent;
  let fixture: ComponentFixture<FindScheduleMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindScheduleMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindScheduleMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
