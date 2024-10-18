import { TestBed } from '@angular/core/testing';

import { LoadSpeakersService } from './load-speakers.service';

describe('LoadSpeakersService', () => {
  let service: LoadSpeakersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadSpeakersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
