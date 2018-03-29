import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinputComponent } from './addinput.component';

describe('AddinputComponent', () => {
  let component: AddinputComponent;
  let fixture: ComponentFixture<AddinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
