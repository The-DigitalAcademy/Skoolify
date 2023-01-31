import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewApplicationsComponent } from './admin-view-applications.component';

describe('AdminViewApplicationsComponent', () => {
  let component: AdminViewApplicationsComponent;
  let fixture: ComponentFixture<AdminViewApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
