import { TestBed } from '@angular/core/testing';

import { LoadScheduleService } from './load-schedule.service';

describe('LoadScheduleService', () => {
  let service: LoadScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
