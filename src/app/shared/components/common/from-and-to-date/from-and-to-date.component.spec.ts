import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromAndToDateComponent } from './from-and-to-date.component';

describe('FromAndToDateComponent', () => {
  let component: FromAndToDateComponent;
  let fixture: ComponentFixture<FromAndToDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromAndToDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromAndToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
