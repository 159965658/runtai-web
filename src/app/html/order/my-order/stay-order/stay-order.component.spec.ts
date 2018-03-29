import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayOrderComponent } from './stay-order.component';

describe('StayOrderComponent', () => {
  let component: StayOrderComponent;
  let fixture: ComponentFixture<StayOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
