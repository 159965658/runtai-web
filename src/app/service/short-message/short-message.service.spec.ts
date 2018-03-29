import { TestBed, inject } from '@angular/core/testing';

import { ShortMessageService } from './short-message.service';

describe('ShortMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShortMessageService]
    });
  });

  it('should be created', inject([ShortMessageService], (service: ShortMessageService) => {
    expect(service).toBeTruthy();
  }));
});
