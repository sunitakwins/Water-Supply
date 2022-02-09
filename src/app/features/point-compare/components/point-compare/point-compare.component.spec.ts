import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCompareComponent } from './point-compare.component';

describe('PointCompareComponent', () => {
  let component: PointCompareComponent;
  let fixture: ComponentFixture<PointCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
