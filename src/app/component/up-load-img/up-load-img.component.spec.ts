import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpLoadImgComponent } from './up-load-img.component';

describe('UpLoadImgComponent', () => {
  let component: UpLoadImgComponent;
  let fixture: ComponentFixture<UpLoadImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpLoadImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpLoadImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
