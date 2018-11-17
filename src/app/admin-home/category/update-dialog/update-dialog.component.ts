import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

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
    private dialogref: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this._addForm = this._formBuilder.group({
      NameCategory: ['', [Validators.required]],
      // imgCategory: ['', [Validators.required]],
    });
    this.onLostFocus();
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
  onLostFocus() {
    this.CheckValidate(this.tooltip1);
  }
}
