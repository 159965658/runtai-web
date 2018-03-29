import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindUserComponent } from './bind-user.component';

describe('BindUserComponent', () => {
  let component: BindUserComponent;
  let fixture: ComponentFixture<BindUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
