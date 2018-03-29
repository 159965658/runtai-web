import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorWorkCountComponent } from './error-work-count.component';

describe('ErrorWorkCountComponent', () => {
  let component: ErrorWorkCountComponent;
  let fixture: ComponentFixture<ErrorWorkCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorWorkCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorWorkCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
