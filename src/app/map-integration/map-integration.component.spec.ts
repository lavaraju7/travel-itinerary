import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIntegrationComponent } from './map-integration.component';

describe('MapIntegrationComponent', () => {
  let component: MapIntegrationComponent;
  let fixture: ComponentFixture<MapIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapIntegrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
