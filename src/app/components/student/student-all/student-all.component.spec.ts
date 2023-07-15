import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAllComponent } from './student-all.component';

describe('StudentAllComponent', () => {
  let component: StudentAllComponent;
  let fixture: ComponentFixture<StudentAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAllComponent]
    });
    fixture = TestBed.createComponent(StudentAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
