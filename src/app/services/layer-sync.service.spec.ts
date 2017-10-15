import { TestBed, inject } from '@angular/core/testing';

import { LayerSyncService } from './layer-sync.service';

describe('LayerSyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayerSyncService]
    });
  });

  it('should be created', inject([LayerSyncService], (service: LayerSyncService) => {
    expect(service).toBeTruthy();
  }));
});
