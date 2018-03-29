import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisDetailsComponent } from './dis-details.component';

describe('DisDetailsComponent', () => {
  let component: DisDetailsComponent;
  let fixture: ComponentFixture<DisDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
