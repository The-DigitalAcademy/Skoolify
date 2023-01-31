import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewOneSchoolComponent } from './admin-view-one-school.component';

describe('AdminViewOneSchoolComponent', () => {
  let component: AdminViewOneSchoolComponent;
  let fixture: ComponentFixture<AdminViewOneSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewOneSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewOneSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
