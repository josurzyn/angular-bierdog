import { TestBed } from '@angular/core/testing';

import { BiersService } from './biers.service';

describe('BiersService', () => {
  let service: BiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
