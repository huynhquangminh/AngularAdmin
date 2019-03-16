import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProductDialogComponent } from './insert-product-dialog.component';

describe('InsertProductDialogComponent', () => {
  let component: InsertProductDialogComponent;
  let fixture: ComponentFixture<InsertProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
