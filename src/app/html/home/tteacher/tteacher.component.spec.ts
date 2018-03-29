import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TteacherComponent } from './tteacher.component';

describe('TteacherComponent', () => {
  let component: TteacherComponent;
  let fixture: ComponentFixture<TteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
