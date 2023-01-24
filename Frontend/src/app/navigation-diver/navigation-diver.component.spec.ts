import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDiverComponent } from './navigation-diver.component';

describe('NavigationDiverComponent', () => {
  let component: NavigationDiverComponent;
  let fixture: ComponentFixture<NavigationDiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationDiverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
