import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchFilterComponent } from './custom-search-filter.component';

describe('CustomSearchFilterComponent', () => {
  let component: CustomSearchFilterComponent;
  let fixture: ComponentFixture<CustomSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
