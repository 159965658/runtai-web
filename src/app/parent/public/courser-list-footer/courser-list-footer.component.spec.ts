import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourserListFooterComponent } from './courser-list-footer.component';

describe('CourserListFooterComponent', () => {
  let component: CourserListFooterComponent;
  let fixture: ComponentFixture<CourserListFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourserListFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourserListFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
