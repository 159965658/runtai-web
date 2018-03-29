import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMoreComponent } from './data-more.component';

describe('DataMoreComponent', () => {
  let component: DataMoreComponent;
  let fixture: ComponentFixture<DataMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
