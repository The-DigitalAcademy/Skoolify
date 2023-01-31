import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewOneApplicationComponent } from './admin-view-one-application.component';

describe('AdminViewOneApplicationComponent', () => {
  let component: AdminViewOneApplicationComponent;
  let fixture: ComponentFixture<AdminViewOneApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewOneApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewOneApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
