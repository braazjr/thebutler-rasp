import { TestBed } from '@angular/core/testing';

import { MoradorService } from './morador.service';

describe('MoradorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoradorService = TestBed.get(MoradorService);
    expect(service).toBeTruthy();
  });
});
