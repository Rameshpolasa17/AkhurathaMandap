import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorForm } from './sponsor-form';

describe('SponsorForm', () => {
  let component: SponsorForm;
  let fixture: ComponentFixture<SponsorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
