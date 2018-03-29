import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonDetailsComponent } from './son-details.component';

describe('SonDetailsComponent', () => {
  let component: SonDetailsComponent;
  let fixture: ComponentFixture<SonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
