import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CompetitionsPreview } from './competitions-preview';

describe('CompetitionsPreview', () => {
  let component: CompetitionsPreview;
  let fixture: ComponentFixture<CompetitionsPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionsPreview],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitionsPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
