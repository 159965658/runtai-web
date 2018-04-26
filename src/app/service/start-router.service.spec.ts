import { TestBed, inject } from '@angular/core/testing';

import { StartRouterService } from './start-router.service';

describe('StartRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartRouterService]
    });
  });

  it('should be created', inject([StartRouterService], (service: StartRouterService) => {
    expect(service).toBeTruthy();
  }));
});
