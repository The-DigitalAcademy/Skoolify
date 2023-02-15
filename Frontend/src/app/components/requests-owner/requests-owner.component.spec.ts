import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsOwnerComponent } from './requests-owner.component';

describe('RequestsOwnerComponent', () => {
  let component: RequestsOwnerComponent;
  let fixture: ComponentFixture<RequestsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
