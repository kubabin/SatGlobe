import { TestBed } from '@angular/core/testing';

import { SatApiService } from './sat-api.service';

describe('SatApiService', () => {
  let service: SatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
