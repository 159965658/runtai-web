import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFooterComponent } from './course-footer.component';

describe('CourseFooterComponent', () => {
  let component: CourseFooterComponent;
  let fixture: ComponentFixture<CourseFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
