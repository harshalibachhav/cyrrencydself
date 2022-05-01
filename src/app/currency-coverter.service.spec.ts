import { TestBed } from '@angular/core/testing';

import { CurrencyCoverterService } from './currency-coverter.service';

describe('CurrencyCoverterService', () => {
  let service: CurrencyCoverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyCoverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
