import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GalleryPreview } from './gallery-preview';

describe('GalleryPreview', () => {
  let component: GalleryPreview;
  let fixture: ComponentFixture<GalleryPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPreview],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
