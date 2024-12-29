import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditItineraryComponent } from './create-edit-itinerary.component';

describe('CreateEditItineraryComponent', () => {
  let component: CreateEditItineraryComponent;
  let fixture: ComponentFixture<CreateEditItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditItineraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
