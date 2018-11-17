import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.css']
})
export class InsertDialogComponent implements OnInit {

  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  @ViewChild('tip1') public tooltip1: NgbTooltip;
  isDisable = false;
  afuConfig = {
    multiple: false,
    uploadAPI: {
      url: 'https://example-file-upload-api'
    },
    formatsAllowed: '.jpg,.png',
    maxSize: 20,
    hideProgressBar: false,
    hideResetBtn: true,
  };
  constructor(
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<InsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this._addForm = this._formBuilder.group({
      NameCategory: ['', [Validators.required]],
      // imgCategory: ['', [Validators.required]],
    });
    this. onLostFocus();
  }

  onCancelClick() {
    this.dialogref.close();
  }

  CheckValidate(tooltip: NgbTooltip) {
    if (!this._addForm.valid) {
      tooltip.open('Is is not emtry!');
      this.isDisable = true;
    } else {
        tooltip.close();
        this.isDisable = false;
    }
  }
  ClickSave() {
  }
  onLostFocus() {
    this.CheckValidate(this.tooltip1);
  }
}
