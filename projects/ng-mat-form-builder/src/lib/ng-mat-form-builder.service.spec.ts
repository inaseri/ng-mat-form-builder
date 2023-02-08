import { TestBed } from '@angular/core/testing';

import { NgMatFormBuilderService } from './ng-mat-form-builder.service';

describe('NgMatFormBuilderService', () => {
  let service: NgMatFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMatFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
