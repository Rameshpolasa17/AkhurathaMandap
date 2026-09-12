import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AnnouncementsPreview } from './announcements-preview';

describe('AnnouncementsPreview', () => {
  let component: AnnouncementsPreview;
  let fixture: ComponentFixture<AnnouncementsPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsPreview],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementsPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
