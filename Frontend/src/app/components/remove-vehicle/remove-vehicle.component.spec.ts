import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveVehicleComponent } from './remove-vehicle.component';

describe('RemoveVehicleComponent', () => {
  let component: RemoveVehicleComponent;
  let fixture: ComponentFixture<RemoveVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
