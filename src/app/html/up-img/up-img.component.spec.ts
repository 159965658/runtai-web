import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpImgComponent } from './up-img.component';

describe('UpImgComponent', () => {
  let component: UpImgComponent;
  let fixture: ComponentFixture<UpImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
