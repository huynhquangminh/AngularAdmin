import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertNewDialogComponent } from './insert-new-dialog.component';

describe('InsertNewDialogComponent', () => {
  let component: InsertNewDialogComponent;
  let fixture: ComponentFixture<InsertNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
