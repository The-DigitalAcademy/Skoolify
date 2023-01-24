import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDriverComponent } from './nav-driver.component';

describe('NavDriverComponent', () => {
  let component: NavDriverComponent;
  let fixture: ComponentFixture<NavDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
