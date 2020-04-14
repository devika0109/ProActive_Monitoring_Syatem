import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterdetailsComponent } from './filterdetails.component';

describe('FilterdetailsComponent', () => {
  let component: FilterdetailsComponent;
  let fixture: ComponentFixture<FilterdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
