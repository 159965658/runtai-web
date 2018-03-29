import { TestBed, inject } from '@angular/core/testing';

import { IsUserTypeService } from './is-user-type.service';

describe('IsUserTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsUserTypeService]
    });
  });

  it('should be created', inject([IsUserTypeService], (service: IsUserTypeService) => {
    expect(service).toBeTruthy();
  }));
});
