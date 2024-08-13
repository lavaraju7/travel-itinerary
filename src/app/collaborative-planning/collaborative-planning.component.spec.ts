import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborativePlanningComponent } from './collaborative-planning.component';

describe('CollaborativePlanningComponent', () => {
  let component: CollaborativePlanningComponent;
  let fixture: ComponentFixture<CollaborativePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaborativePlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborativePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
