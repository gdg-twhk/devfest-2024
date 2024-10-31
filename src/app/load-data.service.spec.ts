import { TestBed } from '@angular/core/testing';

import { LoadDataServices } from './load-data.service';

describe('LoadSpeakersService', () => {
  let service: LoadDataServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDataServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
