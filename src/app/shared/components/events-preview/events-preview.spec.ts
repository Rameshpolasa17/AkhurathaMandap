import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EventsPreview } from './events-preview';

describe('EventsPreview', () => {
  let component: EventsPreview;
  let fixture: ComponentFixture<EventsPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPreview],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
