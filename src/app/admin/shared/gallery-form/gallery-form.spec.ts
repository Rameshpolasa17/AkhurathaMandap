import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFormComponent } from './gallery-form';

describe('GalleryFormComponent', () => {
  let component: GalleryFormComponent;
  let fixture: ComponentFixture<GalleryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
