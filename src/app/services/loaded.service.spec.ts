/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadedService } from './loaded.service';

describe('LoadedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadedService]
    });
  });

  it('should ...', inject([LoadedService], (service: LoadedService) => {
    expect(service).toBeTruthy();
  }));
});
