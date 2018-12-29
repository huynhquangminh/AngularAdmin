import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNewDialogComponent } from './update-new-dialog.component';

describe('UpdateNewDialogComponent', () => {
  let component: UpdateNewDialogComponent;
  let fixture: ComponentFixture<UpdateNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
