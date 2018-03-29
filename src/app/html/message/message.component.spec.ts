import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponenta } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponenta;
  let fixture: ComponentFixture<MessageComponenta>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponenta ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
