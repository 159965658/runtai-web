import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyHeaderComponent } from './study-header.component';

describe('StudyHeaderComponent', () => {
  let component: StudyHeaderComponent;
  let fixture: ComponentFixture<StudyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
