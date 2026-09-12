import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SponsorsPreview } from './sponsors-preview';

describe('SponsorsPreview', () => {
  let component: SponsorsPreview;
  let fixture: ComponentFixture<SponsorsPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorsPreview],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorsPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
