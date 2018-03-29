import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonAddComponent } from './son-add.component';

describe('SonAddComponent', () => {
  let component: SonAddComponent;
  let fixture: ComponentFixture<SonAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
