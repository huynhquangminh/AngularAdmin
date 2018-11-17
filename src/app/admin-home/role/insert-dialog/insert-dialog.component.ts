import { ApiService } from './../../../service/api-service';
import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { INSERTROLE_URL } from '../config';
import { InsertRoleRequest } from '../../../model/insertRoleRequest';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.css']
})
export class InsertRoleDialogComponent implements OnInit {

  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  @ViewChild('tip1') public tooltip1: NgbTooltip;
  isDisable = false;
  valueRoleName: string;
  requestinsert = new InsertRoleRequest();
  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<InsertRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this._addForm = this._formBuilder.group({
      NameRole: ['', [Validators.required]],
    });
    this.onLostFocus();
    this.dialogref.disableClose = true;
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
    this.requestinsert.RoleName = this._addForm.get('NameRole').value;
    this._apiService.CallByResquestService(INSERTROLE_URL, this.requestinsert).subscribe(data => {
      if (data) {
        if (data === false) {
          alert('Your Request Is Unsuccessful');
        } else {
          this.dialogref.close();
        }
      }
    });
  }
  onLostFocus() {
    this.CheckValidate(this.tooltip1);
  }
}
