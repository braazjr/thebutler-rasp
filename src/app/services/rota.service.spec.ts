import { TestBed } from '@angular/core/testing';

import { RotaService } from './rota.service';

describe('RotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RotaService = TestBed.get(RotaService);
    expect(service).toBeTruthy();
  });
});
