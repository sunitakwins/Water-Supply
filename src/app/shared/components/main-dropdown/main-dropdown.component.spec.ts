import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDropdownComponent } from './main-dropdown.component';

describe('MainDropdownComponent', () => {
  let component: MainDropdownComponent;
  let fixture: ComponentFixture<MainDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
