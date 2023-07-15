import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationScheduleComponent } from './creation-schedule.component';

describe('CreationScheduleComponent', () => {
  let component: CreationScheduleComponent;
  let fixture: ComponentFixture<CreationScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationScheduleComponent]
    });
    fixture = TestBed.createComponent(CreationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
