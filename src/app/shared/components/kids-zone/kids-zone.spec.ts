import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { KidsZone } from './kids-zone';

describe('KidsZone', () => {
  let component: KidsZone;
  let fixture: ComponentFixture<KidsZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KidsZone],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(KidsZone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
