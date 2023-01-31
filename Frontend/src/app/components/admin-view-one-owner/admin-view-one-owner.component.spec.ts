import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewOneOwnerComponent } from './admin-view-one-owner.component';

describe('AdminViewOneOwnerComponent', () => {
  let component: AdminViewOneOwnerComponent;
  let fixture: ComponentFixture<AdminViewOneOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewOneOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewOneOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
