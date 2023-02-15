import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsRequestComponent } from './parents-request.component';

describe('ParentsRequestComponent', () => {
  let component: ParentsRequestComponent;
  let fixture: ComponentFixture<ParentsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
