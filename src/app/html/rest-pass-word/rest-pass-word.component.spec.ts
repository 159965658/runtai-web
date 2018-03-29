import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPassWordComponent } from './rest-pass-word.component';

describe('RestPassWordComponent', () => {
  let component: RestPassWordComponent;
  let fixture: ComponentFixture<RestPassWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestPassWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestPassWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
