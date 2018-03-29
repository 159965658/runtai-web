import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDataListComponent } from './class-data-list.component';

describe('ClassDataListComponent', () => {
  let component: ClassDataListComponent;
  let fixture: ComponentFixture<ClassDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
