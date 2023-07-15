/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllPaymentMentorComponent } from './all-payment-mentor.component';

describe('AllPaymentMentorComponent', () => {
  let component: AllPaymentMentorComponent;
  let fixture: ComponentFixture<AllPaymentMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPaymentMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPaymentMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
