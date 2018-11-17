import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCustomerDialogComponent } from './insert-customer-dialog.component';

describe('InsertCustomerDialogComponent', () => {
  let component: InsertCustomerDialogComponent;
  let fixture: ComponentFixture<InsertCustomerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertCustomerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
