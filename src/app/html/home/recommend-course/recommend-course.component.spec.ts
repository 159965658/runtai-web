import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendCourseComponent } from './recommend-course.component';

describe('RecommendCourseComponent', () => {
  let component: RecommendCourseComponent;
  let fixture: ComponentFixture<RecommendCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
