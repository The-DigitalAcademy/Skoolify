import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApplicationCompletionComponent } from './owner-application-completion.component';

describe('OwnerApplicationCompletionComponent', () => {
  let component: OwnerApplicationCompletionComponent;
  let fixture: ComponentFixture<OwnerApplicationCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerApplicationCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerApplicationCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
