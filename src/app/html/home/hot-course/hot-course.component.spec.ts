import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotCourseComponent } from './hot-course.component';

describe('HotCourseComponent', () => {
  let component: HotCourseComponent;
  let fixture: ComponentFixture<HotCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
