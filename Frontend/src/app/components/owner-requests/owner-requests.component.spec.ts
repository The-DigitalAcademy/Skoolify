import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRequestsComponent } from './owner-requests.component';

describe('OwnerRequestsComponent', () => {
  let component: OwnerRequestsComponent;
  let fixture: ComponentFixture<OwnerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
