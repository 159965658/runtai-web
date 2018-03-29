import { TestBed, inject } from '@angular/core/testing';

import { UtilMethodService } from './util-method.service';

describe('UtilMethodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilMethodService]
    });
  });

  it('should be created', inject([UtilMethodService], (service: UtilMethodService) => {
    expect(service).toBeTruthy();
  }));
});
