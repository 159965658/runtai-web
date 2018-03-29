import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRecComponent } from './teacher-rec.component';

describe('TeacherRecComponent', () => {
  let component: TeacherRecComponent;
  let fixture: ComponentFixture<TeacherRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
