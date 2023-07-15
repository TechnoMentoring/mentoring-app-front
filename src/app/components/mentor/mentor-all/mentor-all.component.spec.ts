import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorAllComponent } from './mentor-all.component';

describe('MentorAllComponent', () => {
  let component: MentorAllComponent;
  let fixture: ComponentFixture<MentorAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorAllComponent]
    });
    fixture = TestBed.createComponent(MentorAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
