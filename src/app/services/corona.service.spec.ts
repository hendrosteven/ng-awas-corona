import { TestBed } from '@angular/core/testing';

import { CoronaService } from './corona.service';

describe('CoronaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoronaService = TestBed.get(CoronaService);
    expect(service).toBeTruthy();
  });
});
