import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatlogFormComponent } from './add-catlog-form.component';

describe('AddCatlogFormComponent', () => {
  let component: AddCatlogFormComponent;
  let fixture: ComponentFixture<AddCatlogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatlogFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatlogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
