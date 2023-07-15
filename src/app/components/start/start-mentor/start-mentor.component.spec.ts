/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartMentorComponent } from './start-mentor.component';

describe('StartMentorComponent', () => {
  let component: StartMentorComponent;
  let fixture: ComponentFixture<StartMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
