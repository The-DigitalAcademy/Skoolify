import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSchoolApplicationComponent } from './owner-school-application.component';

describe('OwnerSchoolApplicationComponent', () => {
  let component: OwnerSchoolApplicationComponent;
  let fixture: ComponentFixture<OwnerSchoolApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerSchoolApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSchoolApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
