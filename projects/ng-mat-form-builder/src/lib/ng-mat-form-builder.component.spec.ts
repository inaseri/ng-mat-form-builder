import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMatFormBuilderComponent } from './ng-mat-form-builder.component';

describe('NgMatFormBuilderComponent', () => {
  let component: NgMatFormBuilderComponent;
  let fixture: ComponentFixture<NgMatFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgMatFormBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgMatFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
