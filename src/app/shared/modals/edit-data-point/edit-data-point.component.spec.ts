import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataPointComponent } from './edit-data-point.component';

describe('EditDataPointComponent', () => {
  let component: EditDataPointComponent;
  let fixture: ComponentFixture<EditDataPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDataPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
