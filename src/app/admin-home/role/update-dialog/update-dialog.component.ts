import { ApiService } from './../../../service/api-service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UPDATEROLE_URL } from '../config';
import { UpdateRoleRequest } from '../../../model/updateRoleRequest';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateRoleDialogComponent implements OnInit {

  requestData = new  UpdateRoleRequest();
  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  @ViewChild('tip1') public tooltip1: NgbTooltip;
  isDisable = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private dialogref: MatDialogRef<UpdateRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this._addForm = this._formBuilder.group({
      RoleName: ['', [Validators.required]],
    });
    this.dialogref.disableClose = true;
    this._addForm.get('RoleName').setValue(this.data.RoleName);
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
    this.requestData.ID = this.data.ID;
    this.requestData.RoleName =  this._addForm.get('RoleName').value;
    this._apiService.CallByResquestService(UPDATEROLE_URL, this.requestData).subscribe(data => {
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
