import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisListComponent } from './dis-list.component';

describe('DisListComponent', () => {
  let component: DisListComponent;
  let fixture: ComponentFixture<DisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
