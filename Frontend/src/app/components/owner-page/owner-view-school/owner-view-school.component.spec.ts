import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewSchoolComponent } from './owner-view-school.component';

describe('OwnerViewSchoolComponent', () => {
  let component: OwnerViewSchoolComponent;
  let fixture: ComponentFixture<OwnerViewSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerViewSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerViewSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
