import { TestBed } from '@angular/core/testing';

import { RoundsCounterInterceptor } from './rounds-counter.interceptor';

describe('RoundsCounterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RoundsCounterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RoundsCounterInterceptor = TestBed.inject(RoundsCounterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
