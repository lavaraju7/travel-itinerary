import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyRemindComponent } from './notify-remind.component';

describe('NotifyRemindComponent', () => {
  let component: NotifyRemindComponent;
  let fixture: ComponentFixture<NotifyRemindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyRemindComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifyRemindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
