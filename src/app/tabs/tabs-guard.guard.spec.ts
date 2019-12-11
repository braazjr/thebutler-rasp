import { TestBed, async, inject } from '@angular/core/testing';

import { TabsGuardGuard } from './tabs-guard.guard';

describe('TabsGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabsGuardGuard]
    });
  });

  it('should ...', inject([TabsGuardGuard], (guard: TabsGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
